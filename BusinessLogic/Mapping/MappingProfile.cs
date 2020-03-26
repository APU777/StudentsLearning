using AutoMapper;
using BusinessLogic.DTO.AuthDTO;
using BusinessLogic.DTO.CourseDTO;
using BusinessLogic.DTO.UserDTO;
using DataAccess.Entities;
using System.Linq;

namespace BusinessLogic.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterDTO, User>()
                .ForMember(u => u.Email, opt => opt.MapFrom(r => r.Login));
            CreateMap<Course, CourseDTO>();
            CreateMap<Course, CourseForUserDTO>();
            CreateMap<Course, CourseForAdminDTO>()
                .ForMember(c => c.Attenders, opt => opt.MapFrom(u => u.Attenders.Select(user => new UserDTO
                {
                    Id = user.User.Id,
                    FirstName = user.User.FirstName,
                    LastName = user.User.LastName,
                    Age = user.User.Age,
                    Gender = user.User.Gender,
                    PhotoUrl = user.User.PhotoUrl,
                    RegistrationDate = user.User.RegistrationDate
                })));
            CreateMap<User, UserDTO>();
            CreateMap<User, UserWithCoursesDTO>()
                .ForMember(u => u.Courses, opt => opt.MapFrom(c => c.Courses.Select(course => new CourseDTO
                {
                    Id = course.CourseId,
                    CourseName = course.Course.CourseName
                })));
            CreateMap<UsersCourses, CourseDTO>()
                .ForMember(c => c.Id, opt => opt.MapFrom(uc => uc.CourseId))
                .ForMember(c => c.CourseName, opt => opt.MapFrom(uc => uc.Course.CourseName))
                .ForMember(c => c.StartDate, opt => opt.MapFrom(uc => uc.StartDate))
                .ForMember(c => c.Description, opt => opt.MapFrom(uc => uc.Course.Description));
        }
    }
}