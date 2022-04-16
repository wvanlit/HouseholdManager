using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace HouseholdManager.Repositories;

public abstract class BaseRepository<TModel> where TModel : class
{
    protected readonly DataContext Ctx;
    protected readonly DbSet<TModel> Table;

    protected BaseRepository(DataContext ctx)
    {
        Ctx = ctx;
        Table = ctx.Set<TModel>();
    }

    public virtual async Task Create(TModel model)
    {
        await Table.AddAsync(model);
        await Ctx.SaveChangesAsync();
    }

    public virtual async Task<TModel?> Find(object key)
    {
        return await Table.FindAsync(key);
    }

    public virtual async Task Update(TModel model)
    {
        Table.Update(model).CurrentValues.SetValues(model);
        await Ctx.SaveChangesAsync();
    }

    public virtual async Task Delete(TModel model)
    {
        Table.Remove(model);
        await Ctx.SaveChangesAsync();
    }

    public virtual IQueryable<TModel> Where(Expression<Func<TModel,bool>> predicate)
    {
        return Table.Where(predicate);
    }
}