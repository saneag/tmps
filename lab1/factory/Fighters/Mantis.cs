using factory.Interfaces;

namespace factory.Fighters
{
    public class Mantis : IFighter
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
            DisplayMessage.Attack("Mantis");
            return GetAttackDamage();
        }

        public int SuperAttack()
        {
            DisplayMessage.SuperAttack("Mantis");
            return GetSuperAttackDamage();
        }
    }
}
