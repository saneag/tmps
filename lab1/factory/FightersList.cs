using factory.Fighters;
using factory.Interfaces;

namespace factory
{
    public static class FightersList
    {
        public static Dictionary<string, IFighter> fighters = new Dictionary<string, IFighter>()
        {
            {"Tai Lung", new TaiLung() },
            {"Po", new Po()},
            {"Tigress", new Tigress() },
            {"Master Shifu", new MasterShifu() },
            {"Grand Master Oogway", new GrandMasterOogway() },
            {"Monkey", new Monkey() },
            {"Mantis", new Mantis() },
            {"Viper", new Viper() },
            {"Crane", new Crane() }
        };
    }
}
