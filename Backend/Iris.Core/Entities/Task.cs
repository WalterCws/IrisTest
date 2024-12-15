using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Iris.Core.Entities
{
    [Table(nameof(Task), Schema = "iris")]
    public class Task
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsFavorite { get; set; }
        public DateTime? DeadlineAt { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
