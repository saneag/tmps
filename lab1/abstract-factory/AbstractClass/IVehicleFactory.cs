namespace abstract_factory.Factories;

public interface IVehicleFactory
{
    Car CreateCar(string name, int engineCapacity, string type);
    Motorcycle CreateMotorcycle(string name, int engineCapacity, string type);
}