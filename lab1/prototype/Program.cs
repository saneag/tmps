using prototype.Institutions;

namespace prototype;

class Program
{
    public static void Main(string[] args)
    {
        Kindergarten kindergarten = new Kindergarten("Kindergarten", "Mirror Park", "Trevor Philips", 3);
        Console.WriteLine("Original object:");
        kindergarten.DisplayInfo();
        Kindergarten kindergarten2 = kindergarten.Clone() as Kindergarten;
        Console.WriteLine("\nCloned object:");
        kindergarten2.DisplayInfo();
        kindergarten2.AgeGroup = 4;
        Console.WriteLine("\nCloned object after changing AgeGroup:");
        kindergarten2.DisplayInfo();
        Console.WriteLine("\nOriginal object after changing AgeGroup of cloned object:");
        kindergarten.DisplayInfo();

        School school = new School("School", "Vinewood Boulevard", "Michael De Santa", 500);
        Console.WriteLine("\nOriginal object:");
        school.DisplayInfo();
        School school2 = school.Clone() as School;
        Console.WriteLine("\nCloned object:");
        school2.DisplayInfo();
        school2.NumberOfStudents = 600;
        Console.WriteLine("\nCloned object after changing NumberOfStudents:");
        school2.DisplayInfo();
        Console.WriteLine("\nOriginal object after changing NumberOfStudents of cloned object:");
        school.DisplayInfo();

        University university = new University("University", "West Coast Classics", "Franklin Clinton", 40);
        Console.WriteLine("\nOriginal object:");
        university.DisplayInfo();
        University university2 = university.Clone() as University;
        Console.WriteLine("\nCloned object:");
        university2.DisplayInfo();
        university2.NumberOfLaboratories = 50;
        Console.WriteLine("\nCloned object after changing NumberOfLaboratories:");
        university2.DisplayInfo();
        Console.WriteLine("\nOriginal object after changing NumberOfLaboratories of cloned object:");
        university.DisplayInfo();

        Console.WriteLine("Press any key to exit...");
        Console.ReadKey();
    }
}