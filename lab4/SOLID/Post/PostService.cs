using SOLID.Interfaces;

namespace SOLID.Post;

public class PostService : IPostService
{
    private readonly IPostRepository _postRepository;

    public PostService(IPostRepository postRepository)
    {
        _postRepository = postRepository;
    }
    
    public void CreatePost(string author, string text, string title)
    {
        IPost post = new Post(author, text, title);
        _postRepository.AddPost(post);
    }

    public void CreatePostImage(string author, string text, string title, string image)
    {
        IPost post = new PostImage(author, text, title, image);
        _postRepository.AddPost(post);
    }

    public List<IPost> GetPosts()
    {
        return _postRepository.GetPosts();
    }
}