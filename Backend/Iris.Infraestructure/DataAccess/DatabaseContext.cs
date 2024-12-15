using Microsoft.EntityFrameworkCore;

namespace Iris.Infraestructure.DataAccess
{
    public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
    {
        public DbSet<Core.Entities.Task> Tasks { get; set; }
    }
}
