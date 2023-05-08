using SOLID.Interfaces;

namespace SOLID.Post;

public class Post : IPost
{
    private readonly string _author;
    private readonly string _text;
    private readonly string _title;

    public Post(string author, string text, string title)
    {
        _author = author;
        _text = text;
        _title = title;
    }

    public string GetAuthor()
    {
        return _author;
    }

    public string GetTitle()
    {
        return _title;
    }

    public string GetText()
    {
        return _text;
    }
}