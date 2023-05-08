using SOLID.Interfaces;
using SOLID.Post;

namespace SOLID;

public class SocialMediaApp
{
    private readonly IPostService _postService;

    public SocialMediaApp()
    {
        IPostRepository postRepository = new PostRepository();
        _postService = new PostService(postRepository);
    }

    public void RunApp()
    {
        while (true)
        {
            Console.WriteLine("1. Create a post");
            Console.WriteLine("2. Create a post with image");
            Console.WriteLine("3. Display all posts");
            Console.WriteLine("4. Exit");

            Console.WriteLine("Enter your choice: ");
            int choice = int.Parse(Console.ReadLine() ?? "");

            switch (choice)
            {
                case 1:
                    PostGenerator(false);
                    Console.WriteLine("Post created successfully");
                    break;
                case 2:
                    PostGenerator(true);
                    Console.WriteLine("Post created successfully");
                    break;
                case 3:
                    Console.WriteLine("All posts: ");
                    foreach (IPost post in _postService.GetPosts())
                    {
                        Console.WriteLine($"Author {post.GetAuthor()}");
                        Console.WriteLine($"Title: {post.GetTitle()}");
                        Console.WriteLine($"Text: {post.GetText()}");
                        
                        if (post is IPostImage)
                        {
                            IPostImage postImage = (PostImage)post;
                            Console.WriteLine($"Image: {postImage.GetImage()}");
                        }

                        Console.WriteLine();
                    }
                    break;
                case 4:
                    Console.WriteLine("Exiting...");
                    return;
                default:
                    Console.WriteLine("Invalid choice");
                    break;
            }

            Console.ReadKey();
        }
    }

    private void PostGenerator(bool isImage)
    {
        Console.Write("Enter your name: ");
        string name = Console.ReadLine() ?? "";
        Console.Write("Enter post title: ");
        string postTitle = Console.ReadLine() ?? "";
        Console.Write("Enter post text: ");
        string postText = Console.ReadLine() ?? "";
        if (isImage)
        {
            Console.Write("Enter post image: ");
            string postImage = Console.ReadLine() ?? "";
            _postService.CreatePostImage(name, postText, postTitle, postImage);
            return;
        }
        
        _postService.CreatePost(name, postText, postTitle);
    }
}