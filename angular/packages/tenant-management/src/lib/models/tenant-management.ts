import { PagedResultDto } from '@abp/ng.core';
import { TenantDto } from '@abp-plus/ng.tenant-management/proxy';

export namespace TenantManagement {
  export interface State {
    result: PagedResultDto<TenantDto>;
    selectedItem: TenantDto;
  }
}
