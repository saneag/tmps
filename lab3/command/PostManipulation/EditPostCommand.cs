using command.Interfaces;

namespace command.PostManipulation;

public class EditPostCommand : ICommand
{
    private readonly SocialMediaApp _app;
    private int _postId;
    private string _oldPostContent;
    private string _newPostContent;

    public EditPostCommand(SocialMediaApp app, int postId, string newPostContent)
    {
        _app = app;
        _postId = postId;
        _newPostContent = newPostContent;
    }
    
    public void Execute()
    {
        _oldPostContent = _app.GetPostContent(_postId);
        _app.EditPost(_postId, _newPostContent);
    }

    public void Undo()
    {
        _app.EditPost(_postId, _oldPostContent);
    }

    public void Redo()
    {
        _app.EditPost(_postId, _newPostContent);
    }
}