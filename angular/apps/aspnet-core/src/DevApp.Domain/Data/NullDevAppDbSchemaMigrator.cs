using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace DevApp.Data;

/* This is used if database provider does't define
 * IDevAppDbSchemaMigrator implementation.
 */
public class NullDevAppDbSchemaMigrator : IDevAppDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
