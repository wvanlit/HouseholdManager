using Microsoft.AspNetCore.Mvc;

namespace HouseholdManager.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(UserLogin request)
    {
        var user = await _authService.Register(request);
        if (user is null) return Conflict("Username already exists");
        return Ok(user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login(UserLogin request)
    {
        var token = await _authService.LogIn(request);
        if (token is null) return Unauthorized("Username and password combination incorrect");

        return Ok(token);
    }
}