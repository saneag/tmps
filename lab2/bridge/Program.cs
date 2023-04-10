using bridge.Interfaces;
using bridge.MessageType;
using bridge.Senders;

namespace bridge
{
    class Program
    {
        static void Main(string[] args)
        {
            var emailSender = new EmailMessageSender();
            var smsSender = new SMSMessageSender();
            var pigeonSender = new PigeonMessageSender();

            var emailMessage = new EmailMessage(emailSender) { Recipient = "jane@example.com", Text = "Hello, world!" };
            emailMessage.Send();

            var smsMessage = new SMSMessage(smsSender) { Recipient = "+1 234 567 8901", Text = "Hi there!" };
            smsMessage.Send();
            
            var pigeonMessage = new PigeonMessage(pigeonSender) { Recipient = "Pigeon", Text = "Cool!" };
            pigeonMessage.Send();

            Console.ReadKey();
        }
    }
}