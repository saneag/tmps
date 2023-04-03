using factory.Interfaces;

namespace factory.Fighters
{
    public class GrandMasterOogway : IFighter
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
            DisplayMessage.Attack("Grand Master Oogway");
            return GetAttackDamage();
        }

        public int SuperAttack()
        {
            DisplayMessage.SuperAttack("Grand Master Oogway");
            return GetSuperAttackDamage();
        }
    }
}
