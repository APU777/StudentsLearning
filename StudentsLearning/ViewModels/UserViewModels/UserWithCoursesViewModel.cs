using System.Collections.Generic;

namespace StudentsLearning.ViewModels.UserViewModels
{
    public class UserWithCoursesViewModel : UserViewModel
    {
        public List<CourseViewModels.CourseViewModel> Courses { get; set; }
    }
}