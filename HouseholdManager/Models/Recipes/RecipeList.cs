using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HouseholdManager.Models.Recipes;

public class RecipeList
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public int HouseholdId { get; set; }
    [Required] public List<Recipe> Recipes { get; set; } = new();
}