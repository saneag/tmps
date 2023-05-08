using SOLID.Interfaces;

namespace SOLID.Post;

public class PostRepository : IPostRepository
{
    private readonly List<IPost> _posts = new List<IPost>();
    
    public void AddPost(IPost post)
    {
        _posts.Add(post);
    }

    public List<IPost> GetPosts()
    {
        return _posts;
    }
}