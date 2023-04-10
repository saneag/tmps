using decorator.Interfaces;

namespace decorator.Pizza
{
    public class Capricioasa : IPizza
    {
        public double GetCost()
        {
            return 112;
        }

        public string GetDescription()
        {
            return "os de roșii, mozarella, jambon, salam, ciuperci, măsline";
        }

        public string GetName()
        {
            return "Capricioasa";
        }
    }
}
