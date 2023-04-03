namespace prototype.Institutions;

public class University : Institution
{
    private int _numberOfLaboratories;
    
    public University(string type, string name, string directorName, int numberOfLaboratories) : base(type, name, directorName)
    {
        _numberOfLaboratories = numberOfLaboratories;
    }

    public int NumberOfLaboratories
    {
        get => _numberOfLaboratories;
        set => _numberOfLaboratories = value;
    }
    
    public override void DisplayInfo()
    {
        Console.WriteLine($"Institution type: {Type}\n Name: {Name}\n Director: {DirectorName}\n Number of laboratories: {NumberOfLaboratories}");
    }

    public override Institution Clone()
    {
        return new University(Type, Name, DirectorName, NumberOfLaboratories);
    }
}