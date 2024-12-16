using Iris.Core.Entities;
using Iris.Infraestructure.DataAccess;

namespace Iris.Core.Repositories
{
    public class TaskRepository(DatabaseContext context) : GenericRepository<Entities.Task>(context), Repositories.ITaskRepository
    {
    }
}
