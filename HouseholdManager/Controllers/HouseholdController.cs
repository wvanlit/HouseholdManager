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
        return RedirectToAction(nameof(GetHousehold), "Household",new {id = household.Id});
    }

    
}