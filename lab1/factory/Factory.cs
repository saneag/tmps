using factory.Interfaces;

namespace factory
{
    public class FightersFactory
    {
        public static IFighter CreateFighter(string fighterType)
        {
            switch (fighterType)
            {
                case "Tai Lung":
                    return FightersList.fighters[fighterType];
                case "Po":
                    return FightersList.fighters[fighterType];
                case "Tigress":
                    return FightersList.fighters[fighterType];
                case "Master Shifu":
                    return FightersList.fighters[fighterType];
                case "Grand Master Oogway":
                    return FightersList.fighters[fighterType];
                case "Monkey":
                    return FightersList.fighters[fighterType];
                case "Mantis":
                    return FightersList.fighters[fighterType];
                case "Viper":
                    return FightersList.fighters[fighterType];
                case "Crane":
                    return FightersList.fighters[fighterType];
                default:
                    throw new ArgumentException("Invalid figther type");
            }
        }
    }
}
