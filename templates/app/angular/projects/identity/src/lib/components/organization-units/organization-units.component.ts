import { Component, Injector, OnInit } from '@angular/core';
import {
  IdentityRoleDto,
  IdentityUserDto,
  OrganizationUnitDto,
  OrganizationUnitService,
} from '@abp-plus/ng.identity/proxy';
import {
  createTreeFromList,
  ListResultDto,
  ListService,
  PagedResultDto,
  PagedResultRequestDto,
  PermissionService,
} from '@abp/ng.core';
import { FormGroup } from '@angular/forms';
import {
  EXTENSIONS_IDENTIFIER,
  FormPropData,
  generateFormFromProps,
} from '@abp-plus/ng.theme.shared/extensions';
import { eIdentityComponents } from '@abp-plus/ng.identity';
import { finalize } from 'rxjs/operators';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { Confirmation, ConfirmationService } from '@abp-plus/ng.theme.shared';

@Component({
  selector: 'abp-organization-units',
  templateUrl: './organization-units.component.html',
  styleUrls: ['./organization-units.component.scss'],
  providers: [
    ListService,
    {
      provide: EXTENSIONS_IDENTIFIER,
      useValue: eIdentityComponents.OrganizationUnits,
    },
  ],
})
export class OrganizationUnitsComponent implements OnInit {
  treeData: TreeNode[];

  ous: ListResultDto<OrganizationUnitDto>;

  form: FormGroup;

  contextMenuOu: OrganizationUnitDto;

  selected: OrganizationUnitDto;

  isModalVisible: boolean;

  modalBusy = false;

  members: PagedResultDto<IdentityUserDto> = {
    items: [],
    totalCount: 0,
  } as PagedResultDto<IdentityUserDto>;

  roles: PagedResultDto<IdentityRoleDto> = {
    items: [],
    totalCount: 0,
  } as PagedResultDto<IdentityRoleDto>;

  constructor(
    public readonly memberList: ListService<PagedResultRequestDto>,
    public readonly roleList: ListService<PagedResultRequestDto>,
    protected service: OrganizationUnitService,
    protected injector: Injector,
    private nzContextMenuService: NzContextMenuService,
    private confirm: ConfirmationService,
    private permissionService: PermissionService,
  ) {}

  ngOnInit(): void {
    this.hookToQuery();
  }

  buildForm() {
    const data = new FormPropData(this.injector, this.selected);
    this.form = generateFormFromProps(data);
    if (!this.selected.id && this.contextMenuOu.id) {
      this.form.controls['parentId'].setValue(this.contextMenuOu.id);
    }
  }

  private openModal() {
    this.buildForm();
    this.isModalVisible = true;
  }

  delete() {
    this.confirm
      .warn('AbpIdentity::OrganizationUnitDeletionConfirmationMessage', 'AbpIdentity::AreYouSure', {
        messageLocalizationParams: [this.contextMenuOu.displayName],
      })
      .subscribe((status: Confirmation.Status) => {
        if (status === Confirmation.Status.confirm) {
          this.service.delete(this.contextMenuOu.id).subscribe(() => {
            this.hookToQuery();
          });
        }
      });
  }

  addSubUnit() {
    this.selected = {} as OrganizationUnitDto;
    this.openModal();
  }

  addRootUnit() {
    this.contextMenuOu = {} as OrganizationUnitDto;
    this.selected = {} as OrganizationUnitDto;
    this.openModal();
  }

  edit() {
    this.selected = this.contextMenuOu;
    this.openModal();
  }

  save() {
    if (!this.form.valid) return;
    this.modalBusy = true;

    const { id } = this.selected;
    (id
      ? this.service.update(id, { ...this.selected, ...this.form.value })
      : this.service.create(this.form.value)
    )
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.hookToQuery();
        this.isModalVisible = false;
      });
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent, nodeKey: string): void {
    if (!this.permissionService.getGrantedPolicy('AbpIdentity.OrganizationUnits.ManageOU')) {
      return;
    }

    this.contextMenuOu = this.ous.items.filter(ou => ou.id === nodeKey)[0];
    this.nzContextMenuService.create($event, menu);
  }

  onNodeDrop(event: NzFormatEmitEvent): void {
    this.service
      .move(event.dragNode.key, { newParentId: event.node.key })
      .subscribe(() => this.hookToQuery());
  }

  onNodeClick(event: NzFormatEmitEvent): void {
    this.selected = this.ous.items.filter(ou => ou.id === event.node.key)[0];
  }

  hookToQuery() {
    this.service.getAllList().subscribe(res => {
      this.ous = res;
      this.treeData = createTreeFromList(
        res.items,
        i => i.id,
        i => i.parentId,
        i => {
          return {
            title: i.displayName,
            key: i.id,
            expanded: false,
            children: [],
          } as TreeNode;
        },
      );
    });
  }
}

class TreeNode {
  title: string | undefined;
  key: string;
  expanded: boolean;
  children: TreeNode[];
}
