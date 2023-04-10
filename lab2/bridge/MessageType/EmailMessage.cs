using bridge.AbstractClass;
using bridge.Interfaces;

namespace bridge.MessageType;

public class EmailMessage : Message
{
    public EmailMessage(IMessageSender messageSender) : base(messageSender) { }

    public override void Send()
    {
        _messageSender.SendMessage(Text, Recipient);
    }
}