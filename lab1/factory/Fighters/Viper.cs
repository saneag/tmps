using factory.Interfaces;

namespace factory.Fighters
{
    public class Viper : IFighter
    {
        public int GetAttackDamage()
        {
            return 2;
        }

        public int GetSuperAttackDamage()
        {
            return 4;
        }

        public int Attack()
        {
            DisplayMessage.Attack("Viper");
            return GetAttackDamage();
        }

        public int SuperAttack()
        {
            DisplayMessage.SuperAttack("Viper");
            return GetSuperAttackDamage();
        }
    }
}
