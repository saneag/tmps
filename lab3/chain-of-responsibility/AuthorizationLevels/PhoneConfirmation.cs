using chain_of_responsibility.Abstract_Class;

namespace chain_of_responsibility.AuthorizationLevels;

public class PhoneConfirmation : AuthorizationHandler
{
    public int numberOfAttempts = 4;

    public override bool Authorize(Request request)
    {
        if (request.PhoneNumber == "+37360260075")
        {
            request.IsPhoneNumberConfirmed = true;
            return true;
        }

        numberOfAttempts--;
        Console.WriteLine("Phone number is incorrect!");
        Console.WriteLine($"You have {numberOfAttempts} attempt{(numberOfAttempts > 1 ? "s" : "")} left");

        if(numberOfAttempts == 0)
        {
            Console.WriteLine("Your account is blocked!");
            return false;
        }
        
        return false;
    }
}