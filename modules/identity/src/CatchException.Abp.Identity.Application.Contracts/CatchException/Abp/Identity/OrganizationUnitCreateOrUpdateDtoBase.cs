using System.ComponentModel.DataAnnotations;
using Volo.Abp.Identity;
using Volo.Abp.ObjectExtending;
using Volo.Abp.Validation;

namespace CatchException.Abp.Identity;

public abstract class OrganizationUnitCreateOrUpdateDtoBase : ExtensibleObject
{
    [Required]
    [DynamicStringLength(typeof(OrganizationUnitConsts), nameof(OrganizationUnitConsts.MaxDisplayNameLength))]
    public string DisplayName { get; set; } = default!;

    protected OrganizationUnitCreateOrUpdateDtoBase() : base(false)
    {
    }
}