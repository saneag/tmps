using chain_of_responsibility.AuthorizationLevels;

namespace chain_of_responsibility;

public class Program
{
    public static void Main()
    {
        PasswordConfirmation passwordConfirmation = new PasswordConfirmation();
        EmailConfirmation emailConfirmation = new EmailConfirmation();
        PhoneConfirmation phoneConfirmation = new PhoneConfirmation();

        Request request = new Request();
        while (passwordConfirmation.numberOfAttempts != 0)
        {
            Console.Write("Introduceti parola: ");
            request.Password = Console.ReadLine() ?? "";

            passwordConfirmation.Authorize(request);

            if (request.IsPasswordConfirmed)
            {
                break;
            }

            if (passwordConfirmation.numberOfAttempts == 0)
            {
                return;
            }
        }

        passwordConfirmation.SetNextHandler(emailConfirmation);
        
        while (emailConfirmation.numberOfAttempts != 0)
        {
            Console.Write("Introduceti email-ul: ");
            request.Email = Console.ReadLine() ?? "";

            emailConfirmation.Authorize(request);

            if (request.IsEmailConfirmed)
            {
                break;
            }

            if (emailConfirmation.numberOfAttempts == 0)
            {
                return;
            }
        }

        emailConfirmation.SetNextHandler(phoneConfirmation);
        
        while (phoneConfirmation.numberOfAttempts != 0)
        {
            Console.Write("Introduceti numarul de telefon: ");
            request.PhoneNumber = Console.ReadLine() ?? "";

            phoneConfirmation.Authorize(request);

            if (request.IsPhoneNumberConfirmed)
            {
                break;
            }

            if (phoneConfirmation.numberOfAttempts == 0)
            {
                return;
            }
        }

        if (request is { IsPasswordConfirmed: true, IsEmailConfirmed: true, IsPhoneNumberConfirmed: true })
        {
            Console.WriteLine("Request authorized");
        }
        else
        {
            Console.WriteLine("You are not confirmed!");
        }

        Console.ReadKey();
    }
}