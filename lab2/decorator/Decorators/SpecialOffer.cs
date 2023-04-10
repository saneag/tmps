using decorator.Interfaces;

namespace decorator.Decorators
{
    public class SpecialOffer : PizzaDecorator
    {
        public int DiscountPercentage { get; set; }

        public SpecialOffer(IPizza pizza, int discountPercentage) : base(pizza)
        {
            DiscountPercentage = discountPercentage;
        }

        public override double GetCost()
        {
            return base.GetCost() - (base.GetCost() * DiscountPercentage / 100);
        }
    }
}
