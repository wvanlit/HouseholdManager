using HouseholdManager.Models.Recipes;

namespace HouseholdManager.Services;

public class RecipeService
{
    private readonly RecipeRepository _recipeRepository;

    public RecipeService(RecipeRepository recipeRepository)
    {
        _recipeRepository = recipeRepository;
    }

    public async Task<RecipeList> CreateNew(int householdId, string name)
    {
        var recipeList = new RecipeList()
        {
            HouseholdId = householdId,
            Name = name,
            Recipes = new List<Recipe>()
        };
        return await _recipeRepository.CreateList(recipeList);
    }

    public async Task<RecipeList?> GetList(int id)
    {
        return await _recipeRepository.GetList(id);
    }

    public async Task<List<RecipeList>> GetHouseholdLists(int householdId)
    {
        return await _recipeRepository.GetListsFromHousehold(householdId);
    }

    public async Task<Recipe?> AddRecipe(int listId, Recipe recipe)
    {
        return await _recipeRepository.AddRecipe(listId, recipe);
    }
    
    public async Task<RecipeIngredient?> AddIngredient(int listId, string recipeName, RecipeIngredient ingredient)
    {
        return await _recipeRepository.AddIngredient(listId, recipeName, ingredient);
    }
}