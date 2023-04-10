using decorator.Interfaces;

namespace decorator.Decorators.Decorators
{
    public class Salsiccia : PizzaDecorator
    {
        public Salsiccia(IPizza pizza) : base(pizza) { }

        public override string GetDescription()
        {
            return base.GetDescription() + ", salsiccia";
        }

        public override double GetCost()
        {
            return base.GetCost() + 15;
        }
    }
}
