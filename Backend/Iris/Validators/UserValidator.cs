using FluentValidation;
using Iris.Core.DTOs;

namespace Iris.Validators
{
    public sealed class UserValidator : AbstractValidator<UserDTO>
    {
        public UserValidator()
        {
            RuleFor(s => s.Email)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Email incorrect format");
        }
    }
}
