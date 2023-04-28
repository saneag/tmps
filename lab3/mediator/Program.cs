using mediator.Classes;

namespace mediator;

class Program
{
    private static void Main(string[] args)
    {
        var mediator = new ChatMediator();
        var user1 = new User(mediator, "Alice");
        var user2 = new User(mediator, "Bob");

        user1.SendMessage("Hello, Bob!", user2);
        user2.SendMessage("Hi, Alice!", user1);

        Console.ReadKey();
    }
}