using Microsoft.EntityFrameworkCore;

namespace Iris.Infraestructure.DataAccess
{
    public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
    {
    }
}
