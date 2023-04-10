using decorator.Interfaces;

namespace decorator.Pizza
{
    public class Sentiero : IPizza
    {
        public double GetCost()
        {
            return 135;
        }

        public string GetDescription()
        {
            return "Mozzarella, philadelphia, ciuperci, salsiccia " +
                "(carne tocată), pancetta (becon), ulei cu usturoi";
        }

        public string GetName()
        {
            return "Sentiero";
        }
    }
}
