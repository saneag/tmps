using adapter.Interfaces;
using System.Data;

namespace adapter.Adapters
{
    public class SQLServerAdapter : IDatabaseAdapter
    {
        private DataTable results;

        public void Connect(string connectionString)
        {
            Console.WriteLine($"Your are connected using {connectionString}");
        }

        public void ExecuteQuery(string query)
        {
            results = new DataTable();
            results.Columns.Add("ID", typeof(int));
            results.Columns.Add("Name", typeof(string));
            results.Rows.Add(1, "Irina");
            results.Rows.Add(2, "Victor");
            results.Rows.Add(3, "Andrei");
        }

        public DataTable GetResults()
        {
            return results;
        }
    }

}
