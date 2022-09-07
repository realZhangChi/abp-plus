namespace CatchException.Abp.Identity;

public class AddRoleDto
{
    public Guid[] RoleIds { get; set; } = default!;
}