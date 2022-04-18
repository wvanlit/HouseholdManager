using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HouseholdManager.Models.Recipes;

public class RecipeList
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public int HouseholdId { get; set; }
    
    public string Name { get; set; } = string.Empty;
    [Required] public List<Recipe> Recipes { get; set; } = new();
}