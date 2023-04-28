namespace mediator.Interfaces;

public interface IUser
{
    void SendMessage(string message, IUser receiver);
    void ReceiveMessage(string message, IUser sender);
    string GetName();
}