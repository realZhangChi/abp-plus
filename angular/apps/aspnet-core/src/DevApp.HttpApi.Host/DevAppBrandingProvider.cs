using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace DevApp;

[Dependency(ReplaceServices = true)]
public class DevAppBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "DevApp";
}
