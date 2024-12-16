using Microsoft.AspNetCore.Authorization;
using Iris.Core.Services;
using Iris.Core.DTOs;
using FluentValidation;
using Iris.ViewModels;
using Iris.Core.Exceptions;

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
                return TypedResults.Ok(new ResultResponse<string> { Data = service.GenerateJWTToken(user)});
            })
            .WithTags("Authenticate")                
            .Produces<ResultResponse<string>>(StatusCodes.Status200OK)
            .Produces<ErrorResponse>(StatusCodes.Status404NotFound)
            .Produces<ErrorResponse>(StatusCodes.Status500InternalServerError);

            groupApi.MapGet("/todo", [Authorize] async (ITaskService service) =>
            {              
                return TypedResults.Ok(new ResultResponse<IEnumerable<TaskDTO>> { Data = await service.GetAllTask() });
            })
            .WithTags("ToDo")
            .Produces<ResultResponse<IEnumerable<Core.Entities.Task>>>(StatusCodes.Status200OK)
            .Produces<ErrorResponse>(StatusCodes.Status404NotFound)
            .Produces<ErrorResponse>(StatusCodes.Status500InternalServerError);

            groupApi.MapPost("/todo", [Authorize] async (ITaskService service, IValidator<TaskRequestDTO> validator, TaskRequestDTO task) =>
            {                
                await validator.ValidateAndThrowAsync(task);
                return TypedResults.Ok(new ResultResponse<int> { Data = await service.AddTask(task) });
            })
            .WithTags("ToDo")
            .Produces<ResultResponse<Core.Entities.Task>>(StatusCodes.Status200OK)
            .Produces<ErrorResponse>(StatusCodes.Status404NotFound)
            .Produces<ErrorResponse>(StatusCodes.Status500InternalServerError);

            groupApi.MapDelete("/todo/{idTask}", [Authorize] async (ITaskService service, int idTask) =>
            {
                await service.DeleteTask(idTask);
                return TypedResults.Ok(new ResultResponse<int> { Data = idTask });
            })
            .WithTags("ToDo")
            .Produces<ResultResponse<int>>(StatusCodes.Status200OK)
            .Produces<ErrorResponse>(StatusCodes.Status404NotFound)
            .Produces<ErrorResponse>(StatusCodes.Status500InternalServerError);

            groupApi.MapPut("/todo/{idTask}/favourite", [Authorize] async (ITaskService service, int idTask, TaskRequestFavouriteDTO payload) =>
            {
                if (idTask == 0)
                    throw new BusinessException();
                return TypedResults.Ok(new ResultResponse<int> { Data = await service.MarkTaskFavourite(idTask,payload.IsFavourite) });
            })
            .WithTags("ToDo")
            .Produces<ResultResponse<Core.Entities.Task>>(StatusCodes.Status200OK)
            .Produces<ErrorResponse>(StatusCodes.Status404NotFound)
            .Produces<ErrorResponse>(StatusCodes.Status500InternalServerError);

            groupApi.MapPut("/todo/{idTask}/done", [Authorize] async (ITaskService service, IValidator<TaskDTO> validator, int idTask) =>
            {
                if (idTask == 0)
                    throw new BusinessException();
               
                return TypedResults.Ok(new ResultResponse<int> { Data = await service.MarkTaskCompleted(idTask) });
            })
            .WithTags("ToDo")
            .Produces<ResultResponse<int>>(StatusCodes.Status200OK)
            .Produces<ErrorResponse>(StatusCodes.Status404NotFound)
            .Produces<ErrorResponse>(StatusCodes.Status500InternalServerError);
        } 
    }
}
