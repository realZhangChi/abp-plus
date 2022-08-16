import { SubscriptionService, uuid } from '@abp/ng.core';
import {
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { Confirmation } from '../../models/confirmation';
import { ConfirmationService } from '../../services/confirmation.service';
import { SUPPRESS_UNSAVED_CHANGES_WARNING } from '../../tokens/suppress-unsaved-changes-warning.token';
import { ButtonComponent } from '../button/button.component';
import { DismissableModal, ModalDismissMode, ModalRefService } from './modal-ref.service';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'abp-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [SubscriptionService],
})
export class ModalComponent implements OnInit, OnDestroy, DismissableModal {
  @Input()
  get visible(): boolean {
    return this._visible;
  }
  set visible(value: boolean) {
    if (typeof value !== 'boolean') return;
    this.toggle$.next(value);
  }

  @Input()
  get busy(): boolean {
    return this._busy;
  }
  set busy(value: boolean) {
    if (this.abpSubmit && this.abpSubmit instanceof ButtonComponent) {
      this.abpSubmit.loading = value;
    }

    this._busy = value;
  }

  @Input() options: NgbModalOptions = {};

  @Input() suppressUnsavedChangesWarning = this.suppressUnsavedChangesWarningToken;

  @ViewChild('modalContent') modalContent?: TemplateRef<any>;

  @ContentChild('abpHeader', { static: false }) abpHeader?: TemplateRef<any>;

  @ContentChild('abpBody', { static: false }) abpBody?: TemplateRef<any>;

  @ContentChild('abpFooter', { static: false }) abpFooter?: TemplateRef<any>;

  @ContentChild(ButtonComponent, { static: false, read: ButtonComponent })
  abpSubmit?: ButtonComponent;

  @ViewChild('nzModalTitle') nzModalTitle: TemplateRef<any>;

  @ViewChild('nzModalContent') nzModalContent: TemplateRef<any>;

  @ViewChild('nzModalFooter') nzModalFooter: TemplateRef<any>;

  @Output() readonly visibleChange = new EventEmitter<boolean>();

  @Output() readonly init = new EventEmitter<void>();

  @Output() readonly appear = new EventEmitter<void>();

  @Output() readonly disappear = new EventEmitter<void>();

  _visible = false;

  _busy = false;

  modalRef!: NgbModalRef;

  nzModalRef!: NzModalRef;

  isConfirmationOpen = false;

  destroy$ = new Subject<void>();

  modalIdentifier = `modal-${uuid()}`;

  private toggle$ = new Subject<boolean>();

  get modalWindowRef() {
    return document.querySelector(`nz-modal-container.${this.modalIdentifier}`);
  }

  get isFormDirty(): boolean {
    return Boolean(this.modalWindowRef?.querySelector('.ng-dirty'));
  }

  constructor(
    private confirmationService: ConfirmationService,
    private subscription: SubscriptionService,
    @Optional()
    @Inject(SUPPRESS_UNSAVED_CHANGES_WARNING)
    private suppressUnsavedChangesWarningToken: boolean,
    private modal: NgbModal,
    private modalRefService: ModalRefService,
    private nzModal: NzModalService,
  ) {
    this.initToggleStream();
  }
  ngOnInit(): void {
    this.modalRefService.register(this);
  }

  dismiss(mode: ModalDismissMode) {
    switch (mode) {
      case 'hard':
        this.visible = false;
        break;
      case 'soft':
        this.close();
        break;
      default:
        break;
    }
  }

  private initToggleStream() {
    this.subscription.addOne(this.toggle$.pipe(debounceTime(0), distinctUntilChanged()), value =>
      this.toggle(value),
    );
  }

  private toggle(value: boolean) {
    this._visible = value;
    this.visibleChange.emit(value);

    if (!value) {
      this.nzModalRef?.close();
      this.disappear.emit();
      this.destroy$.next();
      return;
    }

    setTimeout(() => this.listen(), 0);
    this.nzModalRef = this.nzModal.create({
      nzTitle: this.nzModalTitle,
      nzContent: this.nzModalContent,
      nzFooter: this.nzModalFooter,
      nzWrapClassName: this.modalIdentifier,
      nzWidth: this.getNzModalWidth(this.options.size),
      nzOnCancel: () => {
        return this.nzModalCloseable$.toPromise();
      },
    });
    this.appear.emit();
  }

  private getNzModalWidth(size?: string) {
    switch (size) {
      case 'sm':
        return 300;
      case 'lg':
        return 800;
      case 'xl':
        return 1140;
      case 'md':
      default:
        return 520;
    }
  }

  ngOnDestroy(): void {
    this.modalRefService.unregister(this);
    this.toggle(false);
    this.destroy$.next();
  }

  get nzModalCloseable$(): Observable<boolean> {
    return new Observable(subscriber => {
      if (this.busy) {
        subscriber.next(false);
        return;
      }

      if (this.isFormDirty && !this.suppressUnsavedChangesWarning) {
        if (this.isConfirmationOpen) {
          subscriber.next(false);
          return;
        }

        this.isConfirmationOpen = true;
        this.confirmationService
          .warn('AbpUi::AreYouSureYouWantToCancelEditingWarningMessage', 'AbpUi::AreYouSure', {
            dismissible: false,
          })
          .subscribe((status: Confirmation.Status) => {
            this.isConfirmationOpen = false;
            if (status === Confirmation.Status.confirm) {
              this.visible = false;
              subscriber.complete();
            } else {
              subscriber.next(false);
              subscriber.complete();
            }
          });
      } else {
        this.visible = false;
        subscriber.complete();
      }
    });
  }

  close() {
    this.nzModalCloseable$.subscribe(closeable => {
      if (closeable) {
        this.visible = false;
      }
    });
  }

  listen() {
    if (this.modalWindowRef) {
      fromEvent<KeyboardEvent>(this.modalWindowRef, 'keyup')
        .pipe(
          takeUntil(this.destroy$),
          debounceTime(150),
          filter((key: KeyboardEvent) => key && key.key === 'Escape'),
        )
        .subscribe(() => this.close());
    }

    fromEvent(window, 'beforeunload')
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        // TODO: check this
        if (!this.isFormDirty || this.suppressUnsavedChangesWarning) {
          event.preventDefault();
        }
      });

    this.init.emit();
  }
}
