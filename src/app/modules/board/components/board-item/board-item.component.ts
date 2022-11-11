import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from 'src/app/modules/shared/models/board.model';
import { Task } from 'src/app/modules/shared/models/task.model';
import { DataStorageService } from 'src/app/modules/core/services/data-storage.service';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardItemComponent implements OnInit {
  @Input() task!: Task;
  @Input() board!: Board;
  @Input() tasks!: Task[];
  @Input() listName!: string;
  @Output() creationMode = new EventEmitter<boolean>();
  taskForm!: FormGroup;
  editMode!: boolean;

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
    });
  }

  onSaveTask() {
    if (this.taskForm.value.name) {
      this.task.name = this.taskForm.value.name;
      this.board.tasks = [this.task, ...this.board.tasks!];
      this.dataStorageService.updateBoard(this.board, this.board.id!);
      this.taskForm.reset();
      this.creationMode.emit(false);
    }
  }

  onDeleteTask() {
    this.board.tasks = this.board.tasks?.filter((task) => task !== this.task);
    this.tasks = this.board.tasks!;
    this.dataStorageService.updateBoard(this.board, this.board.id!);
  }

  onEditTask() {
    this.editMode = true;
    this.taskForm.patchValue({
      name: this.task.name,
    });
  }

  onUpdateTask() {
    this.task.name = this.taskForm.value.name;
    this.dataStorageService.updateBoard(this.board, this.board.id!);
    this.editMode = false;
  }

  onArchiveTask() {
    this.task.status = 'archived';
    this.dataStorageService.updateBoard(this.board, this.board.id!);
  }
}
