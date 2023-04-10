using decorator.Interfaces;

namespace decorator.Pizza
{
    public class Atomica : IPizza
    {
        public string GetDescription()
        {
            return "Atomica";
        }

        public string GetName()
        {
            return "Sos de roșii, mozarella, becon (cubulețe), " +
                "jambon, salsiccia";
        }

        public double GetCost()
        {
            return 20.0;
        }
    }
}
