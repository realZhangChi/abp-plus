using DevApp.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace DevApp;

[DependsOn(
    typeof(DevAppEntityFrameworkCoreTestModule)
    )]
public class DevAppDomainTestModule : AbpModule
{

}
