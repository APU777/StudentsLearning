using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BusinessLogic.Helpers;
using BusinessLogic.Interfaces;
using StudentsLearning.Helpers;
using StudentsLearning.ViewModels.StudentViewModels;
using StudentsLearning.ViewModels.UserViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentsLearning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentService _studentService;
        private readonly IMapper _mapper;

        public StudentsController(IStudentService studentService, IMapper mapper)
        {
            _studentService = studentService;
            _mapper = mapper;
        }

        [Authorize(Roles = "admin")]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetStudentsForAdmin([FromQuery]StudentQueryViewModel studentViewModel)
        {
            var queryDTO = _mapper.Map<QueryParamsDTO>(studentViewModel);
            var result = await _studentService.GetStudents(queryDTO);
            var studentsList = _mapper.Map<IEnumerable<UserForAdminViewModel>>(result.List);
            var pageInfo = result.Info;
            Response.AddPagination(pageInfo.CurrentPage, pageInfo.PageSize, pageInfo.TotalCount, pageInfo.TotalPages);
            return Ok(studentsList);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetStudent(int id)
        {
            var student = await _studentService.GetStudent(id);
            if (student == null)
                return BadRequest("User was not found");
            return Ok(_mapper.Map<UserWithCoursesViewModel>(student));
        }

        [Authorize(Roles = "admin")]
        [HttpPost("blockStudent")]
        public async Task<IActionResult> BlockStudent([FromBody]StudentBlockViewModel id)
        {
            await _studentService.BlockStudent(id.Id);
            return Ok("Blocked");
        }
    }
}