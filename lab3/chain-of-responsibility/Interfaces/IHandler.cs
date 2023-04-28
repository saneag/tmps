namespace chain_of_responsibility.Interfaces;

public interface IHandler
{
    IHandler SetNextHandler(IHandler nextHandler);
    bool Authorize(Request request);
}