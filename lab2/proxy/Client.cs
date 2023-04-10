using System.Text;
using proxy.Interfaces;
using proxy.Subjects;

namespace proxy;

public class Client
{
    private IFileServer fileServer;

    public Client()
    {
        fileServer = new FileServerProxy();
    }

    public void PrintFiles(string username)
    {
        Console.WriteLine($"Files accessible by {username}:");
        foreach (string file in fileServer.GetFiles(username))
        {
            Console.WriteLine($"- {file}");
        }
    }

    public void PrintFile(string username, string fileName)
    {
        try
        {
            byte[] fileContents = fileServer.GetFile(username, fileName);
            Console.WriteLine($"Contents of file {fileName}:");
            Console.WriteLine(Encoding.ASCII.GetString(fileContents));
        }
        catch (UnauthorizedAccessException ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}