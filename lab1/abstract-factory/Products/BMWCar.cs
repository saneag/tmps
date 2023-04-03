using abstract_factory.Factories;

namespace abstract_factory.Products;

public class BMWCar : Car
{
    public BMWCar(string name, int engineCapacity, string type)
    {
        Name = name;
        EngineCapacity = engineCapacity;
        Type = type;
    }
}