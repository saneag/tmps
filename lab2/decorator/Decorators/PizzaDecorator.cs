using decorator.Interfaces;

namespace decorator.Decorators
{
    public abstract class PizzaDecorator : IPizza
    {
        private IPizza _pizza;

        public PizzaDecorator(IPizza pizza)
        {
            _pizza = pizza;
        }

        public virtual string GetDescription()
        {
            return _pizza.GetDescription();
        }

        public virtual double GetCost()
        {
            return _pizza.GetCost();
        }

        public virtual string GetName()
        {
            return _pizza.GetName();
        }
    }
}
