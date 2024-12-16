using Iris.Core.DTOs;

namespace Iris.Core.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDTO>> GetAllTask();
        Task<int> AddTask(TaskRequestDTO task);
        Task DeleteTask(int idTask);
        Task<int> UpdateTask(TaskDTO task);
        Task<int> MarkTaskCompleted(int idTask);
        Task<int> MarkTaskFavourite(int idTask, bool isFavourite);
    }
}
