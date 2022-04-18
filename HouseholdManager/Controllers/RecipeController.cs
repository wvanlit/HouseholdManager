using HouseholdManager.Models.Recipes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HouseholdManager.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly RecipeService _recipeService;
    private readonly HouseholdService _householdService;

    public RecipeController(RecipeService recipeService, HouseholdService householdService)
    {
        _recipeService = recipeService;
        _householdService = householdService;
    }

    [HttpGet("list/{id:int}")]
    public async Task<ActionResult<RecipeList>> GetList(int id)
    {
        var list = await _recipeService.GetList(id);
        return list == null ? NotFound() : Ok(list);
    }

    [HttpPost("list/{householdId:int}/{name}")]
    public async Task<ActionResult<RecipeList>> CreateList(int householdId, string name)
    {
        // TODO check if user belongs to household
        return Ok(await _recipeService.CreateNew(householdId, name));
    }
    
    [HttpPost("recipe")]
    public async Task<ActionResult<RecipeList>> AddRecipe(int listId, Recipe recipe)
    {
        // TODO check if user belongs to household which contains listId
        try
        {
            var result = await _recipeService.AddRecipe(listId, recipe);
            return result == null
                ? NotFound()
                : RedirectToAction(nameof(GetList), "Recipe", new {id = listId});
        }catch (ArgumentException ae)
        {
            return BadRequest(ae.Message);
        }
    }
    
    [HttpPost("ingredient")]
    public async Task<ActionResult<RecipeList>> AddRecipeIngredient(int listId, string recipeName, RecipeIngredient ingredient)
    {
        // TODO check if user belongs to household which contains listId
        try
        {
            var result = await _recipeService.AddIngredient(listId, recipeName, ingredient);
            return result == null
                ? NotFound()
                : RedirectToAction(nameof(GetList), "Recipe", new {id = listId});
        }
        catch (ArgumentException ae)
        {
            return BadRequest(ae.Message);
        }
    }

    [HttpGet("household/{householdId:int}")]
    public async Task<ActionResult<List<RecipeList>>> GetHouseholdRecipeLists(int householdId)
    {
        var authenticatedUser = HttpContext.User.Identity?.Name;
        if (authenticatedUser is null)
            return Forbid("User not authorized");

        var userHouseholds = await _householdService.FindUserHouseholds(authenticatedUser);
        if (userHouseholds.All(h => h.Id != householdId))
            return Forbid("User not part of given household");
        
        return await _recipeService.GetHouseholdLists(householdId);
    }
}