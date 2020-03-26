using AutoMapper;
using BusinessLogic.DTO.AuthDTO;
using BusinessLogic.DTO.CourseDTO;
using BusinessLogic.DTO.UserDTO;
using BusinessLogic.Helpers;
using StudentsLearning.ViewModels.AuthViewModels;
using StudentsLearning.ViewModels.CourseViewModels;
using StudentsLearning.ViewModels.StudentViewModels;
using StudentsLearning.ViewModels.UserViewModels;

namespace StudentsLearning.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<LoginViewModel, LoginDTO>();
            CreateMap<RegisterViewModel, RegisterDTO>();
            CreateMap<CoursesQueryViewModel, CoursesPagingDTO>();
            CreateMap<CoursesQueryViewModel, QueryParamsDTO>();
            CreateMap<CourseDTO, CourseViewModel>();
            CreateMap<UpdateCourseViewModel, UpdateCourseDTO>();
            CreateMap<CourseAddViewModel, CourseAddDTO>();
            CreateMap<CourseForAdminDTO, CourseForAdminViewModel>();
            CreateMap<CourseForUserDTO, CourseForUserViewModel>();
            CreateMap<StudentQueryViewModel, QueryParamsDTO>();
            CreateMap<UserDTO, UserViewModel>();
            CreateMap<UserDTO, UserForAdminViewModel>();
            CreateMap<UserViewModel, UserDTO>();
            CreateMap<UserWithCoursesDTO, UserWithCoursesViewModel>();
            CreateMap<UpdateUserProfileViewModel, UpdateUserProfileDTO>();
        }
    }
}