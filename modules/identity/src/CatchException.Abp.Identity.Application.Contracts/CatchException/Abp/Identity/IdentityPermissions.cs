using Volo.Abp.Reflection;

namespace CatchException.Abp.Identity;

public static class IdentityPermissions
{
    public static class OrganizationUnits
    {
        public const string Default = Volo.Abp.Identity.IdentityPermissions.GroupName + ".OrganizationUnits";
        public const string Create = Default + ".Create";
        public const string Update = Default + ".Update";
        public const string Delete = Default + ".Delete";
    }

    public static string[] GetAll()
    {
        return ReflectionHelper.GetPublicConstantsRecursively(typeof(IdentityPermissions));
    }
}