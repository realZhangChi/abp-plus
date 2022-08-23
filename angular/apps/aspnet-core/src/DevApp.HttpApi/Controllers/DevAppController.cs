using DevApp.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace DevApp.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class DevAppController : AbpControllerBase
{
    protected DevAppController()
    {
        LocalizationResource = typeof(DevAppResource);
    }
}
