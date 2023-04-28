using strategy.Entities;
using strategy.Interfaces;

namespace strategy.Handlers;

public enum ContentType
{
    User,
    Post
}

public class Content
{
    private ContentType Type { get; set; }
    public string username { get; set; }
    public string password { get; set; }
    public string title { get; set; }
    public string body { get; set; }
    
    private User user { get; set; }
    private Post post { get; set; }
    
    public IEnumerable<string> Options { get; set; }

    private IContentHandler _handler;
    
    public Content(ContentType type)
    {
        Type = type;
        switch (type)
        {
            case ContentType.User:
                _handler = new UserHandler();
                break;
            case ContentType.Post:
                _handler = new PostHandler();
                break;
            default:
                throw new NotSupportedException("Content type not supported");
        }
    }

    public void Handle(string input, string input2)
    {
        if (_handler.Validate(input, input2))
        {
            _handler.Process();
            _handler.Save();
        }
    }

    public void ShowContent()
    {
        _handler.ShowContent();
    }
}