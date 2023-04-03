using factory.Interfaces;

namespace factory.Fighters
{
    public class Tigress : IFighter
    {
        public int GetAttackDamage()
        {
            return 2;
        }

        public int GetSuperAttackDamage()
        {
            return 5;
        }

        public int Attack()
        {
            DisplayMessage.Attack("Tigress");
            return GetAttackDamage();
        }

        public int SuperAttack()
        {
            DisplayMessage.SuperAttack("Tigress");
            return GetSuperAttackDamage();
        }
    }
}
