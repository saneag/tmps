namespace command.Interfaces;

public interface ICommand
{
    void Execute();
    void Undo();
    void Redo();
}
