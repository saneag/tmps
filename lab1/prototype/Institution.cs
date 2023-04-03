namespace prototype;

public abstract class Institution
{
    private string _type;
    private string _name;
    private string _directorName;

    public Institution(string type, string name, string directorName)
    {
        _type = type;
        _name = name;
        _directorName = directorName;
    }

    public string Type
    {
        get => _type;
        set => _type = value;
    }
    
    public string Name
    {
        get => _name;
        set => _name = value;
    }
    
    public string DirectorName
    {
        get => _directorName;
        set => _directorName = value;
    }

    public abstract void DisplayInfo();
    
    public abstract Institution Clone();
}