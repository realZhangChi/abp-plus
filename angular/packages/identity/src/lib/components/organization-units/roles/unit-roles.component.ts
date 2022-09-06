import {
  AddMemberDto,
  GetIdentityRolesInput,
  GetIdentityUsersInput,
  IdentityRoleDto,
  IdentityRoleService,
  IdentityUserService,
  OrganizationUnitDto,
  OrganizationUnitService,
} from '@abp-plus/ng.identity/proxy';
import { Confirmation, ConfirmationService } from '@abp-plus/ng.theme.shared';
import { EXTENSIONS_IDENTIFIER } from '@abp-plus/ng.theme.shared/extensions';
import { IdentityUserDto } from '@abp/ng.account.core/proxy';
import {
  ListService,
  PagedResultDto,
  PagedResultRequestDto,
  SubscriptionService,
} from '@abp/ng.core';
import { Component, Input } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Subject } from 'rxjs';
import { debounceTime, finalize } from 'rxjs/operators';
import { eIdentityComponents } from '../../../enums';

@Component({
  selector: 'abp-unit-roles',
  templateUrl: './unit-roles.component.html',
  providers: [
    ListService,
    {
      provide: EXTENSIONS_IDENTIFIER,
      useValue: eIdentityComponents.UnitRoles,
    },
  ],
})
export class UnitRolesComponent {
  @Input()
  get organizationUnit() {
    return this._organizationUnit;
  }
  set organizationUnit(value: OrganizationUnitDto) {
    this._organizationUnit = value ?? ({} as OrganizationUnitDto);
    this.getAddedRoles$.next(value);
  }
  _organizationUnit = {} as OrganizationUnitDto;

  private getAddedRoles$ = new Subject<OrganizationUnitDto>();
  addedRoles: PagedResultDto<IdentityRoleDto> = {
    items: [],
    totalCount: 0,
  };

  modalVisible: boolean;
  modalBusy: boolean;
  allRoles: PagedResultDto<IdentityRoleDto> = { items: [], totalCount: 0 };
  roleAllChecked = false;
  roleCheckIndeterminate = false;
  setOfCheckedId = new Set<string>();

  constructor(
    public readonly roleList: ListService<PagedResultRequestDto>,
    public readonly allRolelist: ListService<GetIdentityRolesInput>,
    private subscription: SubscriptionService,
    private service: OrganizationUnitService,
    private roleService: IdentityRoleService,
    private confirm: ConfirmationService,
  ) {
    this.initGetAddedRolesStream();
  }

  deleteRole(role: IdentityRoleDto) {
    this.confirm
      .warn('AbpIdentity::RemoveRoleFromOuWarningMessage', 'AbpIdentity::AreYouSure', {
        messageLocalizationParams: [this.organizationUnit.displayName, role.name],
      })
      .subscribe((status: Confirmation.Status) => {
        if (status === Confirmation.Status.confirm) {
          this.service
            .deleteRole(this.organizationUnit.id, role.id)
            .subscribe(() => this.getAddedRoles$.next(this.organizationUnit));
        }
      });
  }

  saveRoles() {
    this.modalBusy = true;
    this.service
      .updateRole(this.organizationUnit.id, {
        roleIds: Array.from(this.setOfCheckedId),
      })
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.modalVisible = false;
        this.getAddedRoles$.next(this.organizationUnit);
      });
  }

  editRoles() {
    this.modalVisible = true;
    this.allRolelist
      .hookToQuery(query => this.roleService.getList(query))
      .subscribe(result => {
        this.allRoles = result;
        this.setOfCheckedId.clear();
        this.addedRoles.items.forEach(u => this.updateCheckedSet(u.id, true));
        this.refreshRoleCheckedStatus();
      });
  }

  onRoleQueryParamsChange(params: NzTableQueryParams): void {
    if (this.roleList.page !== params.pageIndex - 1) {
      this.roleList.page = params.pageIndex - 1;
    }
    if (this.roleList.maxResultCount != params.pageSize) {
      this.roleList.maxResultCount = params.pageSize;
    }
  }

  onRoleChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshRoleCheckedStatus();
  }

  onAllRoleChecked(checked: boolean): void {
    this.allRoles.items.forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshRoleCheckedStatus();
  }

  private refreshRoleCheckedStatus(): void {
    this.roleAllChecked = this.allRoles.items.every(({ id }) => this.setOfCheckedId.has(id));
    this.roleCheckIndeterminate =
      this.allRoles.items.some(({ id }) => this.setOfCheckedId.has(id)) && !this.roleAllChecked;
  }

  private updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  private initGetAddedRolesStream() {
    this.subscription.addOne(this.getAddedRoles$.pipe(debounceTime(0)), value =>
      this.hookToQuery(value),
    );
  }

  private hookToQuery(organizationUnit: OrganizationUnitDto) {
    if (!organizationUnit?.id) {
      return;
    }
    this.roleList
      .hookToQuery(query => this.service.getRoleList(organizationUnit.id, query))
      .subscribe(result => {
        this.addedRoles = result;
      });
  }
}
