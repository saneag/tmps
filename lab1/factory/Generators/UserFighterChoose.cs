using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace factory.Generators
{
    public static class UserFighterChoose
    {
        public static string FighterChoose()
        {
            for (int i = 0; i < FightersList.fighters.Count; i++)
            {
                Console.WriteLine($"{i + 1} {FightersList.fighters.ElementAt(i).Key}");
            }
            Console.Write("Input your character index: ");

            string characterIndex = Console.ReadLine();
            bool isNumeric = int.TryParse(characterIndex, out int value);

            if (isNumeric)
            {
                return FightersList.fighters.ElementAt(int.Parse(characterIndex) - 1).Key;
            }

            return "";
        }
    }
}
