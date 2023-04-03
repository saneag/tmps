using factory.Generators;
using factory.Interfaces;
using System.Linq;

namespace factory.GameProcess
{
    public static class Fight
    {
        private static bool validateCombination(ConsoleKeyInfo userComboKey, char generatedComboKey)
        {
            return userComboKey.KeyChar == generatedComboKey;
        }

        public static void StartFight(IFighter user, IFighter bot)
        {
            int numberOfLivesUser = 10;
            int numberOfLivesBot = 10;
            Random random = new Random();

            while (numberOfLivesUser >= 0 || numberOfLivesBot >= 0)
            {
                if (numberOfLivesBot <= 0)
                {
                    Console.WriteLine("You win!");
                    break;
                }
                if (numberOfLivesUser <= 0)
                {
                    Console.WriteLine("You lose!");
                    break;
                }
                Console.WriteLine(
                    "1. Simple attack cause {0} damage\n" +
                    "2. Super attack cause {1} damage\n",
                    user.GetAttackDamage(),
                    user.GetSuperAttackDamage());
                ConsoleKeyInfo moveIndex;
                Console.WriteLine("Choose your move: ");
                moveIndex = Console.ReadKey(true);
                Console.WriteLine(moveIndex.KeyChar);

                switch (moveIndex.KeyChar)
                {
                    case '1':
                        GenerateCombination.GenerateAttackCombination(random);
                        Console.WriteLine(GenerateCombination.attackCombination.ToUpper());
                        while (GenerateCombination.attackCombination.Length > 0 && validateCombination(Console.ReadKey(), GenerateCombination.attackCombination[0]))
                        {
                            GenerateCombination.attackCombination = GenerateCombination.attackCombination.Remove(0, 1);
                        }
                        if (GenerateCombination.attackCombination.Length == 0)
                        {
                            Console.Clear();
                            numberOfLivesBot -= user.Attack();
                        }
                        else
                        {
                            Console.Clear();
                            Console.WriteLine("You did the combination wrong!");
                            numberOfLivesUser -= bot.Attack();
                        }
                        break;
                    case '2':
                        GenerateCombination.GenerateSuperAttackCombination(random);
                        Console.WriteLine(GenerateCombination.superAttackCombination.ToUpper());
                        while (GenerateCombination.superAttackCombination.Length > 0 && validateCombination(Console.ReadKey(), GenerateCombination.superAttackCombination[0]))
                        {
                            GenerateCombination.superAttackCombination = GenerateCombination.superAttackCombination.Remove(0, 1);
                        }
                        if (GenerateCombination.superAttackCombination.Length == 0)
                        {
                            Console.Clear();
                            numberOfLivesBot -= user.SuperAttack();
                        }
                        else
                        {
                            Console.Clear();
                            Console.WriteLine("You did the combination wrong!");
                            numberOfLivesUser -= bot.SuperAttack();
                        }
                        break;
                    default:
                        Console.WriteLine("There is no such move!");
                        break;
                }
                Console.WriteLine("User Lives: \u2665X{0}\nBot Lives: \u2665X{1}",
                    numberOfLivesUser,
                    numberOfLivesBot);
            }
        }
    }
}
