using Volo.Abp.Settings;

namespace DevApp.Settings;

public class DevAppSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(DevAppSettings.MySetting1));
    }
}
