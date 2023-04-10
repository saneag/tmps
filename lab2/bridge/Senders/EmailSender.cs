using bridge.Interfaces;

namespace bridge.Senders;

public class EmailMessageSender : IMessageSender
{
    public void SendMessage(string message, string recipient)
    {
        Console.WriteLine($"Email message to {recipient}: {message}");
    }
}