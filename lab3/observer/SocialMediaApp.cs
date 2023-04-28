using observer.Entities;
using observer.Interfaces;

public class SocialMediaApp : ISocialMediaApp
{
    private readonly List<User> _users;

    public SocialMediaApp()
    {
        _users = new List<User>();
    }

    public void AddUser(User user)
    {
        _users.Add(user);
    }

    public void RemoveUser(User user)
    {
        _users.Remove(user);
    }

    public void Follow(User follower, User followee)
    {
        followee.AddFollower(follower);
    }

    public void Unfollow(User follower, User followee)
    {
        followee.RemoveFollower(follower);
    }

    public void Post(User user, string content)
    {
        user.Post(content);
    }
}