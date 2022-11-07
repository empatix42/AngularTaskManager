import { Component, EventEmitter, OnInit } from '@angular/core';
import { ModalWindowService } from '../../services/modal-window.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css'],
})
export class ModalWindowComponent implements OnInit {
  didCancel = new EventEmitter<boolean>();
  constructor(private modalWindowService: ModalWindowService) {}

  ngOnInit(): void {}

  onCancel() {
    this.modalWindowService.confirmDelete.next(false);
  }
  onDelete() {
    this.modalWindowService.confirmDelete.next(true);
  }
}
