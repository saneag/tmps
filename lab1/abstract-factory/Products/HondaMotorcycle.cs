using abstract_factory.Factories;

namespace abstract_factory.Products;

public class HondaMotorcycle : Motorcycle
{
    public HondaMotorcycle(string name, int engineCapacity, string type)
    {
        Name = name;
        EngineCapacity = engineCapacity;
        Type = type;
    }
}