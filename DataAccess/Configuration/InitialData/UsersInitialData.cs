﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DataAccess.Entities;
using System;

namespace DataAccess.Configuration.InitialData
{
    public class UsersInitialData : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            int id = 0;
            var users = new User[]
            {
                new User
                {
                    Id = ++id,
                    FirstName = "John",
                    LastName = "Reed",
                    Age = 20,
                    Email = "john@gmail.com",
                    EmailConfirmed = true,
                    Gender = "Male",
                    RegistrationDate = new DateTime(2018, 4, 10),
                    Blocked = false
                },
                new User
                {
                    Id = ++id,
                    FirstName = "Paul",
                    LastName = "Smith",
                    Age = 25,
                    Email = "paul@gmail.com",
                    EmailConfirmed = true,
                    Gender = "Male",
                    RegistrationDate = new DateTime(2017, 4, 10),
                    Blocked = false
                },
                new User
                {
                    Id = ++id,
                    FirstName = "Lola",
                    LastName = "Taylor",
                    Age = 21,
                    Email = "lola@gmail.com",
                    EmailConfirmed = true,
                    Gender = "Female",
                    RegistrationDate = new DateTime(2019, 4, 10),
                    Blocked = false
                },
                new User
                {
                    Id = ++id,
                    FirstName = "Vinnie",
                    LastName = "Johns",
                    Age = 22,
                    Email = "vinnie@gmail.com",
                    EmailConfirmed = true,
                    Gender = "Male",
                    RegistrationDate = new DateTime(2018, 3, 8),
                    Blocked = false
                },
                new User
                {
                    Id = ++id,
                    FirstName = "Paul",
                    LastName = "Guilbert",
                    Age = 23,
                    Email = "paulgilbert@gmail.com",
                    EmailConfirmed = true,
                    Gender = "Male",
                    RegistrationDate = new DateTime(2019, 3, 16),
                    Blocked = false
                },
                new User
                {
                    Id = ++id,
                    FirstName = "Elizabeth",
                    LastName = "Moore",
                    Age = 24,
                    Email = "elizabeth@gmail.com",
                    EmailConfirmed = true,
                    Gender = "Female",
                    RegistrationDate = new DateTime(2018, 10, 11),
                    Blocked = false
                },
                new User
                {
                    Id = ++id,
                    FirstName = "Axl",
                    LastName = "Rose",
                    Age = 26,
                    Email = "axl@gmail.com",
                    EmailConfirmed = true,
                    Gender = "Male",
                    RegistrationDate = new DateTime(2017, 6, 11),
                    Blocked = false
                },
                new User
                {
                    Id = ++id,
                    FirstName = "Madison",
                    LastName = "Ivy",
                    Age = 27,
                    Email = "madison@gmail.com",
                    EmailConfirmed = true,
                    Gender = "Female",
                    RegistrationDate = new DateTime(2017, 9, 21),
                    Blocked = false
                },
                new User
                {
                    Id = ++id,
                    FirstName = "Enakin",
                    LastName = "Skywalker",
                    Age = 28,
                    Email = "enakin@gmail.com",
                    EmailConfirmed = true,
                    Gender = "Male",
                    RegistrationDate = new DateTime(2018, 9, 18),
                    Blocked = false 
                }
            };
            builder.HasData(users);
        }
    }
}