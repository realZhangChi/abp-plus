using Microsoft.AspNetCore.Authorization;

using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Data;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;
using Volo.Abp.ObjectExtending;

namespace CatchException.Abp.Identity;

[Authorize(IdentityPermissions.OrganizationUnits.Default)]
public class OrganizationUnitAppService :
    CrudAppService<OrganizationUnit,
        OrganizationUnitDto,
        Guid,
        GetOrganizationUnitInput,
        OrganizationUnitCreateDto,
        OrganizationUnitUpdateDto>,
    IOrganizationUnitAppService
{
    protected virtual OrganizationUnitManager Manager =>
        LazyServiceProvider.LazyGetRequiredService<OrganizationUnitManager>();

    protected virtual IIdentityUserRepository IdentityUserRepository =>
        LazyServiceProvider.LazyGetRequiredService<IIdentityUserRepository>();

    protected virtual IRepository<IdentityRole, Guid> IdentityRoleRepository =>
        LazyServiceProvider.LazyGetRequiredService<IRepository<IdentityRole, Guid>>();

    protected virtual IOrganizationUnitRepository OuRepository =>
        LazyServiceProvider.LazyGetRequiredService<IOrganizationUnitRepository>();

    protected virtual IdentityUserManager UserManager =>
        LazyServiceProvider.LazyGetRequiredService<IdentityUserManager>();

    public OrganizationUnitAppService(IRepository<OrganizationUnit, Guid> repository) : base(repository)
    {
    }

    public virtual async Task<ListResultDto<OrganizationUnitDto>> GetAllListAsync()
    {
        var ous = await Repository.GetListAsync();
        return new ListResultDto<OrganizationUnitDto>(
            ObjectMapper.Map<List<OrganizationUnit>, List<OrganizationUnitDto>>(ous));
    }

    [Authorize(IdentityPermissions.OrganizationUnits.Update)]
    public Task MoveAsync(Guid id, OrganizationUnitMoveDto input)
    {
        return Manager.MoveAsync(id, input.NewParentId);
    }

    public async Task<PagedResultDto<IdentityUserDto>> GetMemberListAsync(Guid id, PagedResultRequestDto input)
    {
        var ou = await OuRepository.GetAsync(id);
        var count = await OuRepository.GetMembersCountAsync(ou);
        var members =
            await OuRepository.GetMembersAsync(ou, maxResultCount: input.MaxResultCount, skipCount: input.SkipCount);

        return new PagedResultDto<IdentityUserDto>(count,
            ObjectMapper.Map<List<IdentityUser>, List<IdentityUserDto>>(members));
    }

    public async Task AddMemberAsync(Guid ouId, AddMemberDto input)
    {
        foreach (var userId in input.UserIds)
        {
            await UserManager.AddToOrganizationUnitAsync(userId, ouId);
        }

        await CurrentUnitOfWork.SaveChangesAsync();
    }

    public async Task<PagedResultDto<IdentityRoleDto>> GetRoleListAsync(Guid id, PagedResultRequestDto input)
    {
        var query = (await Repository.GetQueryableAsync())
            .Where(ou => ou.Id == id)
            .SelectMany(ou => ou.Roles)
            .Join(await IdentityRoleRepository.GetQueryableAsync(),
                x => x.RoleId,
                role => role.Id,
                (x, y) => y);

        var count = await AsyncExecuter.CountAsync(query);
        var roles = await AsyncExecuter.ToListAsync(query);

        return new PagedResultDto<IdentityRoleDto>(count,
            ObjectMapper.Map<List<IdentityRole>, List<IdentityRoleDto>>(roles));
    }

    [Authorize(IdentityPermissions.OrganizationUnits.Create)]
    public override async Task<OrganizationUnitDto> CreateAsync(OrganizationUnitCreateDto input)
    {
        var ou = new OrganizationUnit(GuidGenerator.Create(), input.DisplayName, input.ParentId);
        await Manager.CreateAsync(ou);

        return ObjectMapper.Map<OrganizationUnit, OrganizationUnitDto>(ou);
    }

    public override async Task<OrganizationUnitDto> UpdateAsync(Guid id, OrganizationUnitUpdateDto input)
    {
        var ou = await Repository.GetAsync(id);

        ou.SetConcurrencyStampIfNotNull(input.ConcurrencyStamp);

        ou.DisplayName = input.DisplayName;
        input.MapExtraPropertiesTo(ou);
        await Manager.UpdateAsync(ou);
        await CurrentUnitOfWork.SaveChangesAsync();

        return ObjectMapper.Map<OrganizationUnit, OrganizationUnitDto>(ou);
    }
}