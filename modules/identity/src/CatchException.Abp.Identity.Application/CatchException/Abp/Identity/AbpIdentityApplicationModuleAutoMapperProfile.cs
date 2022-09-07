using AutoMapper;
using Volo.Abp.Identity;

namespace CatchException.Abp.Identity;

public class AbpIdentityApplicationModuleAutoMapperProfile : Profile
{
    public AbpIdentityApplicationModuleAutoMapperProfile()
    {
        CreateMap<OrganizationUnit, OrganizationUnitDto>();
    }
}