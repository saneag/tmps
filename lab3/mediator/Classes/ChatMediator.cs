using mediator.Interfaces;

namespace mediator.Classes;

public class ChatMediator : IChatMediator
{
    private List<IUser> _users;

    public ChatMediator()
    {
        _users = new List<IUser>();
    }

    public void AddUser(IUser user)
    {
        _users.Add(user);
    }

    public void SendMessage(string message, IUser sender, IUser receiver)
    {
        receiver.ReceiveMessage(message, sender);
    }
}
