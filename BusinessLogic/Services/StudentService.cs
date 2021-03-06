﻿using BusinessLogic.Helpers;
using BusinessLogic.Interfaces;
using DataAccess.Entities;
using DataAccess.Interfaces;
using System.Threading.Tasks;
using BusinessLogic.DTO.CourseDTO;
using BusinessLogic.DTO.UserDTO;
using AutoMapper;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Linq;
using System;

namespace BusinessLogic.Services
{
    public class StudentService : IStudentService
    {
        private readonly IRepository<User> _userRepo;
        private readonly IMapper _mapper;

        public StudentService(IRepository<User> userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        public async Task<UserWithCoursesDTO> GetStudent(int id)
        {
            var student = await _userRepo.GetByIdAsync(id);
            if (student == null)
                return null;
            return _mapper.Map<UserWithCoursesDTO>(student);
        }

        public async Task<string> BlockStudent(int id)
        {
            var student = await _userRepo.GetByIdAsync(id);
            student.Blocked = !student.Blocked;
            _userRepo.Edit(student);
            return null;
        }

        public async Task<PageInfo<UserDTO>> GetStudents(QueryParamsDTO queryParams)
        {
            var students = _userRepo.GetAllQueryable();
            if (!string.IsNullOrEmpty(queryParams.Search))
                students = students.Where(s => s.FirstName.ToLower().Equals(queryParams.Search.ToLower())
                || s.LastName.ToLower().Equals(queryParams.Search.ToLower())
                || (s.FirstName + ' ' + s.LastName).ToLower().Equals(queryParams.Search.ToLower())
                || (s.LastName + ' ' + s.FirstName).ToLower().Equals(queryParams.Search.ToLower())
                || s.FirstName.ToLower().StartsWith(queryParams.Search.ToLower()));
            var columnsMap = new Dictionary<string, Expression<Func<User, object>>>
            {
                ["id"] = s => s.Id,
                ["firstName"] = s => s.FirstName,
                ["lastName"] = s => s.LastName,
                ["age"] = s => s.Age,
                ["email"] = s => s.Email,
                ["registrationDate"] = s => s.RegistrationDate,
                ["gender"] = s => s.Gender,
                ["blocked"] = s => s.Blocked
            };
            students = students.ApplyOrdering(queryParams, columnsMap);
            var pagedStudents = await PagedList<User>.CreateAsync(students, queryParams.CurrentPage, queryParams.PageSize);
            var listModel = _mapper.Map<IEnumerable<UserDTO>>(pagedStudents);
            var outputModel = new PageInfo<UserDTO>
            {
                List = listModel,
                Info = new PaginationOutputInfo
                {
                    CurrentPage = pagedStudents.CurrentPage,
                    PageSize = pagedStudents.PageSize,
                    TotalCount = pagedStudents.TotalCount,
                    TotalPages = pagedStudents.TotalPages
                }
            };
            return outputModel;
        }
    }
}