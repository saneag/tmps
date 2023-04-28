namespace command.Entities;

public class Post
{
    public int Id { get; private set; }
    public string Content { get; set; }
    public bool IsPublished { get; set; }

    public Post(int id, string content)
    {
        Id = id;
        Content = content;
        IsPublished = false;
    }
}