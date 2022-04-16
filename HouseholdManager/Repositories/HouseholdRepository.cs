using Microsoft.EntityFrameworkCore;

namespace HouseholdManager.Repositories;

public class HouseholdRepository : BaseRepository<Household>
{
    public HouseholdRepository(DataContext ctx) : base(ctx)
    {
    }
    
    
}