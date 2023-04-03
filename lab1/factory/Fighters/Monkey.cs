using factory.Interfaces;

namespace factory.Fighters
{
    public class Monkey : IFighter
    {
        public int GetAttackDamage()
        {
            return 1;
        }

        public int GetSuperAttackDamage()
        {
            return 3;
        }

        public int Attack()
        {
            DisplayMessage.Attack("Monkey");
            return GetAttackDamage();
        }

        public int SuperAttack()
        {
            DisplayMessage.SuperAttack("Monkey");
            return GetSuperAttackDamage();
        }
    }
}
