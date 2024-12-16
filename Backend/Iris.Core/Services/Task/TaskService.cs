using Iris.Core.DTOs;
using Iris.Core.Exceptions;
using Iris.Core.Repositories;

namespace Iris.Core.Services
{
    public class TaskService(ITaskRepository taskRepository) : ITaskService
    {
        public async Task<IEnumerable<TaskDTO>> GetAllTask()
        {
            var taskList = await taskRepository.GetAllAsync();
            return taskList.Select(s => new TaskDTO
            {
                Id = s.Id,
                Description = s.Description,
                IsCompleted = s.IsCompleted,
                IsFavourite = s.IsFavorite,
                DeadlineAt = s.DeadlineAt
            }).OrderByDescending(s => s.IsFavourite);
        }
        
        public async Task<int> AddTask(TaskRequestDTO task)
        {
            var taskEntitie = new Entities.Task
            {
                CreatedAt = DateTime.Now.AddHours(-5),
                Description = task.Description,
                IsCompleted = false,
                IsFavorite = false,
                DeadlineAt = task.DeadlineAt.HasValue ? task.DeadlineAt.Value.Date : null
            };
            await taskRepository.AddAsync(taskEntitie);
            return taskEntitie.Id;
        }
        
        public async Task DeleteTask(int idTask)
        {
            var task = await taskRepository.GetByIdAsync(idTask) ?? 
                throw new BusinessException($"Task: {idTask} was not found");

            await taskRepository.RemoveAsync(task);
        }
        
        public async Task<int> UpdateTask(TaskDTO task)
        {
            var taskDb = await taskRepository.GetByIdAsync(task.Id) ?? 
                throw new BusinessException($"Task: {task.Id} was not found");

            taskDb.IsFavorite = task.IsFavourite;
            taskDb.IsCompleted = task.IsCompleted;
            taskDb.Description = task.Description;
            taskDb.DeadlineAt = task.DeadlineAt;
            taskDb.ModifiedAt = DateTime.Now.AddHours(-5);

            await taskRepository.UpdateAsync(taskDb);
            return taskDb.Id;
        }
        
        public async Task<int> UpdateTaskDescription(int idTask)
        {
            var taskDb = await taskRepository.GetByIdAsync(idTask) ?? 
                throw new BusinessException($"Task: {idTask} was not found");

            taskDb.ModifiedAt = DateTime.Now.AddHours(-5);

            await taskRepository.UpdateAsync(taskDb);
            return taskDb.Id;
        }
        
        public async Task<int> MarkTaskCompleted(int idTask)
        {
            var taskDb = await taskRepository.GetByIdAsync(idTask) ?? 
                throw new BusinessException($"Task: {idTask} was not found");

            taskDb.IsCompleted = true;
            taskDb.ModifiedAt = DateTime.Now.AddHours(-5);

            await taskRepository.UpdateAsync(taskDb);
            return taskDb.Id;
        }
        
        public async Task<int> MarkTaskFavourite(int idTask, bool isFavourite)
        {
            var taskDb = await taskRepository.GetByIdAsync(idTask) ?? 
                throw new BusinessException($"Task: {idTask} was not found");

            taskDb.IsFavorite = isFavourite;
            taskDb.ModifiedAt = DateTime.Now.AddHours(-5);

            await taskRepository.UpdateAsync(taskDb);
            return taskDb.Id;
        }
    }
}
