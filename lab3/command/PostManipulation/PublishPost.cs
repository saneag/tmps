using command.Interfaces;

namespace command.PostManipulation;

public class PublishPostCommand : ICommand
{
    private readonly SocialMediaApp _app;
    private int _postId;
    
    public PublishPostCommand(SocialMediaApp app, int postId)
    {
        _app = app;
        _postId = postId;
    }
    
    public void Execute()
    {
        _app.PublishPost(_postId);
    }

    public void Undo()
    {
        _app.UnpublishPost(_postId);
    }

    public void Redo()
    {
        _app.PublishPost(_postId);
    }
}