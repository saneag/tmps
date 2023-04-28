using chain_of_responsibility.Interfaces;

namespace chain_of_responsibility.Abstract_Class;

public abstract class AuthorizationHandler : IHandler
{
    protected IHandler _nextHandler;
    
    public IHandler SetNextHandler(IHandler nextHandler)
    {
        _nextHandler = nextHandler;
        return nextHandler;
    }

    public abstract bool Authorize(Request request);
}