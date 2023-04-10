using decorator.Interfaces;

namespace decorator.Decorators.Decorators
{
    public class Salami : PizzaDecorator
    {
        public Salami(IPizza pizza) : base(pizza) { }
        
        public override string GetDescription()
        {
            return base.GetDescription() + ", salami";
        }
        
        public override double GetCost()
        {
            return base.GetCost() + 15;
        }
    }
}
