using mediator.Interfaces;

namespace mediator.Classes;

public class User : IUser
{
    private readonly IChatMediator _mediator;
    private readonly string _name;

    public User(IChatMediator mediator, string name)
    {
        _mediator = mediator;
        _name = name;
        _mediator.AddUser(this);
    }

    public void SendMessage(string message, IUser receiver)
    {
        _mediator.SendMessage(message, this, receiver);
    }

    public void ReceiveMessage(string message, IUser sender)
    {
        Console.WriteLine($"{_name} received a message from {sender.GetName()}: {message}");
    }

    public string GetName()
    {
        return _name;
    }
}
