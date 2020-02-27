using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using DataAccess.Configuration.InitialData;
using DataAccess.Configuration.RelationConfig;
using DataAccess.Entities;

namespace DataAccess.Context
{
    public class StudentsAccountingDbContext :  IdentityDbContext<User, IdentityRole<int>, int>
    {
        public StudentsAccountingDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<UsersCourses> UsersCourses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new CoursesInitialData());
            builder.ApplyConfiguration(new UsersCoursesConfig());
            builder.ApplyConfiguration(new UsersInitialData());
            builder.ApplyConfiguration(new UsersCoursesInitialData());
            builder.ApplyConfiguration(new RoleInitialData());
        }
    }
}
