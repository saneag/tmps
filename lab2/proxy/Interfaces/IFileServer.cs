namespace proxy.Interfaces
{
    public interface IFileServer
    {
        string[] GetFiles(string username);
        byte[] GetFile(string username, string fileName);
    }
}
