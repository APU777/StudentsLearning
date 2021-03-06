﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using BusinessLogic.DTO.CourseDTO;
using BusinessLogic.Interfaces;
using StudentsLearning.ViewModels.CourseViewModels;
using System.Threading.Tasks;
using StudentsLearning.Helpers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using BusinessLogic.Helpers;
using System;

namespace StudentsLearning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseService _courseService;
        private readonly IMapper _mapper;

        public CoursesController(ICourseService courseService, IMapper mapper)
        {
            _courseService = courseService;
            _mapper = mapper;
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetCourse(int id)
        {
            var course = await _courseService.GetCourseById(id);
            if (course == null)
                return BadRequest("No such course");
            return Ok(_mapper.Map<CourseViewModel>(course));
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            await _courseService.DeleteCourse(id);
            return Ok("Deleted");
        }

        [Authorize(Roles = "admin")]
        [HttpPut("updateCourse")]
        public async Task<IActionResult> UpdateCourse([FromBody] UpdateCourseViewModel updateCourseView)
        {
            var updateCourse = _mapper.Map<UpdateCourseDTO>(updateCourseView);
            CourseDTO course = await _courseService.UpdateCourse(updateCourse);
            if (course == null)
                return BadRequest("Not updated");
            return Ok(_mapper.Map<CourseViewModel>(new CourseDTO()));
        }

        [Authorize(Roles = "admin")]
        [HttpPost("addCourse")]
        public async Task<IActionResult> AddCourse([FromBody] CourseAddViewModel courseAdd)
        {
            var addCourse = _mapper.Map<CourseAddDTO>(courseAdd);
            await _courseService.AddCourse(addCourse);
            return Ok("Added");
        }

        [Authorize(Roles = "admin")]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetCoursesForAdmin([FromQuery]CoursesQueryViewModel coursesViewModel)
        {
            var courses = _mapper.Map<QueryParamsDTO>(coursesViewModel);
            var result = await _courseService.GetAllCoursesForAdmin(courses);
            var pageInfo = result.Info;
            var coursesList = _mapper.Map<IEnumerable<CourseForAdminViewModel>>(result.List);
            Response.AddPagination(pageInfo.CurrentPage, pageInfo.PageSize, pageInfo.TotalCount, pageInfo.TotalPages);
            return Ok(coursesList);
        }

        [Authorize(Roles = "student")]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetCoursesForUser([FromQuery]CoursesQueryViewModel coursesViewModel)
        {
            var courses = _mapper.Map<QueryParamsDTO>(coursesViewModel);
            var result = await _courseService.GetAllCoursesForUser(courses);
            var pageInfo = result.Info;
            var coursesList = _mapper.Map<IEnumerable<CourseForUserViewModel>>(result.List);
            Response.AddPagination(pageInfo.CurrentPage, pageInfo.PageSize, pageInfo.TotalCount, pageInfo.TotalPages);
            return Ok(coursesList);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCourses([FromQuery]CoursesQueryViewModel pagingViewModel)
        {
            var paging = _mapper.Map<CoursesPagingDTO>(pagingViewModel);
            var result = await _courseService.GetAllCourses(paging);
            var pageInfo = result.Info;
            var coursesList = _mapper.Map<IEnumerable<CourseViewModel>>(result.List);
            Response.AddPagination(pageInfo.CurrentPage, pageInfo.PageSize, pageInfo.TotalCount, pageInfo.TotalPages);
            return Ok(coursesList);
        }

        [Authorize(Roles = "student")]
        [HttpPost("registerToCourse")]
        public async Task<IActionResult> RegisterToCourse([FromBody]CoureRegistrationViewModel courseRegistration)
        {
            string userConfirmed = User.FindFirst(ClaimTypes.IsPersistent).Value;
            if (userConfirmed == "False")
                return BadRequest("Confirm your email to be allowed for subscribtion");
            DateTime startDate = DateTime.ParseExact(courseRegistration.StartDate, "dd/MM/yyyy HH:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
            var res = await _courseService.
            RegisterToCourse(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), courseRegistration.CourseId, startDate);
            if (res.Successful)
                return Ok(res.Information);
            return BadRequest(res.Information);
        }

        [Authorize(Roles = "student")]
        [HttpGet("getMyCourses")]
        public IActionResult GetStudentsCourses()
        {
            var courses = _courseService.GetStudentsCourses(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));
            return Ok(_mapper.Map<IEnumerable<CourseViewModel>>(courses));
        }
    }
}