import { Component, Injector, OnInit } from '@angular/core';
import { OrganizationUnitDto, OrganizationUnitService } from '@abp-plus/ng.identity/proxy';
import { createTreeFromList, ListResultDto } from '@abp/ng.core';
import { FormGroup } from '@angular/forms';
import {
  EXTENSIONS_IDENTIFIER,
  FormPropData,
  generateFormFromProps,
} from '@abp-plus/ng.theme.shared/extensions';
import { eIdentityComponents } from '@abp-plus/ng.identity';
import { finalize } from 'rxjs/operators';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'abp-organization-units',
  templateUrl: './organization-units.component.html',
  styleUrls: ['./organization-units.component.scss'],
  providers: [
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

  constructor(
    protected service: OrganizationUnitService,
    protected injector: Injector,
    private nzContextMenuService: NzContextMenuService,
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
    this.contextMenuOu = this.ous.items.filter(ou => ou.id === nodeKey)[0];
    this.nzContextMenuService.create($event, menu);
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
