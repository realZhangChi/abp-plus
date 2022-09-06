import { eIdentityComponents } from '@abp-plus/ng.identity';
import {
  GetIdentityUsersInput,
  IdentityUserService,
  OrganizationUnitService,
} from '@abp-plus/ng.identity/proxy';
import { EXTENSIONS_IDENTIFIER } from '@abp-plus/ng.theme.shared/extensions';
import { IdentityUserDto } from '@abp/ng.account.core/proxy';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface MemberDto extends IdentityUserDto {
  selected: boolean;
}

@Component({
  selector: 'abp-add-unit-member-modal',
  templateUrl: './add-unit-member-modal.component.html',
  providers: [
    ListService,
    {
      provide: EXTENSIONS_IDENTIFIER,
      useValue: eIdentityComponents.AddUnitMember,
    },
  ],
})
export class AddUnitMemberModalComponent implements OnInit {
  @Input() userIdAlreadyInUnit: string[] = [];

  data: PagedResultDto<MemberDto> = {
    items: [],
    totalCount: 0,
  };

  @Input()
  get visible() {
    return this._visible;
  }
  set visible(value: boolean) {
    this._visible = value;
    this.visibleChange.emit(value);
  }

  _visible: boolean;

  @Output() readonly visibleChange = new EventEmitter<boolean>();

  constructor(
    public readonly list: ListService<GetIdentityUsersInput>,
    private service: OrganizationUnitService,
    private userService: IdentityUserService,
  ) {}

  ngOnInit(): void {
    this.hookToQuery();
  }

  private hookToQuery() {
    this.list
      .hookToQuery(query => this.userService.getList(query))
      .subscribe(result => {
        const members = result.items.map(user => {
          const member = user as MemberDto;
          if (this.userIdAlreadyInUnit.some(m => m === user.id)) {
            member.selected = true;
          }
          return member;
        });

        this.data = { items: members, totalCount: result.totalCount };
      });
  }
}
