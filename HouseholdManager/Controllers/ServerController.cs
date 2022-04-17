using Microsoft.AspNetCore.Mvc;

namespace HouseholdManager.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServerController : ControllerBase
{
    [HttpGet("status")]
    public ActionResult CheckServerStatus()
    {
        return Ok("OK");
    }
}