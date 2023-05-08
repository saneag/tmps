namespace SOLID.Interfaces;

public interface IPostRepository
{
    void AddPost(IPost post);
    List<IPost> GetPosts();
}