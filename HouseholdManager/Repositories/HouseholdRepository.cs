using Microsoft.EntityFrameworkCore;

namespace HouseholdManager.Repositories;

public class HouseholdRepository : BaseRepository<Household>
{
    public HouseholdRepository(DataContext ctx) : base(ctx)
    {
    }
    
    public async Task<Household?> GetHousehold(int id)
    {
        var household = await Ctx.Households
            .Include(h => h.Users)
            .FirstOrDefaultAsync(h => h.Id == id);
        return household;
    }
}