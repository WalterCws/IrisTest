using FluentValidation;
using Iris.Core.Exceptions;
using Iris.ViewModels;
using Newtonsoft.Json;
using System.Net;

namespace Iris.Middlewares
{
    public class GlobalHandlerException(RequestDelegate _next, ILogger<GlobalHandlerException> _logger)
    {
        public async Task InvokeAsync(HttpContext httpContext)
        {
            var idTrace = Guid.NewGuid().ToString();

            try
            {
                await _next(httpContext);
            }
            catch (ValidationException ex)
            {
                _logger.LogError("{id} | Model Validation Error: {ex}", idTrace, ex);
                await HandleExceptionAsync(httpContext, HttpStatusCode.BadRequest, idTrace, string.Join(',', ex.Errors.Select(s => s.ErrorMessage).ToList()));
            }
            catch (BusinessException ex)
            {
                _logger.LogError("{id} | Business Error: {ex}", idTrace, ex);
                await HandleExceptionAsync(httpContext, HttpStatusCode.BadRequest, idTrace, ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError("{id} | Internal Server Error: {ex}", idTrace, ex);
                await HandleExceptionAsync(httpContext, HttpStatusCode.InternalServerError, idTrace, "Internal Server Error.");
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, HttpStatusCode httpStatusCode, string idTrace, string message)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)httpStatusCode;

            await context.Response.WriteAsync(JsonConvert.SerializeObject(new ErrorResponse
            {
                Id = idTrace,
                Message = message
            }));
        }
    }
}
