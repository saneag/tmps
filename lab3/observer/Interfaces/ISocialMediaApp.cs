using observer.Entities;

namespace observer.Interfaces;

public interface ISocialMediaApp
{
    void AddUser(User user);
    void RemoveUser(User user);
    void Follow(User follower, User followee);
    void Unfollow(User follower, User followee);
    void Post(User user, string content);
}