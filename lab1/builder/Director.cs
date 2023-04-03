namespace builder
{
    public class Director
    {
        private IBuilder _builder;

        public IBuilder Builder
        {
            set { _builder = value; }
        }

        public void BuildMinimalViableLaptop()
        {
            _builder
                .BuildMotherBoard()
                .BuildCPU("Ryzen 5 5500u", 6, 12)
                .BuildRAM("HyperX", 3200, 16)
                .BuildDisplay("IPS", 144, 15.6)
                .BuildPowerSupply(65)
                .BuildKeyboard()
                .BuildSpeakers(); ;
        }

        public void BuildFullFeaturedLaptop()
        {
            _builder
                .BuildMotherBoard()
                .BuildCPU("Ryzen 5", 6, 12)
                .BuildRAM("HyperX", 3200, 16)
                .BuildDisplay("IPS", 144, 15.6)
                .BuildPowerSupply(65)
                .BuildKeyboard()
                .BuildGPU("Nvidia RTX 3060")
                .BuildSSD("Samsung evo 960", 512)
                .BuildSpeakers()
                .BuildBattery(48)
                .BuildHDD("WD BLUE", 512);
        }
    }
}
