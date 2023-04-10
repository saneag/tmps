using proxy.Interfaces;

namespace proxy.Subjects;

public class FileServerProxy : IFileServer
{
    private FileServer fileServer;
    private string[] publicFiles;

    public FileServerProxy()
    {
        fileServer = new FileServer();
        publicFiles = fileServer.GetFiles("public");
    }

    public string[] GetFiles(string username)
    {
        if (username == "admin")
        {
            return fileServer.GetFiles(username);
        }
        else
        {
            return publicFiles;
        }
    }

    public byte[] GetFile(string username, string fileName)
    {
        if (username == "admin" || publicFiles.Contains(fileName))
        {
            return fileServer.GetFile(username, fileName);
        }
        throw new UnauthorizedAccessException("You do not have permission to access this file.");
    }
}