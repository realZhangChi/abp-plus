import { BaseUiExtensionsModule } from '@abp-plus/ng.theme.shared/extensions';
import { NgModule } from '@angular/core';

@NgModule({
  exports: [BaseUiExtensionsModule],
  imports: [BaseUiExtensionsModule],
})
export class UiExtensionsTestingModule {}
