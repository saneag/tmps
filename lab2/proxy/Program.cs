namespace proxy;

class Program
{
    static void Main(string[] args)
    {
        Client client = new Client();

        client.PrintFiles("user1");
        client.PrintFile("user1", "public.txt");
        client.PrintFile("user1", "private.txt");

        client.PrintFiles("admin");
        client.PrintFile("admin", "public.txt");
        client.PrintFile("admin", "private.txt");
        client.PrintFile("admin", "secret.txt");

        Console.ReadKey();
    }
}