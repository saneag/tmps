using strategy.Entities;
using strategy.Interfaces;

namespace strategy.Handlers;

public class PostHandler : IContentHandler
{
    private string _title { get; set; }
    private string _body { get; set; }
    private Post _post { get; set; }

    public bool Validate(string title, string body)
    {
        if (title.Length < 3)
        {
            Console.WriteLine("Title must be at least 3 characters long");
            return false;
        }

        if (title.Length > 50)
        {
            Console.WriteLine("Title must be less than 50 characters long");
            return false;
        }

        if (body.Length < 10)
        {
            Console.WriteLine("Body must be at least 10 characters long");
            return false;
        }

        if (body.Length > 500)
        {
            Console.WriteLine("Body must be less than 500 characters long");
            return false;
        }

        _title = title;
        _body = body;

        return true;
    }

    public void Process()
    {
        int dotCount = 3;
        Console.Write("Title and body are valid. Saving");
        for (int i = 0; i < dotCount; i++)
        {
            Console.Write(".");
            Thread.Sleep(1000);
        }

        Console.Write("\r");

        if (dotCount == 3)
        {
            Console.Write("\r" + new string(' ', Console.WindowWidth) + "\r");
        }
    }

    public void Save()
    {
        _post = new Post()
        {
            title = _title,
            body = _body
        };
        
        Console.WriteLine("Post saved successfully");
    }

    public void ShowContent()
    {
        Console.WriteLine("Title: " + _post.title);
        Console.WriteLine("Body: " + _post.body);
    }
}