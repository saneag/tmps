using decorator.Interfaces;

namespace decorator.Decorators.Decorators
{
    public class Philadelphia : PizzaDecorator
    {
        public Philadelphia(IPizza pizza) : base(pizza) { }
        
        
        public override string GetDescription()
        {
            return base.GetDescription() + ", philadelphia";
        }
        
        
        public override double GetCost()
        {
            return base.GetCost() + 15;
        }
    }
}
