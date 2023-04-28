using command.Interfaces;

namespace command.PostManipulation;

public class DeletePostCommand : ICommand
{
    private readonly SocialMediaApp _app;
    private int _postId;
    private string _deletedContent;
    
    public DeletePostCommand(SocialMediaApp app, int postId)
    {
        _app = app;
        _postId = postId;
    }
    
    public void Execute()
    {
        _deletedContent = _app.GetPostContent(_postId);
        _app.DeletePost(_postId);
    }

    public void Undo()
    {
        _postId = _app.CreatePost(_deletedContent);
    }

    public void Redo()
    {
        _app.DeletePost(_postId);
    }
}
