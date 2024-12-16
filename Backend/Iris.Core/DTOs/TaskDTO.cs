namespace Iris.Core.DTOs
{
    public class TaskDTO
    {
        public int Id { get; set; }
        public required string Description { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsFavourite { get; set; }
        public DateTime? DeadlineAt { get; set; }
    }
}
