namespace mediator.Interfaces;

public interface IChatMediator
{
    void SendMessage(string message, IUser user, IUser receiver);
    void AddUser(IUser user);
}