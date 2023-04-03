using abstract_factory.Products;

namespace abstract_factory.Factories;

public class BMWFactory : IVehicleFactory
{
    public Car CreateCar(string name, int engineCapacity, string type)
    {
        return new BMWCar(name, engineCapacity, type);
    }

    public Motorcycle CreateMotorcycle(string name, int engineCapacity, string type)
    {
        return new BMWMotorcycle(name, engineCapacity, type);
    }
}