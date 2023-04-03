namespace builder
{
    public class LaptopBuilder : IBuilder
    {
        private Laptop _product = new Laptop();

        public LaptopBuilder()
        {
            Reset();
        }

        public void Reset()
        {
            _product = new Laptop();
        }

        public LaptopBuilder BuildCPU(string cpuName, int cpuCoresNumber, int cpuThreadsNumber)
        {
            _product.Add(cpuName);
            _product.Add(cpuCoresNumber.ToString());
            _product.Add(cpuThreadsNumber.ToString());
            return this;
        }

        public LaptopBuilder BuildGPU(string gpuName)
        {
            _product.Add(gpuName);
            return this;
        }

        public LaptopBuilder BuildRAM(string ramName, double ramFreq, int ramCapacity)
        {
            _product.Add(ramName);
            _product.Add(ramFreq.ToString());
            _product.Add(ramCapacity.ToString());
            return this;
        }

        public LaptopBuilder BuildHDD(string hddName, double hddCapacity)
        {
            _product.Add(hddName);
            _product.Add(hddCapacity.ToString());
            return this;
        }

        public LaptopBuilder BuildKeyboard()
        {
            _product.Add("Keyboard");
            return this;
        }

        public LaptopBuilder BuildDisplay(string displayType, int displayFreq, double displayDiagonal)
        {
            _product.Add(displayType);
            _product.Add(displayFreq.ToString());
            _product.Add(displayDiagonal.ToString());
            return this;
        }

        public LaptopBuilder BuildMotherBoard()
        {
            _product.Add("MotherBoard");
            return this;
        }

        public LaptopBuilder BuildBattery(double batteryCapacity)
        {
            _product.Add(batteryCapacity.ToString());
            return this;
        }

        public LaptopBuilder BuildPowerSupply(double outputPower)
        {
            _product.Add(outputPower.ToString());
            return this;
        }

        public LaptopBuilder BuildSpeakers()
        {
            _product.Add("Speakers");
            return this;
        }

        public LaptopBuilder BuildSSD(string ssdName, double ssdCapacity)
        {
            _product.Add(ssdName);
            _product.Add(ssdCapacity.ToString());
            return this;
        }

        public Laptop GetLaptop()
        {
            Laptop result = _product;
            Reset();
            return result;
        }
    }
}