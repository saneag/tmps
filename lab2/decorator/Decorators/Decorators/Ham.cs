using decorator.Interfaces;

namespace decorator.Decorators.Decorators
{
    public class Ham : PizzaDecorator
    {
        public Ham(IPizza pizza) : base(pizza) { }
        
        public override string GetDescription()
        {
            return base.GetDescription() + ", ham";
        }

        public override double GetCost()
        {
            return base.GetCost() + 15;
        }
    }
}
