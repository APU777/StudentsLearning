using Hangfire;
using BusinessLogic.Interfaces;
using DataAccess.Entities;
using DataAccess.Interfaces;
using System;

namespace BusinessLogic.Services
{
    public class BackgroundEmailSender : IBackgroundEmailSender
    {
        private readonly IEmailSender _emailSender;
        private readonly IRepository<User> _userRepo;
        private readonly IRepository<UsersCourses> _courseRepo;

        public BackgroundEmailSender(IEmailSender emailSender,
                                     IRepository<User> userRepo,
                                     IRepository<UsersCourses> courseRepo)
        {
            _emailSender = emailSender;
            _userRepo = userRepo;
            _courseRepo = courseRepo;
        }

        public void SendNotificationEmails(string email, string courseName, DateTime startDate)
        {
            var monthNotify = startDate.AddMonths(1);
            var weekNotify = startDate.AddDays(7);
            var dayNotify = startDate.AddHours(-1);

            if (DateTime.Now < monthNotify)
                BackgroundJob.Schedule(() =>
                _emailSender.SendEmailAsync(email, "Montly Course start", $"Your course {courseName} will start at {startDate}"), monthNotify);
            if(DateTime.Now < weekNotify)
                BackgroundJob.Schedule(() =>
                _emailSender.SendEmailAsync(email, "Weekly Course notification", $"Your course {courseName} will start at {startDate}"), weekNotify);
            if (DateTime.Now < dayNotify)
                BackgroundJob.Schedule(() =>
                _emailSender.SendEmailAsync(email, "Daily Course notification", $"Your course {courseName} will start at {startDate}"), startDate);
            BackgroundJob.Schedule(() =>
                _emailSender.SendEmailAsync(email, "Subscribed Course notification", $"Your course {courseName} will start at {startDate}"), DateTime.Now);
        }
    }
}