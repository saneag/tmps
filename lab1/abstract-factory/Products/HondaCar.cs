using abstract_factory.Factories;

namespace abstract_factory.Products;

public class HondaCar : Car
{
    public HondaCar(string name, int engineCapacity, string type)
    {
        Name = name;
        EngineCapacity = engineCapacity;
        Type = type;
    }
}