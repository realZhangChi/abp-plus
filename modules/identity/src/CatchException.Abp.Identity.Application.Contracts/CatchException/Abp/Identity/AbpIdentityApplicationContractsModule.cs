using Volo.Abp.Modularity;

namespace CatchException.Abp.Identity;

[DependsOn(typeof(Volo.Abp.Identity.AbpIdentityApplicationContractsModule))]
public class AbpIdentityApplicationContractsModule : AbpModule
{
    
}