using System;

namespace BusinessLogic.DTO.UserDTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhotoUrl { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}