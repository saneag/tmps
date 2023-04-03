using abstract_factory.Factories;

namespace abstract_factory;

public class VehicleClient
{
    private Car _car;
    private Motorcycle _motorcycle;

    public void CreateCar(IVehicleFactory factory, string name, int engineCapacity, string type)
    {
        _car = factory.CreateCar(name, engineCapacity, type);
    }
    
    public void CreateMotorcycle(IVehicleFactory factory, string name, int engineCapacity, string type)
    {
        _motorcycle = factory.CreateMotorcycle(name, engineCapacity, type);
    }

    public string GetCarName()
    {
        return _car.Name;
    }

    public int GetCarEngineCapacity()
    {
        return _car.EngineCapacity;
    }

    public string GetCarType()
    {
        return _car.Type;
    }

    public string GetMotorcycleName()
    {
        return _motorcycle.Name;
    }

    public int GetMotorcycleEngineCapacity()
    {
        return _motorcycle.EngineCapacity;
    }

    public string GetMotorcycleType()
    {
        return _motorcycle.Type;
    }
}