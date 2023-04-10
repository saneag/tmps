using decorator.Interfaces;

namespace decorator.Decorators.Decorators
{
    public class Mozzarela : PizzaDecorator
    {
        public Mozzarela(IPizza pizza) : base(pizza) { }
        
        public override string GetDescription()
        {
            return base.GetDescription() + ", mozzarela";
        }
        
        public override double GetCost()
        {
            return base.GetCost() + 15;
        }
    }
}
