using System.ComponentModel.DataAnnotations;
using Volo.Abp.Identity;
using Volo.Abp.Validation;

namespace CatchException.Abp.Identity;

public class OrganizationUnitCreateDto : OrganizationUnitCreateOrUpdateDtoBase
{
    public Guid? ParentId { get; set; }
}