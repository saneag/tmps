using decorator.Interfaces;

namespace decorator.Pizza
{
    public class Romana : IPizza
    {
        public double GetCost()
        {
            return 110;
        }

        public string GetDescription()
        {
            return "Sos de roșii, mozarella, " +
                "salsiccia, spanac, " +
                "masline kalamata (cu sâmbure), usturoi";
        }

        public string GetName()
        {
            return "Romana";
        }
    }
}
