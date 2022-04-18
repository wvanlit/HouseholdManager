using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HouseholdManager.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class HouseholdController : ControllerBase
{
    private readonly HouseholdService _householdService;

    public HouseholdController(HouseholdService householdService)
    {
        _householdService = householdService;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<HouseholdDto>> GetHousehold(int id)
    {
        var household = await _householdService.FindHousehold(id);
        if (household == null) return NotFound();
        return Ok(household);
    }

    [HttpGet("user/{username}")]
    public async Task<ActionResult<List<HouseholdDto>>> GetUserHouseholds(string username)
    {
        var households = await _householdService.FindUserHouseholds(username);
        return Ok(households);
    }

    [HttpPost("create")]
    public async Task<ActionResult<HouseholdDto>> CreateHousehold(HouseholdDto dto)
    {
        var household = await _householdService.CreateNewHousehold(dto);
        return Ok(household);
    }

    [HttpPost("{id:int}/add/{username}")]
    public async Task<ActionResult> AddUserToHousehold(int id, string username)
    {
        var authenticatedUser = HttpContext.User.Identity?.Name;
        if (authenticatedUser is null)
            return Forbid("User not authorized");

        var userHouseholds = await _householdService.FindUserHouseholds(authenticatedUser);
        if (userHouseholds.All(h => h.Id != id))
            return Forbid("User not part of given household");

        try
        {
            await _householdService.AddHouseholdMember(id, username);
            return Ok();
        }
        catch (ArgumentException exception)
        {
            return NotFound(exception.Message);
        }
    }

    [HttpDelete("{id:int}/remove/{username}")]
    public async Task<ActionResult> DeleteUserFromHousehold(int id, string username)
    {
        var authenticatedUser = HttpContext.User.Identity?.Name;
        if (authenticatedUser is null)
            return Forbid("User not authorized");

        var userHouseholds = await _householdService.FindUserHouseholds(authenticatedUser);
        if (userHouseholds.All(h => h.Id != id))
            return Forbid("User not part of given household");

        try
        {
            await _householdService.RemoveHouseholdMember(id, username);
            return Ok();
        }
        catch (ArgumentException exception)
        {
            return NotFound(exception.Message);
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteHousehold(int id)
    {
        var authenticatedUser = HttpContext.User.Identity?.Name;
        if (authenticatedUser is null)
            return Forbid("User not authorized");

        var userHouseholds = await _householdService.FindUserHouseholds(authenticatedUser);
        if (userHouseholds.All(h => h.Id != id))
            return Forbid("User not part of given household");

        var ok = await _householdService.DeleteHousehold(id);
        return ok ? Ok() : NotFound();
    }
}