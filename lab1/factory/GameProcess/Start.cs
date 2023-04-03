using factory.Generators;
using factory.Interfaces;

namespace factory.GameProcess
{
    public static class Start
    {
        public static void StartGame()
        {
            Console.WriteLine("Choose your figther: ");
            string fighterType = UserFighterChoose.FighterChoose();
            IFighter user = FightersFactory.CreateFighter(fighterType);
            Console.Clear();
            Console.WriteLine("You are playing as {0}", fighterType);

            Console.Write("Your opponent is: ");
            string generatedFighter = FighterGenerator.GenerateFighter();
            IFighter bot = FightersFactory.CreateFighter(generatedFighter);
            Console.WriteLine(generatedFighter);

            Console.WriteLine("Fight!");

            Fight.StartFight(user, bot);
        }
    }
}
