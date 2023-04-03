using abstract_factory.Factories;

namespace abstract_factory.Products;

public class BMWMotorcycle : Motorcycle
{
    public BMWMotorcycle(string name, int engineCapacity, string type)
    {
        Name = name;
        EngineCapacity = engineCapacity;
        Type = type;
    }
}