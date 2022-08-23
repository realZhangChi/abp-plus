using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace DevApp.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class DevAppDbContextFactory : IDesignTimeDbContextFactory<DevAppDbContext>
{
    public DevAppDbContext CreateDbContext(string[] args)
    {
        DevAppEfCoreEntityExtensionMappings.Configure();

        var configuration = BuildConfiguration();

        var builder = new DbContextOptionsBuilder<DevAppDbContext>()
            .UseSqlServer(configuration.GetConnectionString("Default"));

        return new DevAppDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../DevApp.DbMigrator/"))
            .AddJsonFile("appsettings.json", optional: false)
            .AddUserSecrets("DevApp-4681b4fd-151f-4221-84a4-929d86723e4c");

        return builder.Build();
    }
}
