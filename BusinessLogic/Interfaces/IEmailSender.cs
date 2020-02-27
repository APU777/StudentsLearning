using System.Threading.Tasks;

namespace BusinessLogic.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
