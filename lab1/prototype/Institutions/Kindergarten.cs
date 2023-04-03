namespace prototype.Institutions;

public class Kindergarten : Institution
{
    private int _ageGroup;

    public Kindergarten(string type, string name, string directorName, int ageGroup) : base(type, name, directorName)
    {
        _ageGroup = ageGroup;
    }

    public int AgeGroup
    {
        get => _ageGroup;
        set => _ageGroup = value;
    }

    public override void DisplayInfo()
    {
        Console.WriteLine(
            $"Institution type: {Type}\n Name: {Name}\n Director: {DirectorName}\n Age group: {AgeGroup}");
    }

    public override Institution Clone()
    {
        return new Kindergarten(Type, Name, DirectorName, AgeGroup);
    }
}