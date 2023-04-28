using observer.Interfaces;

namespace observer.Entities;

public class User : IFollower
{
    private readonly string _name;
    private readonly List<User> _followers;
    private readonly List<Post> _posts;

    public User(string name)
    {
        _name = name;
        _followers = new List<User>();
        _posts = new List<Post>();
    }

    public string Name => _name;

    public void AddFollower(User follower)
    {
        _followers.Add(follower);
    }

    public void RemoveFollower(User follower)
    {
        _followers.Remove(follower);
    }

    public void Post(string content)
    {
        var post = new Post(this, content);
        _posts.Add(post);
        NotifyFollowers(post);
    }

    public void NotifyFollowers(Post post)
    {
        foreach (var follower in _followers)
        {
            follower.Update(post);
        }
    }

    public void Update(Post post)
    {
        Console.WriteLine($"{_name} received notification of new post from {post.User.Name}: {post.Content}");
    }
}
