namespace HouseholdManager.Repositories;

public class UserRepository : BaseRepository<User>
{
    public UserRepository(DataContext ctx) : base(ctx) {}
}