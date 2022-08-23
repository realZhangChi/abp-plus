import {
  LocalizationParam,
  LocalizationService,
} from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { Confirmation } from '../models/confirmation';

@Injectable({ providedIn: 'root' })
export class ConfirmationService {
  status$!: Subject<Confirmation.Status>;

  private nzModalRef: NzModalRef;

  clear = (status: Confirmation.Status = Confirmation.Status.dismiss) => {
    this.status$.next(status);
  };

  constructor(
    private nzModalService: NzModalService,
    private l: LocalizationService
  ) {}

  info(
    message: LocalizationParam,
    title: LocalizationParam,
    options?: Partial<Confirmation.Options>
  ): Observable<Confirmation.Status> {
    return this.show(message, title, 'info', options);
  }

  success(
    message: LocalizationParam,
    title: LocalizationParam,
    options?: Partial<Confirmation.Options>
  ): Observable<Confirmation.Status> {
    return this.show(message, title, 'success', options);
  }

  warn(
    message: LocalizationParam,
    title: LocalizationParam,
    options?: Partial<Confirmation.Options>
  ): Observable<Confirmation.Status> {
    return this.show(message, title, 'warning', options);
  }

  error(
    message: LocalizationParam,
    title: LocalizationParam,
    options?: Partial<Confirmation.Options>
  ): Observable<Confirmation.Status> {
    return this.show(message, title, 'error', options);
  }

  show(
    message: LocalizationParam,
    title: LocalizationParam,
    severity?: Confirmation.Severity,
    options = {} as Partial<Confirmation.Options>
  ): Observable<Confirmation.Status> {
    let nzOkDanger = false;
    let nzIconType = 'question-circle';
    switch (severity) {
      case 'error':
        nzOkDanger = true;
        nzIconType = 'close-circle';
        break;
      case 'warning':
        nzOkDanger = true;
        nzIconType = 'exclamation-circle';
        break;
      case 'success':
        nzIconType = 'check-circle';
        break;
      case 'info':
      default:
        break;
    }

    this.nzModalRef = this.nzModalService.confirm({
      nzTitle: this.l.instant(title, ...(options.titleLocalizationParams || [])),
      nzContent: this.l.instant(message, ...(options.messageLocalizationParams || [])),
      nzClosable: options.dismissible ?? true,
      nzOnOk: () => this.clear(Confirmation.Status.confirm),
      nzOnCancel: () => this.clear(Confirmation.Status.dismiss),
      nzOkText: this.l.instant('AbpUi::Yes'),
      nzCancelText: this.l.instant('AbpUi::Cancel'),
      nzOkDanger: nzOkDanger,
      nzIconType: nzIconType,
    });

    this.status$ = new Subject();
    const { dismissible = true } = options;
    if (dismissible) this.listenToEscape();

    return this.status$;
  }

  private listenToEscape() {
    fromEvent<KeyboardEvent>(document, 'keyup')
      .pipe(
        takeUntil(this.status$),
        debounceTime(150),
        filter((key: KeyboardEvent) => key && key.key === 'Escape')
      )
      .subscribe(() => {
        this.nzModalRef?.close();
      });
  }
}
