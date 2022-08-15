import { IdentityRoleDto, IdentityUserDto } from '@abp/ng.identity/proxy';
import { PropData } from '@abp/ng.theme.shared/extensions';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'abp-role-name-cell',
  templateUrl: './role-name-cell.component.html',
})
export class RoleNameCellComponent implements OnInit {
  @Input() data: PropData<IdentityRoleDto> = { record: {} } as PropData<IdentityRoleDto>;

  ngOnInit(): void {
    console.log(this.data);
  }
}
