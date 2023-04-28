using command.Entities;

namespace command;

public class SocialMediaApp
{
    private Dictionary<int, Post> _posts = new Dictionary<int, Post>();

    public int CreatePost(string content)
    {
        int id = GetNextPostId();
        Post post = new Post(id, content);
        _posts.Add(id, post);
        Console.WriteLine($"Created post with ID {id}");
        return id;
    }

    public void EditPost(int id, string content)
    {
        Post post = _posts[id];
        post.Content = content;
        Console.WriteLine($"Edited post with ID {id}");
    }

    public void DeletePost(int id)
    {
        _posts.Remove(id);
        Console.WriteLine($"Deleted post with ID {id}");
    }

    public void PublishPost(int id)
    {
        Post post = _posts[id];
        post.IsPublished = true;
        Console.WriteLine($"Published post with ID {id}");
    }

    public void UnpublishPost(int id)
    {
        Post post = _posts[id];
        post.IsPublished = false;
        Console.WriteLine($"Unpublished post with ID {id}");
    }

    public string GetPostContent(int postId)
    {
        Post post = _posts[postId];
        return post.Content;
    }

    private int GetNextPostId()
    {
        if (_posts.Count == 0)
        {
            return 1;
        }

        return _posts.Keys.Max() + 1;
    }
}