using HouseholdManager.Models.Recipes;
using Microsoft.EntityFrameworkCore;

namespace HouseholdManager.Repositories;

public class RecipeRepository
{
    private readonly DataContext _ctx;

    public RecipeRepository(DataContext ctx)
    {
        _ctx = ctx;
    }

    public async Task<RecipeList> CreateList(RecipeList recipeList)
    {
        await _ctx.RecipeLists.AddAsync(recipeList);
        await _ctx.SaveChangesAsync();
        return recipeList;
    }

    public async Task<RecipeList?> GetList(int id)
    {
        var recipeList = await _ctx.RecipeLists
            .Include(r => r.Recipes)
            .ThenInclude(r => r.Ingredients)
            .FirstOrDefaultAsync(l => l.Id == id);
        return recipeList;
    }
    
    public async Task<Recipe?> AddRecipe(int listId, Recipe recipe)
    {
        var recipeList = await GetList(listId);
        if (recipeList == null) return null;
        var foundRecipe = recipeList.Recipes.Find(r => r.Name == recipe.Name);
        if (foundRecipe != null) throw new ArgumentException($"Recipe '{recipe.Name}' already exists");
        
        _ctx.Update(recipeList);

        recipeList.Recipes.Add(recipe);

        await _ctx.SaveChangesAsync();

        return recipe;
    }

    public async Task<RecipeIngredient?> AddIngredient(int listId, string recipeName, RecipeIngredient ingredient)
    {
        var recipeList = await GetList(listId);
        if (recipeList == null) return null;
        var recipe = recipeList.Recipes.First(r => r.Name == recipeName);

        var foundIngredient = recipe.Ingredients.Find(i => i.Name == ingredient.Name);
        if (foundIngredient != null) throw new ArgumentException($"Ingredient '{ingredient.Name}' already exists");
        
        _ctx.Recipes.Update(recipe);
        
        recipe.Ingredients.Add(ingredient);
        
        await _ctx.SaveChangesAsync();

        return ingredient;
    }
}