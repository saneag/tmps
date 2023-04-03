using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace factory.Fighters
{
    public class DisplayMessage
    {
        public static void Attack(string name)
        {
            Console.WriteLine("{0} is attacking!", name);
        }

        public static void SuperAttack(string name)
        {
            Console.WriteLine("{0} is using super attack!", name);
        }
    }
}
