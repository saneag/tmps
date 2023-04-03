using factory.Interfaces;

namespace factory.Fighters
{
    public class TaiLung : IFighter
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
            DisplayMessage.Attack("Tai Lung");
            return GetAttackDamage();
        }

        public int SuperAttack()
        {
            DisplayMessage.SuperAttack("Tai Lung");
            return GetSuperAttackDamage();
        }
    }
}
