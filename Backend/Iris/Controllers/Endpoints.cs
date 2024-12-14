using Microsoft.AspNetCore.Authorization;
using Iris.Core.Services;
using Iris.Core.DTOs;
using FluentValidation;
using Iris.ViewModels;

namespace Iris.Controllers
{
    public static class Endpoints
    {
        public static void AddEndpoints(this WebApplication app)
        {
            ArgumentNullException.ThrowIfNull(app);

            var groupApi = app.MapGroup("/api/v1");

            groupApi.MapPost("/auth", [AllowAnonymous] async (IAuthenticationService service, IValidator<UserDTO> validator, UserDTO user) =>
            {
                await validator.ValidateAndThrowAsync(user);
                return TypedResults.Ok(new ResultResponse { Data = service.GenerateJWTToken(user)});
            })
            .WithTags("Authenticate")                
            .Produces<ResultResponse>(StatusCodes.Status200OK)
            .Produces<ErrorResponse>(StatusCodes.Status404NotFound)
            .Produces<ErrorResponse>(StatusCodes.Status500InternalServerError);
        } 
    }
}
