using Volo.Abp.Modularity;

namespace CatchException.Abp.Identity;

[DependsOn(
    typeof(Volo.Abp.Identity.AbpIdentityApplicationModule),
    typeof(AbpIdentityApplicationContractsModule))]
public class AbpIdentityApplicationModule : AbpModule
{
}