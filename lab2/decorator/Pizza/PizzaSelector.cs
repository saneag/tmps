using decorator.Interfaces;

namespace decorator.Pizza
{
    public static class PizzaSelector
    {
        public static IPizza SelectPizza(string pizzaType)
        {
            IPizza pizza = null;
            switch (pizzaType)
            {
                case "1":
                    pizza = new PrimaveraPizza();
                    break;
                case "2":
                    pizza = new Sentiero();
                    break;
                case "3":
                    pizza = new Romana();
                    break;
                case "4":
                    pizza = new Mimosa();
                    break;
                case "5":
                    pizza = new Diavola();
                    break;
                case "6":
                    pizza = new QuadroStagioni();
                    break;
                case "7":
                    pizza = new Capricioasa();
                    break;
                case "8":
                    pizza = new Atomica();
                    break;
                default:
                    Console.WriteLine("There is no such pizza in menu!");
                    break;
            }
            return pizza;
        }
    }
}
