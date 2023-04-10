namespace bridge.Interfaces;

public interface IMessageSender
{
    void SendMessage(string message, string recipient);
}