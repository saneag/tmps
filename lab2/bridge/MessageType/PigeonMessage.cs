using bridge.AbstractClass;
using bridge.Interfaces;

namespace bridge.MessageType;

public class PigeonMessage : Message
{
    public PigeonMessage(IMessageSender messageSender) : base(messageSender) { }

    public override void Send()
    {
        _messageSender.SendMessage(Text, Recipient);
    }
}