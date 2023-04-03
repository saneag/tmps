namespace singleton
{
    class Program
    {
        static void Main()
        {
            Singleton switch1 = Singleton.GetInstance();
            Singleton switch2 = Singleton.GetInstance();

            Console.WriteLine("1. Get lamps state\n2. Change lamps state\n3. Verify if switches are syncronized\nEsc. Exit");

            ConsoleKeyInfo keyInfo;

            do
            {
                keyInfo = Console.ReadKey(true);
                if (keyInfo.Key == ConsoleKey.D1)
                {
                    Console.WriteLine(switch1.getLampState());
                }
                else if (keyInfo.Key == ConsoleKey.D2)
                {
                    switch1.changeLampState();
                } else if(keyInfo.Key == ConsoleKey.D3)
                {
                    if(switch1.lampState == switch2.lampState)
                    {
                        Console.WriteLine("Switches are syncronized");
                    } else
                    {
                        Console.WriteLine("Switches are not syncronized");
                    }
                }
            } while (keyInfo.Key != ConsoleKey.Escape);
        }
    }
}