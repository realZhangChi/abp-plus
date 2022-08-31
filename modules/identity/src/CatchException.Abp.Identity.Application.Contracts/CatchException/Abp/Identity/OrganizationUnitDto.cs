using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities;

namespace CatchException.Abp.Identity;

public class OrganizationUnitDto : ExtensibleEntityDto<Guid>, IHasConcurrencyStamp
{
    public Guid? ParentId { get; set; }
    
    public string Code { get; set; } = default!;
    
    public string DisplayName { get; set; } = default!;
    
    public string ConcurrencyStamp { get; set; } = default!;
}