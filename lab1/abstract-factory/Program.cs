using abstract_factory.Factories;

namespace abstract_factory
{
    class Program
    {
        static void Main(string[] args)
        {
            int _numberOfAsterisks = 40;

            IVehicleFactory honda = new HondaFactory();
            IVehicleFactory bmw = new BMWFactory();

            VehicleClient hondaClient = new VehicleClient();
            VehicleClient bmwClient = new VehicleClient();
            
            hondaClient.CreateCar(honda, "Honda Civic", 2000, "Sedan");
            hondaClient.CreateMotorcycle(honda, "Honda CBR1000RR", 1000, "Sport");
            
            bmwClient.CreateCar(bmw, "BMW X5", 3000, "SUV");
            bmwClient.CreateMotorcycle(bmw, "BMW S1000RR", 1000, "Sport");

            for (int i = 0; i < _numberOfAsterisks; i++)
            {
                Console.Write("*");
            }

            Console.WriteLine($"\nHonda car: {hondaClient.GetCarName()}");
            Console.WriteLine($"Honda car engine capacity: {hondaClient.GetCarEngineCapacity()}");
            Console.WriteLine($"Honda car type: {hondaClient.GetCarType()}\n");
            
            Console.WriteLine($"Honda motorcycle: {hondaClient.GetMotorcycleName()}");
            Console.WriteLine($"Honda motorcycle engine capacity: {hondaClient.GetMotorcycleEngineCapacity()}");
            Console.WriteLine($"Honda motorcycle type: {hondaClient.GetMotorcycleType()}");

            for (int i = 0; i < _numberOfAsterisks; i++)
            {
                Console.Write("*");
            }

            Console.WriteLine($"\nBMW car: {bmwClient.GetCarName()}");
            Console.WriteLine($"BMW car engine capacity: {bmwClient.GetCarEngineCapacity()}");
            Console.WriteLine($"BMW car type: {bmwClient.GetCarType()}\n");
            
            Console.WriteLine($"BMW motorcycle: {bmwClient.GetMotorcycleName()}");
            Console.WriteLine($"BMW motorcycle engine capacity: {bmwClient.GetMotorcycleEngineCapacity()}");
            Console.WriteLine($"BMW motorcycle type: {bmwClient.GetMotorcycleType()}");

            for (int i = 0; i < _numberOfAsterisks; i++)
            {
                Console.Write("*");
            }
        }
    }
}