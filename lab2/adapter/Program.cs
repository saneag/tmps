using adapter.Adapters;
using System.Data;

namespace adapter
{
    public class Program
    {
        public static void Main(string[] args)
        {
            MySqlAdapter mySqlAdapter = new MySqlAdapter();
            mySqlAdapter.Connect("aaabbbccc");
            mySqlAdapter.ExecuteQuery("SELECT * FROM table");
            DataTable results = mySqlAdapter.GetResults();
            foreach (DataRow row in results.Rows)
            {
                Console.WriteLine(row["ID"] + " " + row["Name"]);
            }

            SQLServerAdapter sqlServerAdapter = new SQLServerAdapter();
            sqlServerAdapter.Connect("123123123");
            sqlServerAdapter.ExecuteQuery("SELECT * FROM table");
            results = sqlServerAdapter.GetResults();
            foreach (DataRow row in results.Rows)
            {
                Console.WriteLine(row["ID"] + " " + row["Name"]);
            }
            
            Console.ReadKey();
        }
    }
}