using System.ComponentModel.DataAnnotations;

namespace CatchException.Abp.Identity;

public class OrganizationUnitMoveDto
{
    public Guid NewParentId { get; set; } = default!;
}