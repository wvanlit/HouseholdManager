using System.ComponentModel.DataAnnotations;

namespace HouseholdManager.Models;

public class User
{
    [Key] [Required] public string Username { get; set; } = string.Empty;
    [Required] public string Role { get; set; } = UserRole.Member.ToString();

    [Required] public byte[] PasswordHash { get; set; } = null!;
    [Required] public byte[] PasswordSalt { get; set; } = null!;
    
    public List<Household> Households { get; set; } = new List<Household>();

    public UserDto ToDto()
    {
        return new UserDto()
        {
            Username = Username,
            Role = Role,
            Households = Households.ConvertAll(h => (h.Id, h.Name))
        };
    }
}

public enum UserRole
{
    Admin,
    Member,
    Guest
}