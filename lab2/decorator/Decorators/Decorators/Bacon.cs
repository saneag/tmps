using decorator.Interfaces;

namespace decorator.Decorators.Decorators
{
    public class Bacon : PizzaDecorator
    {
        public Bacon(IPizza pizza) : base(pizza) { }
        
        public override string GetDescription()
        {
            return base.GetDescription() + ", bacon";
        }
        
        public override double GetCost()
        {
            return base.GetCost() + 15;
        }
    }
}
