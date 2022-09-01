using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.VirtualFileSystem;

namespace CatchException.Abp.Identity;

[DependsOn(typeof(Volo.Abp.Identity.AbpIdentityApplicationContractsModule))]
public class AbpIdentityApplicationContractsModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpVirtualFileSystemOptions>(options =>
        {
            options.FileSets.AddEmbedded<AbpIdentityApplicationContractsModule>();
        });

        Configure<AbpLocalizationOptions>(options =>
        {
            options.Resources
                .Get<Volo.Abp.Identity.Localization.IdentityResource>()
                .AddVirtualJson("/CatchException/Abp/Identity/Localization");
        });
        
    }
}