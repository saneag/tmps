using decorator.Decorators.Decorators;
using decorator.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace decorator.Decorators
{
    public class PizzaDecoratorSelector
    {
        public static IPizza SelectDecorator(string decoratorType, IPizza pizza)
        {
            switch (decoratorType)
            {
                case "1":
                    pizza = new Bacon(pizza);
                    break;
                case "2":
                    pizza = new Ham(pizza);
                    break;
                case "3":
                    pizza = new Mozzarela(pizza);
                    break;
                case "4":
                    pizza = new Philadelphia(pizza);
                    break;
                case "5":
                    pizza = new Rucola(pizza);
                    break;
                case "6":
                    pizza = new Salami(pizza);
                    break;
                case "7":
                    pizza = new Salsiccia(pizza);
                    break;
                default:
                    Console.WriteLine("Nu exista asa ingrediente");
                    break;
            }
            return pizza;
        }
    }
}
