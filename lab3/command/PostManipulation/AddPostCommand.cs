
using command.Interfaces;

namespace command.PostManipulation;

public class CreatePostCommand : ICommand
{
    private readonly SocialMediaApp _app;
    private int _postId;
    private readonly string _postContent;
    
    public CreatePostCommand(SocialMediaApp app, string postContent)
    {
        _app = app;
        _postContent = postContent;
    }
    
    public void Execute()
    {
        _postId = _app.CreatePost(_postContent);
    }

    public void Undo()
    {
        _app.DeletePost(_postId);
    }

    public void Redo()
    {
        _postId = _app.CreatePost(_postContent);
    }
}
