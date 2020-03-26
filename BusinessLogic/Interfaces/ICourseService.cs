using BusinessLogic.DTO.CourseDTO;
using BusinessLogic.Helpers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces
{
    public interface ICourseService
    {
        Task<CourseDTO> GetCourseById(int id);
        Task<CourseDTO> GetCourseByName(string name);
        Task<CourseDTO> AddCourse(CourseAddDTO updateCourse);
        Task<String> DeleteCourse(int id);
        Task<PageInfo<CourseDTO>> GetAllCourses(CoursesPagingDTO paging);
        Task<CourseDTO> UpdateCourse(UpdateCourseDTO updateCourse);
        Task<PageInfo<CourseForAdminDTO>> GetAllCoursesForAdmin(QueryParamsDTO queryParams);
        Task<PageInfo<CourseForUserDTO>> GetAllCoursesForUser(QueryParamsDTO queryParams);
        Task<Response> RegisterToCourse(int userId, int courseId, DateTime startDate);
        IEnumerable<CourseDTO> GetStudentsCourses(int userId);
    }
}