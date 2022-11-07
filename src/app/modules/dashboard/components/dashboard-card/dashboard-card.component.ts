import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from 'src/app/modules/shared/models/board.model';
import { DataStorageService } from 'src/app/modules/core/services/data-storage.service';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCardComponent implements OnInit {
  @Input() board!: Board;
  @Input() boards!: Board[];
  error!: string | null;
  boardForm!: FormGroup;
  editMode!: boolean;
  todoAmount!: number;
  inProgressAmount!: number;
  doneAmount!: number;

  constructor(
    private dataStorageService: DataStorageService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.boardForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
      description: new FormControl('', Validators.maxLength(70)),
    });
    this.todoAmount =
      this.board.tasks?.filter((task) => task.status === 'todo').length! | 0;
    this.inProgressAmount =
      this.board.tasks?.filter((task) => task.status === 'inProgress').length! |
      0;
    this.doneAmount =
      this.board.tasks?.filter((task) => task.status === 'done').length! | 0;
  }

  onSaveBoard() {
    if (this.boardForm.value.name) {
      this.board.name = this.boardForm.value.name;
      this.board.description = this.boardForm.value.description;
      this.dataStorageService.storeBoard(this.board).subscribe({
        next: () => {
          this.dataStorageService.getAllBoards();
        },
        error: (error) => {
          this.error = error.error.error;
          this.changeDetector.detectChanges();
        },
      });
      this.dataStorageService.boards = this.boards;
    }
  }

  onEditBoard() {
    this.editMode = true;
    this.boardForm.patchValue({
      name: this.board.name,
      description: this.board.description,
    });
  }

  onUpdateBoard() {
    if (this.boardForm.value.name) {
      this.board.name = this.boardForm.value.name;
      this.dataStorageService.updateBoard(this.board, this.board.id!);
      this.dataStorageService.boards = this.boards;
      this.editMode = false;
    }
  }

  onDeleteBoard() {
    this.dataStorageService.deleteBoard(this.board.id!);
    this.boards = this.boards.filter((board) => board.id !== this.board.id);
    this.dataStorageService.boardsChanged.next(this.boards);
  }

  dismissErrorAlert() {
    this.dataStorageService.getAllBoards();
    this.error = null;
  }
}
