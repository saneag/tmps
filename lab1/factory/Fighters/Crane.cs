using factory.Interfaces;

namespace factory.Fighters
{
    public class Crane : IFighter
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
            DisplayMessage.Attack("Crane");
            return GetAttackDamage();
        }

        public int SuperAttack()
        {
            DisplayMessage.SuperAttack("Crane");
            return GetSuperAttackDamage();
        }
    }
}
