using StudentsLearning.ViewModels.UserViewModels;
using System.Collections.Generic;

namespace StudentsLearning.ViewModels.CourseViewModels
{
    public class CourseForUserViewModel
    {
        public int Id { get; set; }
        public string CourseName { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }
}