namespace CatchException.Abp.Identity;

public class AddMemberDto
{
    public Guid[] UserIds { get; set; } = default!;
}