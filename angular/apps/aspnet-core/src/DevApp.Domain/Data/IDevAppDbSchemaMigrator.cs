using System.Threading.Tasks;

namespace DevApp.Data;

public interface IDevAppDbSchemaMigrator
{
    Task MigrateAsync();
}
