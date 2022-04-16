using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;

namespace HouseholdManager.Services;

public class AuthService
{
    private readonly UserRepository _userRepository;
    private readonly IConfiguration _ctx;

    public AuthService(UserRepository userRepository, IConfiguration ctx)
    {
        _userRepository = userRepository;
        _ctx = ctx;
    }

    public async Task<UserDto?> Register(UserLogin request)
    {
        CreatePasswordHash(request.Password, out var hash, out var salt);
        var newUser = new User
        {
            Username = request.Username,
            Role = UserRole.Member.ToString(),
            PasswordHash = hash,
            PasswordSalt = salt
        };

        await _userRepository.Create(newUser);
        return newUser.ToDto();
    }
    
    public async Task<string?> LogIn(UserLogin request)
    {
        var requestedUser = await _userRepository.Find(request.Username);
        if (requestedUser is null) return null;
        
        var isValid = IsValidUserLogin(request, requestedUser);
        if (!isValid) return null;

        return CreateToken(requestedUser);
    }
    
    private static void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
    {
        using var hmac = new HMACSHA512();
        salt = hmac.Key;
        hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
    }

    private static bool IsValidPasswordHash(string password, User user)
    {
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        return hash.SequenceEqual(user.PasswordHash);
    }

    private static bool IsValidUserLogin(UserLogin login, User user) =>
        user.Username == login.Username && IsValidPasswordHash(login.Password, user);

    private string CreateToken(User user)
    {
        var claims = new List<Claim>()
        {
            new(ClaimTypes.Name, user.Username),
            new(ClaimTypes.Role, user.Role),
        };

        var configKey = _ctx["JWT:Key"]!;
        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            signingCredentials: credentials,
            expires: DateTime.Now.AddMinutes(15)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}