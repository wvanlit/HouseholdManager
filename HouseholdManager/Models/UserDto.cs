using System.ComponentModel.DataAnnotations;

namespace HouseholdManager.Models;

public class UserDto
{
    [Key] [Required] public string Username { get; set; } = string.Empty;
    [Required] public string Role { get; set; } = UserRole.Member.ToString();
    [Required] public List<(int, string)> Households = new();
}