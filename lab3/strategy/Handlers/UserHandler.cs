using System.Text.RegularExpressions;
using strategy.Entities;
using strategy.Interfaces;

namespace strategy.Handlers;

public class UserHandler : IContentHandler
{
    private string _username { get; set; }
    private string _password { get; set; }
    private static User user { get; set; }

    public bool Validate(string username, string password)
    {
        Regex usernameValidator = new Regex("^[a-zA-Z0-9]+$");
        
        if (username.Length < 3)
        {
            Console.WriteLine("Username must be at least 3 characters long");
            return false;
        }
        
        if (username.Length > 20)
        {
            Console.WriteLine("Username must be less than 20 characters long");
            return false;
        }
        
        if (username.Contains(" "))
        {
            Console.WriteLine("Username cannot contain spaces");
            return false;
        }

        if (!usernameValidator.IsMatch(username))
        {
            Console.WriteLine("Username can only contain letters and numbers");
            return false;
        }
        
        if (password.Length < 6)
        {
            Console.WriteLine("Password must be at least 6 characters long");
            return false;
        }
        
        if(password.Length > 20)
        {
            Console.WriteLine("Password must be less than 20 characters long");
            return false;
        }
        
        if (password.Contains(" "))
        {
            Console.WriteLine("Password cannot contain spaces");
            return false;
        }
        
        _username = username;
        _password = password;
        return true;
    }

    public void Process()
    {
        int dotCount = 3;
        Console.Write("Username and password are valid. Saving");
        for (int i = 0; i < dotCount; i++)
        {
            Console.Write(".");
            Thread.Sleep(1000);
        }
        Console.Write("\r");

        if(dotCount == 3)
        {
            Console.Write("\r" + new string(' ', Console.WindowWidth) + "\r");
        }
    }

    public void Save()
    {
        user = new User
        {
            username = _username,
            password = _password
        };
        
        Console.WriteLine("User saved successfully");
    }

    public void ShowContent()
    {
        Console.WriteLine("Username: " + user.username);
        Console.WriteLine("Password: " + user.password);
    }
}