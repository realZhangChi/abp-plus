using Volo.Abp.Modularity;

namespace DevApp;

[DependsOn(
    typeof(DevAppApplicationModule),
    typeof(DevAppDomainTestModule)
    )]
public class DevAppApplicationTestModule : AbpModule
{

}
