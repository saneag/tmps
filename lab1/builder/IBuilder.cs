namespace builder
{
    public interface IBuilder
    {
        public LaptopBuilder BuildDisplay(string displayType, int displayFreq, double displayDiagonal);
        public LaptopBuilder BuildKeyboard();
        public LaptopBuilder BuildCPU(string cpuName, int cpuCoresNumber, int cpuThreadsNumber);
        public LaptopBuilder BuildGPU(string gpuName);
        public LaptopBuilder BuildRAM(string ramName, double ramFreq, int ramCapacity);
        public LaptopBuilder BuildSSD(string ssdName, double ssdCapacity);
        public LaptopBuilder BuildHDD(string hddName, double hddCapacity);
        public LaptopBuilder BuildMotherBoard();
        public LaptopBuilder BuildSpeakers();
        public LaptopBuilder BuildBattery(double batteryCapacity);
        public LaptopBuilder BuildPowerSupply(double outputPower);
        public void Reset();
        public Laptop GetLaptop();
    }
}
