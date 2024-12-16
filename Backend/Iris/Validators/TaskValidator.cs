using FluentValidation;
using Iris.Core.DTOs;
using Iris.Core.Services;

namespace Iris.Validators
{
    public sealed class TaskValidator : AbstractValidator<TaskDTO>
    {
        public TaskValidator()
        {
            RuleFor(s => s.Description)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Description is required");
        }
    }
}
