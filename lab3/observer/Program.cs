using observer.Entities;

namespace observer;

class Program
{
    static void Main(string[] args)
    {
        var app = new SocialMediaApp();

        var alice = new User("Alice");
        var bob = new User("Bob");
        var charlie = new User("Charlie");

        app.AddUser(alice);
        app.AddUser(bob);
        app.AddUser(charlie);

        app.Follow(bob, alice);
        app.Follow(charlie, alice);

        app.Post(alice, "Hello, world!");
        app.Post(bob, "Just had a great lunch!");
        app.Post(charlie, "Working on a new project!");

        Console.ReadKey();
    }
}