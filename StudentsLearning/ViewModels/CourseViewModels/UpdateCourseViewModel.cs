using System;

namespace StudentsLearning.ViewModels.CourseViewModels
{
    public class UpdateCourseViewModel
    {
        public int Id { get; set; }
        public string CourseName { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }
}