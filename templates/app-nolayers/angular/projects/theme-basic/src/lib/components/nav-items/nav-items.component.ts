import { NavItem, NavItemsService } from '@abp-plus/ng.theme.shared';
import { Component, Input, TrackByFunction } from '@angular/core';

@Component({
  selector: 'abp-nav-items',
  templateUrl: 'nav-items.component.html',
})
export class NavItemsComponent {
  trackByFn: TrackByFunction<NavItem> = (_, element) => element.id;

  constructor(public readonly navItems: NavItemsService) {}
}
