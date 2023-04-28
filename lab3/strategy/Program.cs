using strategy.Handlers;

class Program
{
    private static void Main(string[] args)
    {
        var userHandler = new Content(ContentType.User);
        userHandler.Handle("username", "password");

        userHandler.ShowContent();
        
        var postHandler = new Content(ContentType.Post);
        postHandler.Handle("What is Lorem ipsum?",
            "Lorem Ipsum is simply dummy text of the " +
            "printing and typesetting industry. Lorem Ipsum " +
            "has been the industry's standard dummy text ever " +
            "since the 1500s, when an unknown printer took a " +
            "galley of type and scrambled it to make a type " +
            "specimen book.");
        
        postHandler.ShowContent();

        Console.ReadKey();
    }
}