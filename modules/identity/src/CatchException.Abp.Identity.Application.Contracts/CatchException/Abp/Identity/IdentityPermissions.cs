using Volo.Abp.Reflection;

namespace CatchException.Abp.Identity;

public static class IdentityPermissions
{
    public static class OrganizationUnits
    {
        public const string Default = Volo.Abp.Identity.IdentityPermissions.GroupName + ".OrganizationUnits";
        public const string ManageOU = Default + ".ManageOU";
        public const string ManageRoles = Default + ".ManageRoles";
        public const string ManageUsers = Default + ".ManageUsers";
    }

    public static string[] GetAll()
    {
        return ReflectionHelper.GetPublicConstantsRecursively(typeof(IdentityPermissions));
    }
}