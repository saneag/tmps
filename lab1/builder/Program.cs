namespace builder
{
    class Program
    {
        static void Main(string[] args)
        {
            Director director = new Director();
            IBuilder builder = new LaptopBuilder();
            director.Builder = builder;

            Console.WriteLine("Doriti un laptop simplu sau complet?");
            Console.WriteLine("1. Simplu");
            Console.WriteLine("2. Complet");
            
            string option = Console.ReadLine();
            if (option == "1")
                director.BuildMinimalViableLaptop();
            else if (option == "2")
                director.BuildFullFeaturedLaptop();
            else Console.WriteLine("Optiune invalida!");
            
            Console.WriteLine(builder.GetLaptop().ListParts());

            
            option = Console.ReadLine();
            if (option == "1")
                director.BuildMinimalViableLaptop();
            else if (option == "2")
                director.BuildFullFeaturedLaptop();
            else Console.WriteLine("Optiune invalida!");
            
            Console.WriteLine(builder.GetLaptop().ListParts());
            
            Console.WriteLine("Enter to continue...");
            Console.ReadKey();
        }
    }
}