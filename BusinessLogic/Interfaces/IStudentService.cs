using BusinessLogic.DTO.CourseDTO;
using BusinessLogic.DTO.UserDTO;
using BusinessLogic.Helpers;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces
{
    public interface IStudentService
    {
        Task<PageInfo<UserDTO>> GetStudents(QueryParamsDTO filters);
        Task<UserWithCoursesDTO> GetStudent(int id);
        Task<string> BlockStudent(int id);
    }
}