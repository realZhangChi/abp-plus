import {
  AddMemberDto,
  GetIdentityUsersInput,
  IdentityRoleDto,
  IdentityUserService,
  OrganizationUnitDto,
  OrganizationUnitService,
} from '@abp-plus/ng.identity/proxy';
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
    this.getMembers$.next(value);
  }
  _organizationUnit = {} as OrganizationUnitDto;

  private getMembers$ = new Subject<OrganizationUnitDto>();
  roles: PagedResultDto<IdentityRoleDto> = {
    items: [],
    totalCount: 0,
  };

  modalVisible: boolean;
  modalBusy: boolean;
  identityUsers: PagedResultDto<IdentityUserDto> = { items: [], totalCount: 0 };
  userAllChecked = false;
  userCheckIndeterminate = false;
  setOfCheckedId = new Set<string>();

  constructor(
    public readonly roleList: ListService<PagedResultRequestDto>,
    public readonly userlist: ListService<GetIdentityUsersInput>,
    private subscription: SubscriptionService,
    private service: OrganizationUnitService,
    private userService: IdentityUserService,
  ) {
    this.initGetMembersStream();
  }

  saveMembers() {
    this.modalBusy = true;
    this.service
      .updateMembers(this.organizationUnit.id, {
        userIds: Array.from(this.setOfCheckedId),
      } as AddMemberDto)
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.modalVisible = false;
        this.getMembers$.next(this.organizationUnit);
      });
  }

  editMembers() {
    this.modalVisible = true;
    this.userlist
      .hookToQuery(query => this.userService.getList(query))
      .subscribe(result => {
        this.identityUsers = result;
        this.setOfCheckedId.clear();
        this.roles.items.forEach(u => this.updateCheckedSet(u.id, true));
        this.refreshUserCheckedStatus();
      });
  }

  onUserQueryParamsChange(params: NzTableQueryParams): void {
    if (this.roleList.page !== params.pageIndex - 1) {
      this.roleList.page = params.pageIndex - 1;
    }
    if (this.roleList.maxResultCount != params.pageSize) {
      this.roleList.maxResultCount = params.pageSize;
    }
  }

  onUserChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshUserCheckedStatus();
  }

  onAllUserChecked(checked: boolean): void {
    this.identityUsers.items.forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshUserCheckedStatus();
  }

  private refreshUserCheckedStatus(): void {
    this.userAllChecked = this.identityUsers.items.every(({ id }) => this.setOfCheckedId.has(id));
    this.userCheckIndeterminate =
      this.identityUsers.items.some(({ id }) => this.setOfCheckedId.has(id)) &&
      !this.userAllChecked;
  }

  private updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  private initGetMembersStream() {
    this.subscription.addOne(this.getMembers$.pipe(debounceTime(0)), value =>
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
        this.roles = result;
      });
  }
}
