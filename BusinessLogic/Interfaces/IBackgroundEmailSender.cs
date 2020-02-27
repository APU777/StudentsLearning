using System;

namespace BusinessLogic.Interfaces
{
    public interface IBackgroundEmailSender
    {
        void SendNotificationEmails(string email, string courseName, DateTime startDate);
    }
}