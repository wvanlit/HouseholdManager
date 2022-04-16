using HouseholdManager.Models.Recipes;
using Microsoft.EntityFrameworkCore;

namespace HouseholdManager.Data;

public class DataContext : DbContext
{
     public DataContext(DbContextOptions<DataContext> options) : base(options) { }

     public DbSet<User> Users { get; set; }
     public DbSet<Household> Households { get; set; }
     
     public DbSet<RecipeList> RecipeLists { get; set; }
     public DbSet<Recipe> Recipes { get; set; }
     public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
}