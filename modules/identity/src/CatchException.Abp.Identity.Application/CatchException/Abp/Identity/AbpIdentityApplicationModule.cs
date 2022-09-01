﻿using Microsoft.Extensions.DependencyInjection;

using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace CatchException.Abp.Identity;

[DependsOn(
    typeof(Volo.Abp.Identity.AbpIdentityApplicationModule),
    typeof(AbpIdentityApplicationContractsModule))]
public class AbpIdentityApplicationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {

        context.Services.AddAutoMapperObjectMapper<AbpIdentityApplicationModule>();

        Configure<AbpAutoMapperOptions>(options =>
        {
            options.AddProfile<AbpIdentityApplicationModuleAutoMapperProfile>(validate: true);
        });
    }
}