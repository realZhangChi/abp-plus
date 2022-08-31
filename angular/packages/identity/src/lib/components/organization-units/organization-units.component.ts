import { Component, OnInit } from '@angular/core';
import { OrganizationUnitDto, OrganizationUnitService } from '@abp-plus/ng.identity/proxy';
import { createTreeFromList, ListResultDto } from '@abp/ng.core';
@Component({
  selector: 'abp-organization-units',
  templateUrl: './organization-units.component.html',
})
export class OrganizationUnitsComponent implements OnInit {
  treeData: any;
  ous: ListResultDto<OrganizationUnitDto>;
  constructor(protected ouService: OrganizationUnitService) {}

  ngOnInit(): void {
    this.ouService.getAllList().subscribe(res => {
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
          };
        },
      );

      console.log(this.treeData);
    });
  }
}
