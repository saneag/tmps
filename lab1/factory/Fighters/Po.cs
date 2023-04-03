using factory.Interfaces;

namespace factory.Fighters
{
    public class Po : IFighter
    {
        public int GetAttackDamage()
        {
            return 3;
        }

        public int GetSuperAttackDamage()
        {
            return 7;
        }

        public int Attack()
        {
            DisplayMessage.Attack("Po");
            return GetAttackDamage();
        }

        public int SuperAttack()
        {
            DisplayMessage.SuperAttack("Po");
            return GetSuperAttackDamage();
        }
    }
}
