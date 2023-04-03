using factory.Interfaces;

namespace factory.Fighters
{
    public class MasterShifu : IFighter
    {
        public int GetAttackDamage()
        {
            return 2;
        }

        public int GetSuperAttackDamage()
        {
            return 6;
        }

        public int Attack()
        {
            DisplayMessage.Attack("Master Shifu");
            return GetAttackDamage();
        }

        public int SuperAttack()
        {
            DisplayMessage.SuperAttack("Master Shifu");
            return GetSuperAttackDamage();
        }
    }
}
