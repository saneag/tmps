using chain_of_responsibility.Abstract_Class;

namespace chain_of_responsibility.AuthorizationLevels;

public class EmailConfirmation : AuthorizationHandler
{
    public int numberOfAttempts = 4;

    public override bool Authorize(Request request)
    {
        if (request.Email == "garstea2002@mail.ru")
        {
            request.IsEmailConfirmed = true;
            return true;
        }

        numberOfAttempts--;
        Console.WriteLine("Email is incorrect!");
        Console.WriteLine($"You have {numberOfAttempts} attempt{(numberOfAttempts > 1 ? "s" : "")} left");
        
        if(numberOfAttempts == 0)
        {
            Console.WriteLine("Your account is blocked!");
            return false;
        }
        
        return false;
    }
}