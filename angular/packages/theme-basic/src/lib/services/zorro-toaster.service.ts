import { Injectable } from '@angular/core';
import { LocalizationParam, LocalizationService } from '@abp/ng.core';
import { Toaster } from '@abp-plus/ng.theme.shared';
import { NzNotificationRef, NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class ZorroToasterService implements Toaster.Service {
  constructor(
    private nzNotification: NzNotificationService,
    private localizationService: LocalizationService
  ) {}

  /**
   * Creates an info toast with given parameters.
   * @param message Content of the toast
   * @param title Title of the toast
   * @param options Spesific style or structural options for individual toast
   */
  info(
    message: LocalizationParam,
    title?: LocalizationParam,
    options?: Partial<Toaster.ToastOptions>
  ): Toaster.ToasterId {
    return this.show(message, title, 'info', options);
  }

  /**
   * Creates a success toast with given parameters.
   * @param message Content of the toast
   * @param title Title of the toast
   * @param options Spesific style or structural options for individual toast
   */
  success(
    message: LocalizationParam,
    title?: LocalizationParam,
    options?: Partial<Toaster.ToastOptions>
  ): Toaster.ToasterId {
    return this.show(message, title, 'success', options);
  }

  /**
   * Creates a warning toast with given parameters.
   * @param message Content of the toast
   * @param title Title of the toast
   * @param options Spesific style or structural options for individual toast
   */
  warn(
    message: LocalizationParam,
    title?: LocalizationParam,
    options?: Partial<Toaster.ToastOptions>
  ): Toaster.ToasterId {
    return this.show(message, title, 'warning', options);
  }

  /**
   * Creates an error toast with given parameters.
   * @param message Content of the toast
   * @param title Title of the toast
   * @param options Spesific style or structural options for individual toast
   */
  error(
    message: LocalizationParam,
    title?: LocalizationParam,
    options?: Partial<Toaster.ToastOptions>
  ): Toaster.ToasterId {
    return this.show(message, title, 'error', options);
  }

  /**
   * Creates a toast with given parameters.
   * @param message Content of the toast
   * @param title Title of the toast
   * @param severity Sets color of the toast. "success", "warning" etc.
   * @param options Spesific style or structural options for individual toast
   */

  show(
    message: LocalizationParam,
    title: LocalizationParam,
    severity: Toaster.Severity,
    options: Partial<Toaster.ToastOptions>
  ): Toaster.ToasterId {
    let notificationRef: NzNotificationRef;
    let duration = options?.sticky ? 0 : options?.life ? options?.life : 3000;
    switch (severity) {
      case 'success':
        notificationRef = this.nzNotification.success(
          this.localizationService.instant(title, ...(options?.titleLocalizationParams || [])),
          this.localizationService.instant(message, ...(options?.messageLocalizationParams || [])),
          {
            nzDuration: duration,
          }
        );
        break;
      case 'info':
        notificationRef = this.nzNotification.info(
          this.localizationService.instant(title, ...(options?.titleLocalizationParams || [])),
          this.localizationService.instant(message, ...(options?.messageLocalizationParams || [])),
          {
            nzDuration: duration,
          }
        );
        break;
      case 'warning':
        notificationRef = this.nzNotification.warning(
          this.localizationService.instant(title, ...(options?.titleLocalizationParams || [])),
          this.localizationService.instant(message, ...(options?.messageLocalizationParams || [])),
          {
            nzDuration: duration,
          }
        );
        break;
      case 'error':
        notificationRef = this.nzNotification.error(
          this.localizationService.instant(title, ...(options?.titleLocalizationParams || [])),
          this.localizationService.instant(message, ...(options?.messageLocalizationParams || [])),
          {
            nzDuration: duration,
          }
        );
        break;
      default:
        notificationRef = this.nzNotification.blank(
          this.localizationService.instant(title, ...(options?.titleLocalizationParams || [])),
          this.localizationService.instant(message, ...(options?.messageLocalizationParams || [])),
          {
            nzDuration: duration,
          }
        );
    }

    return notificationRef.messageId;
  }

  /**
   * Removes the toast with given id.
   * @param id ID of the toast to be removed.
   */
  remove = id => {
    this.nzNotification.remove(id);
  };

  /**
   * Removes all open toasts at once.
   */
  clear(containerKey?: string): void {
    this.nzNotification.remove();
  }
}
