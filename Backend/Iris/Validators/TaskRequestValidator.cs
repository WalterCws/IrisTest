using FluentValidation;
using Iris.Core.DTOs;

namespace Iris.Validators
{
    public sealed class TaskRequestValidator : AbstractValidator<TaskRequestDTO>
    {
        public TaskRequestValidator()
        {
            RuleFor(s => s.Description)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Description is required");
        }
    }
}
