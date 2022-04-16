using HouseholdManager.Models.Recipes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HouseholdManager.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly RecipeService _recipeService;

    public RecipeController(RecipeService recipeService)
    {
        _recipeService = recipeService;
    }

    [HttpGet("list/{id:int}")]
    public async Task<ActionResult<RecipeList>> GetList(int id)
    {
        var list = await _recipeService.GetList(id);
        return list == null ? NotFound() : Ok(list);
    }

    [HttpPost("list")]
    public async Task<ActionResult<RecipeList>> CreateList(int householdId)
    {
        // TODO check if user belongs to household
        return Ok(await _recipeService.CreateNew(householdId));
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
}