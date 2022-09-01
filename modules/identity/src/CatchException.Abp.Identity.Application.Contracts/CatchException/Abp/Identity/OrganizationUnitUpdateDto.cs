using Volo.Abp.Domain.Entities;

namespace CatchException.Abp.Identity;

public class OrganizationUnitUpdateDto : OrganizationUnitCreateOrUpdateDtoBase, IHasConcurrencyStamp
{
    public string ConcurrencyStamp { get; set; } = default!;
}