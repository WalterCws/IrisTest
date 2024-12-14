using Iris.Core.DTOs;

namespace Iris.Core.Services
{
    public interface IAuthenticationService
    {
        string GenerateJWTToken(UserDTO userDTO);
    }
}
