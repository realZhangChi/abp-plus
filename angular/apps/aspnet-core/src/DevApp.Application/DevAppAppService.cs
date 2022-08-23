using System;
using System.Collections.Generic;
using System.Text;
using DevApp.Localization;
using Volo.Abp.Application.Services;

namespace DevApp;

/* Inherit your application services from this class.
 */
public abstract class DevAppAppService : ApplicationService
{
    protected DevAppAppService()
    {
        LocalizationResource = typeof(DevAppResource);
    }
}
