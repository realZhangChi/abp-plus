using Volo.Abp.Modularity;

namespace CatchException.Abp.Identity;

[DependsOn(
    typeof(Volo.Abp.Identity.AbpIdentityHttpApiModule),
    typeof(AbpIdentityApplicationContractsModule))]
public class AbpIdentityHttpApiModule : AbpModule
{
    
}