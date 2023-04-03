using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace factory.Generators
{
    public class GenerateCombination
    {
        public static string attackCombination;
        public static string superAttackCombination;

        private static Random random;

        const string chars = "qwerasd";

        private static string GetRandomString(int length)
        {
            return new string(Enumerable.Repeat(chars, length).Select(s => s[random.Next(chars.Length)]).ToArray());
        }

        private static int GetRandomLength(string attackType)
        {
            if (attackType == "simple" || attackType == "block")
            {
                return random.Next(3, 6);
            }

            return random.Next(6, 9);
        }

        public static string GenerateAttackCombination(Random rand)
        {
            random = rand;
            attackCombination = GetRandomString(GetRandomLength("simple"));
            return attackCombination;
        }

        public static string GenerateSuperAttackCombination(Random rand)
        {
            random = rand;
            superAttackCombination = GetRandomString(GetRandomLength("superAttack"));
            return superAttackCombination;
        }
    }
}
