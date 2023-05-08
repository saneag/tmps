using SOLID.Interfaces;

namespace SOLID.Post;

public class PostImage : Post, IPostImage
{
    private readonly string _image;
    
    public PostImage(string author, string text, string title, string image) : base(author, text, title)
    {
        _image = image;
    }

    public string GetImage()
    {
        return _image;
    }
}