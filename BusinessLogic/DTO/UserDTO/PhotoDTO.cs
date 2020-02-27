using Microsoft.AspNetCore.Http;

namespace BusinessLogic.DTO.UserDTO
{
    public class PhotoDTO
    {
        public IFormFile File { get; set; }
    }
}