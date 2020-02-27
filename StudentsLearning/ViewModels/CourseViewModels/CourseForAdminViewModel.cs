using StudentsLearning.ViewModels.UserViewModels;
using System.Collections.Generic;

namespace StudentsLearning.ViewModels.CourseViewModels
{
    public class CourseForAdminViewModel
    {
        public int Id { get; set; }
        public string CourseName { get; set; }
        public List<UserViewModel> Attenders { get; set; }
    }
}