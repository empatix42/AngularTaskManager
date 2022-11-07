import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    LoadingSpinnerComponent,
    ErrorAlertComponent,
    FilterPipe,
    SortPipe,
    ModalWindowComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    CommonModule,
    ToolbarComponent,
    LoadingSpinnerComponent,
    ErrorAlertComponent,
    FilterPipe,
    SortPipe,
    ModalWindowComponent,
  ],
})
export class SharedModule {}
