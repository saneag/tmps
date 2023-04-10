using System.Data;

namespace adapter.Interfaces
{
    public interface IDatabaseAdapter
    {
        void Connect(string connectionString);
        void ExecuteQuery(string query);
        DataTable GetResults();
    }
}
