using facade.CarFacade;

class Program
{
    static void Main(string[] args)
    {
        CarFacade carFacade = new CarFacade();
        carFacade.StartCar();
        carFacade.StopCar();

        Console.ReadKey();
    }
}