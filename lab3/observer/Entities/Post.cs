using observer.Interfaces;

namespace observer.Entities;

public class Post
{
    private readonly User _user;
    private readonly string _content;

    public Post(User user, string content)
    {
        _user = user;
        _content = content;
    }

    public User User => _user;

    public string Content => _content;
}