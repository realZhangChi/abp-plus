using Volo.Abp.Application.Dtos;

namespace CatchException.Abp.Identity;

public class GetOrganizationUnitInput : PagedAndSortedResultRequestDto
{
    public string Filter { get; set; } = default!;
}