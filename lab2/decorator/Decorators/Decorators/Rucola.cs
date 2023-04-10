using decorator.Interfaces;

namespace decorator.Decorators.Decorators
{
    public class Rucola : PizzaDecorator
    {
        public Rucola(IPizza pizza) : base(pizza) { }
        
        public override string GetDescription()
        {
            return base.GetDescription() + ", rucola";
        }
        
        
        public override double GetCost()
        {
            return base.GetCost() + 8;
        }
    }
}
