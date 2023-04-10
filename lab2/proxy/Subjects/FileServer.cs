using System.Text;
using proxy.Interfaces;

namespace proxy.Subjects;

public class FileServer : IFileServer
{
    private Dictionary<string, byte[]> files = new Dictionary<string, byte[]>();

    public FileServer()
    {
        files.Add("public.txt", Encoding.ASCII.GetBytes("This is a public file."));
        files.Add("private.txt", Encoding.ASCII.GetBytes("This is a private file."));
        files.Add("secret.txt", Encoding.ASCII.GetBytes("This is a top secret file."));
    }

    public string[] GetFiles(string username)
    {
        if (username == "admin")
        {
            return files.Keys.ToArray();
        }
        else
        {
            return files.Keys.Where(k => !k.Contains("secret")).ToArray();
        }
    }

    public byte[] GetFile(string username, string fileName)
    {
        if (username == "admin" || !fileName.Contains("secret"))
        {
            if (files.ContainsKey(fileName))
            {
                return files[fileName];
            }
        }
        throw new UnauthorizedAccessException("You do not have permission to access this file.");
    }
}