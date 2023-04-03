using abstract_factory.Products;

namespace abstract_factory.Factories;

public class HondaFactory : IVehicleFactory
{
    public Car CreateCar(string name, int engineCapacity, string type)
    {
        return new HondaCar(name, engineCapacity, type);
    }

    public Motorcycle CreateMotorcycle(string name, int engineCapacity, string type)
    {
        return new HondaMotorcycle(name, engineCapacity, type);
    }
}