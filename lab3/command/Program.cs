using command;
using command.Interfaces;
using command.PostManipulation;

class Program
{
    static void Main(string[] args)
    {
        SocialMediaApp app = new SocialMediaApp();

        List<ICommand> commands = new List<ICommand>();

        ICommand createPostCommand = new CreatePostCommand(app, "Hello World!");
        commands.Add(createPostCommand);

        ICommand editPostCommand = new EditPostCommand(app, 1, "Hello World! I'm a new post!");
        commands.Add(editPostCommand);

        ICommand publishPostCommand = new PublishPostCommand(app, 1);
        commands.Add(publishPostCommand);

        ICommand deletePostCommand = new DeletePostCommand(app, 1);
        commands.Add(deletePostCommand);

        foreach (ICommand command in commands)
        {
            command.Execute();
        }

        commands.Last().Undo();

        Console.WriteLine(app.GetPostContent(1));

        Console.ReadKey();
    }
}