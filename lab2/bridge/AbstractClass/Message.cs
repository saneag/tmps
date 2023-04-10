using bridge.Interfaces;

namespace bridge.AbstractClass;

public abstract class Message
{
    protected IMessageSender _messageSender;

    public Message(IMessageSender messageSender)
    {
        _messageSender = messageSender;
    }

    public string Recipient { get; set; }
    public string Text { get; set; }

    public abstract void Send();
}