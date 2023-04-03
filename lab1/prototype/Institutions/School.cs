namespace prototype.Institutions;

public class School : Institution
{
    private int _numberOfStudents;

    public School(string type, string name, string directorName, int numberOfStudents) : base(type, name, directorName)
    {
        _numberOfStudents = numberOfStudents;
    }
    
    public int NumberOfStudents
    {
        get => _numberOfStudents;
        set => _numberOfStudents = value;
    }

    public override void DisplayInfo()
    {
        Console.WriteLine($"Institution type: {Type}\n Name: {Name}\n Director: {DirectorName}\n Number of students: {NumberOfStudents}");
    }

    public override Institution Clone()
    {
        return new School(Type, Name, DirectorName, NumberOfStudents);
    }
}