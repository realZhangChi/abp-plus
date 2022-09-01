using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Identity.Localization;
using Volo.Abp.Localization;

namespace CatchException.Abp.Identity;

public class IdentityPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var identityGroup = context.GetGroup(Volo.Abp.Identity.IdentityPermissions.GroupName);

        var organizationUnitsPermission = identityGroup.AddPermission(IdentityPermissions.OrganizationUnits.Default,
            L("Permission:OrganizationUnitManagement"));
        organizationUnitsPermission.AddChild(IdentityPermissions.OrganizationUnits.Create, L("Permission:Create"));
        organizationUnitsPermission.AddChild(IdentityPermissions.OrganizationUnits.Update, L("Permission:Edit"));
        organizationUnitsPermission.AddChild(IdentityPermissions.OrganizationUnits.Delete, L("Permission:Delete"));
    }
    
    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<IdentityResource>(name);
    }
}