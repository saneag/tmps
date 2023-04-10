using decorator.Interfaces;

namespace decorator.Pizza
{
    public class Diavola : IPizza
    {
        public double GetCost()
        {
            return 110;
        }

        public string GetDescription()
        {
            return "Sos de roșii, mozarella, salam picant, măsline";
        }

        public string GetName()
        {
            return "Diavola";
        }
    }
}
