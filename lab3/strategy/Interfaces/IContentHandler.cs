namespace strategy.Interfaces;

public interface IContentHandler
{
    bool Validate(string input, string input2);
    void Process();
    void Save();
    void ShowContent();
}