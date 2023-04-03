namespace factory.Interfaces
{
    public interface IFighter
    {
        int GetAttackDamage();
        int GetSuperAttackDamage();
        int Attack();
        int SuperAttack();
    }
}
