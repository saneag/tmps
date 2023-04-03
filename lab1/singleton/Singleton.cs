using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace singleton
{
    class Singleton
    {
        private static readonly Lazy<Singleton> _instance = new Lazy<Singleton>(() => new Singleton());

        public bool lampState { get; set; } = false;

        private Singleton() { }

        public static Singleton GetInstance()
        {
            return _instance.Value;
        }

        public void changeLampState()
        {
            Console.WriteLine($"Lamp was turned {(!lampState ? "On" : "Off")}");
            lampState = !lampState;
        }

        public string getLampState()
        {
            return $"Lamp is {(lampState ? "On" : "Off")}";
        }
    }
}
