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
        organizationUnitsPermission.AddChild(IdentityPermissions.OrganizationUnits.ManageOU, L("Permission:ManageOU"));
        organizationUnitsPermission.AddChild(IdentityPermissions.OrganizationUnits.ManageRoles, L("Permission:ManageRoles"));
        organizationUnitsPermission.AddChild(IdentityPermissions.OrganizationUnits.ManageUsers, L("Permission:ManageUsers"));
    }
    
    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<IdentityResource>(name);
    }
}