using DevApp.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace DevApp.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(DevAppEntityFrameworkCoreModule),
    typeof(DevAppApplicationContractsModule)
    )]
public class DevAppDbMigratorModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
    }
}
