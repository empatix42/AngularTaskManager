import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../../core/services/data-storage.service';
import { ModalWindowService } from '../../services/modal-window.service';

import { ToolbarService } from '../../services/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Input() id!: string;
  @Input() title!: string;
  modalWindowSub!: Subscription;
  openModal!: boolean;

  constructor(
    private toolbarService: ToolbarService,
    private modalWindowService: ModalWindowService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.modalWindowSub = this.modalWindowService.confirmDelete.subscribe(
      (boolean) => {
        if (!boolean) {
          this.openModal = boolean;
        } else {
          this.dataStorageService.deleteBoard(this.id!);
          this.router.navigate(['/dashboard']);
        }
      }
    );

  }

  onSelectedOrder(orderValue: string) {
    this.toolbarService.selectedSortOrder.next(orderValue);
  }

  onSelectedKey(sortValue: string) {
    this.toolbarService.selectedSortKey.next(sortValue);
  }

  onUpdateFilterValue(e: Event) {
    this.toolbarService.filterValue.next((<HTMLInputElement>e.target).value);
  }

  onPressDelete() {
    this.openModal = true;
  }

  ngOnDestroy(): void {
    this.modalWindowSub.unsubscribe();
  }
}
