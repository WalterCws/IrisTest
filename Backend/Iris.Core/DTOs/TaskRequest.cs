namespace Iris.Core.DTOs
{
    public class TaskRequestDTO
    {
        public required string Description { get; set; }
        public DateTime? DeadlineAt { get; set; }
    }
}
