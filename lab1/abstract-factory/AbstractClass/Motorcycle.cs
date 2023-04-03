namespace abstract_factory.Factories;

public abstract class Motorcycle
{
    public string Name { get; set; } = default!;
    public int EngineCapacity { get; set; } = default!;
    public string Type { get; set; } = default!;
}