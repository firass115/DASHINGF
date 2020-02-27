import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapSelectDirective } from '../../directives/bootstrap-select.directive';

@NgModule({
  declarations: [BootstrapSelectDirective],
  imports: [CommonModule],
  exports: [BootstrapSelectDirective]
})
export class BootstrapSelectModule {}
