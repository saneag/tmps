using decorator.Decorators;
using decorator.Interfaces;
using decorator.Pizza;
using System.Text;

public class Program
{
    public static void Main(string[] args)
    {
        Console.WriteLine("Toate pizzele au o greutate intre 450 si 550 gr. " +
                          "in dependenta de ingrediente.\n");

        ShowPizzaMenu();

        IPizza pizza = SelectPizza();

        ShowInfoAboutPizza(pizza);

        pizza = AddDecoratos(pizza);

        pizza = ApplyPromocode(pizza);
        ShowFinalInfoAboutPizza(pizza);
        Console.ReadKey();
    }

    private static void ShowPizzaMenu()
    {
        Console.WriteLine("1. Primavera\n" +
                          "2. Sentiero\n" +
                          "3. Romana\n" +
                          "4. Mimosa\n" +
                          "5. Diavola\n" +
                          "6. 4 Stagioni\n" +
                          "7. Capricioasa\n" +
                          "8. Atomica");
    }

    private static void ShowDecoratorMenu()
    {
        Console.WriteLine("1. Bacon\n" +
                          "2. Ham\n" +
                          "3. Mozzarela\n" +
                          "4. Philadelphia\n" +
                          "5. Rucola\n" +
                          "6. Salami\n" +
                          "7. Salsiccia");
    }

    private static IPizza ApplyPromocode(IPizza pizza)
    {
        Console.WriteLine("Doriti sa aplicati un promocod? (y/n)");

        if (Console.ReadKey(true).KeyChar == 'y')
        {
            Console.Write("Introduceti promocodul de reducere: ");
            string promocode = Console.ReadLine();

            switch (promocode)
            {
                case "IWANTTOEAT":
                    pizza = new SpecialOffer(pizza, 20);
                    break;
                case "CASADELLAPIZZA":
                    pizza = new SpecialOffer(pizza, 15);
                    break;
                case "PIZZAISLIFE":
                    pizza = new SpecialOffer(pizza, 10);
                    break;
                default:
                    Console.WriteLine("Nu exista asa promocod");
                    break;
            }
        }
        
        return pizza;
    }

    private static IPizza SelectPizza()
    {
        Console.Write("Introduceti ce fel de pizza doriti sa cumparati sau esc pentru a parasi programul: ");
        string pizzaType = readLineWithCancel();
        return PizzaSelector.SelectPizza(pizzaType);
    }

    private static void ShowInfoAboutPizza(IPizza pizza)
    {
        Console.Clear();
        Console.WriteLine($"Nume: {pizza.GetName()}\n{pizza.GetDescription()}\nPret: {pizza.GetCost()} mdl");
    }

    private static void ShowFinalInfoAboutPizza(IPizza pizza)
    {
        Console.Clear();
        Console.WriteLine(
            $"Nume: {pizza.GetName()}\n{pizza.GetDescription()}\nPretul final spre achitare: {pizza.GetCost()} mdl");
    }

    private static IPizza AddDecoratos(IPizza pizza)
    {
        while (true)
        {
            Console.WriteLine("Doriti sa adaugati ceva in plus la pizza? (y/n)");
            if (Console.ReadKey(true).KeyChar == 'y')
            {
                Console.Clear();
                ShowDecoratorMenu();
                Console.Write(
                    "Introduceti ce fel de ingrediente doriti sa adaugati sau esc pentru a parasi programul: ");

                string decoratorType = readLineWithCancel();
                pizza = PizzaDecoratorSelector.SelectDecorator(decoratorType, pizza);
                ShowInfoAboutPizza(pizza);
            }
            else
            {
                return pizza;
            }
        }
    }

    private static string readLineWithCancel()
    {
        string result = "";

        StringBuilder buffer = new StringBuilder();

        ConsoleKeyInfo info = Console.ReadKey(true);
        while (info.Key != ConsoleKey.Enter && info.Key != ConsoleKey.Escape)
        {
            Console.Write(info.KeyChar);
            buffer.Append(info.KeyChar);
            info = Console.ReadKey(true);
        }

        if (info.Key == ConsoleKey.Enter)
        {
            result = buffer.ToString();
        }

        return result;
    }
}