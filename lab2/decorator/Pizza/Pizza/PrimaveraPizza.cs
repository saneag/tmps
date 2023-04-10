using decorator.Interfaces;

namespace decorator.Pizza
{
    public class PrimaveraPizza : IPizza
    {
        public string GetName()
        {
            return "Primavera";
        }

        public string GetDescription()
        {
            return "Sos de rosii,mozzarella “Fior di Latte”, ricotta, " +
                "rosii cherry, prosciutto crudo, valeriana, " +
                "cremă de otet balsamic";
        }

        public double GetCost()
        {
            return 150;
        }
    }
}
