using FluentValidation;
using Iris.Core.DTOs;
using Iris.Core.Repositories;
using Iris.Core.Services;
using Iris.Infraestructure.DataAccess;
using Iris.Validators;
using Microsoft.EntityFrameworkCore;

namespace Iris.Extensions
{
    internal static class InjectorExtension
    {
        internal static void AddDependencies(this IServiceCollection services , WebApplicationBuilder? webApplication)
        {
            ArgumentNullException.ThrowIfNull(webApplication, nameof(WebApplicationBuilder));

            var dbConnection = webApplication.Configuration.GetConnectionString("database");
            services.AddDbContext<DatabaseContext>
                (options => options.UseSqlServer(dbConnection));

            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IValidator<UserDTO>,UserValidator>();
            services.AddScoped<ITaskService,TaskService>();
            services.AddScoped<ITaskRepository,TaskRepository>();
            services.AddScoped<IValidator<TaskRequestDTO>, TaskRequestValidator>();
            services.AddScoped<IValidator<TaskDTO>, TaskValidator>();

        }
    }   
}
