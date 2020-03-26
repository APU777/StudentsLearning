using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.DTO.CourseDTO
{
    public class UpdateCourseDTO
    {
        public int Id { get; set; }
        public string CourseName { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }
}
