using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

namespace Iris.Extensions
{
    internal static class SwaggerExtension
    {
        internal static void SwaggerSettings(this IServiceCollection services)
        {
            services.AddSwaggerGen(s =>
            {
                 s.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                 {
                     Name = "Authorization",
                     Type = SecuritySchemeType.Http,
                     Scheme = JwtBearerDefaults.AuthenticationScheme,
                     BearerFormat = "JWT",
                     In = ParameterLocation.Header,
                     Description = "Enter JWT token from auth endpoint",
                 });
                 s.AddSecurityRequirement(new OpenApiSecurityRequirement {
            {
                    new OpenApiSecurityScheme {
                        Reference = new OpenApiReference {
                            Type = ReferenceType.SecurityScheme,
                                Id = JwtBearerDefaults.AuthenticationScheme
                        }
                    },
                    Array.Empty<string>()
                    }
                });
            });
        }
    }   
}
