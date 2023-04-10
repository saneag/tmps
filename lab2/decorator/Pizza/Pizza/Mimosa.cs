using decorator.Interfaces;

namespace decorator.Pizza
{
    public class Mimosa : IPizza
    {
        public double GetCost()
        {
            return 105;
        }

        public string GetDescription()
        {
            return "Mozzarella, jambon, sos de frișcă, porumb";
        }

        public string GetName()
        {
            return "Mimosa";
        }
    }
}
