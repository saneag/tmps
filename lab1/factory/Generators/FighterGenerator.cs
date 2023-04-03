namespace factory.Generators
{
    public static class FighterGenerator
    {
        public static string GenerateFighter()
        {
            int rnd = new Random().Next(0, 9);

            return FightersList.fighters.ElementAt(rnd).Key;
        }
    }
}
