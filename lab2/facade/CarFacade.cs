using facade.CarSystems;

namespace facade.CarFacade;

class CarFacade
{
    private Engine engine;
    private AirConditioner ac;
    private FuelPump fuelPump;

    public CarFacade()
    {
        engine = new Engine();
        ac = new AirConditioner();
        fuelPump = new FuelPump();
    }

    public void StartCar()
    {
        fuelPump.Pump();
        engine.Start();
        ac.TurnOn();
    }

    public void StopCar()
    {
        ac.TurnOff();
        engine.Stop();
        fuelPump.StopPumping();
    }
}