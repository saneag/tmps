using bridge.Interfaces;

namespace bridge.Senders;

public class SMSMessageSender : IMessageSender
{
    public void SendMessage(string message, string recipient)
    {
        Console.WriteLine($"SMS message to {recipient}: {message}");
    }
}