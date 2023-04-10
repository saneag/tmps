using bridge.Interfaces;

namespace bridge.Senders;

public class PigeonMessageSender : IMessageSender
{
    public void SendMessage(string message, string recipient)
    {
        Console.WriteLine($"Sending a pigeon to {recipient} with the message: {message}");
    }
}