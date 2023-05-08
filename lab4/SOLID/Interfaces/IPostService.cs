namespace SOLID.Interfaces;

public interface IPostService
{
    void CreatePost(string author, string text, string title);
    void CreatePostImage(string author, string text, string title, string image);
    List<IPost> GetPosts();
}