using decorator.Interfaces;

namespace decorator.Pizza
{
    public class QuadroStagioni : IPizza
    {
        public string GetName()
        {
            return "4 Stagioni";
        }

        public string GetDescription()
        {
            return "Sos de rosii, mozarella, jambon, carne " +
                "tocata (salsiccia), ciuperci, masline";
        }

        public double GetCost()
        {
            return 112;
        }
    }
}
