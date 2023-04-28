using observer.Entities;

namespace observer.Interfaces;

public interface IFollower
{
    void AddFollower(User follower);
    void RemoveFollower(User follower);
    void NotifyFollowers(Post post);
    void Update(Post post);
}