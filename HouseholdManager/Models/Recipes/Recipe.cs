using System.ComponentModel.DataAnnotations;

namespace HouseholdManager.Models.Recipes;

public class Recipe
{
    [Key] [Required] public string Name { get; set; } = null!;
    [Required] public List<RecipeIngredient> Ingredients { get; set; } = new();
    
    public string RecipeLink { get; set; } = String.Empty;
}