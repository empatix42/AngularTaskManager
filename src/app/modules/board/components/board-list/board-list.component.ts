import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Board } from 'src/app/modules/shared/models/board.model';
import { Task } from 'src/app/modules/shared/models/task.model';
import { DataStorageService } from 'src/app/modules/core/services/data-storage.service';
import { ToolbarService } from 'src/app/modules/shared/services/toolbar.service';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css'],
})
export class BoardListComponent implements OnInit, OnDestroy {
  @Input() tasks!: Task[];
  @Input() listName!: string;
  @Input() board!: Board;
  taskForm!: FormGroup;
  filterValue!: string;
  sortOrder!: string;
  sortValue!: string;
  listColor: string = 'green';
  private filterSub!: Subscription;
  private sortSub!: Subscription;
  private orderSub!: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private boardService: BoardService,
    private renderer: Renderer2,
    private toolbarService: ToolbarService
  ) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
    });

    this.filterSub = this.toolbarService.filterValue.subscribe((value) => {
      this.filterValue = value;
    });

    this.sortSub = this.toolbarService.selectedSortKey.subscribe((key) => {
      this.sortValue = key;
    });

    this.orderSub = this.toolbarService.selectedSortOrder.subscribe(
      (order) => (this.sortOrder = order)
    );

    switch (this.listName) {
      case 'Todo':
        this.listColor = localStorage.getItem('todoColor')!;
        break;
      case 'In Progress':
        this.listColor = localStorage.getItem('progressColor')!;
        break;
      case 'Done':
        this.listColor = localStorage.getItem('doneColor')!;
        break;
    }
  }
  addNewTask() {
    this.tasks.unshift(new Task('', 'todo', new Date()));
  }

  dragStart(e: DragEvent, task: Task) {
    const taskIndex = this.board.tasks?.indexOf(task).toString()!;
    e.dataTransfer?.setData('text', taskIndex);
    this.renderer.addClass(e.target, 'dragged');
  }

  dragDrop(e: DragEvent) {
    const taskIndex = e.dataTransfer?.getData('text')!;
    const task = this.board.tasks![+taskIndex];
    const draggedItem = document.querySelector('.dragged')!;

    switch (this.listName) {
      case 'Done':
        if (task.status !== 'done') {
          task.status = 'done';
          draggedItem.classList.add('hidden');
        }
        break;
      case 'In Progress':
        if (task.status !== 'inProgress') {
          task.status = 'inProgress';
          draggedItem.classList.add('hidden');
        }
        break;
      case 'Todo':
        if (task.status !== 'todo') {
          task.status = 'todo';
          draggedItem.classList.add('hidden');
        }
        break;
    }

    this.dataStorageService.updateBoard(this.board, this.board.id!);

    this.tasks = this.boardService.getTasksByStatus(
      this.board.tasks!,
      task.status
    );
  }

  dragEnd(e: DragEvent) {
    this.renderer.removeClass(e.target, 'dragged');
  }

  onSetColor(color: string) {
    this.listColor = color;

    switch (this.listName) {
      case 'Todo':
        localStorage.setItem('todoColor', color);
        break;
      case 'In Progress':
        localStorage.setItem('progressColor', color);
        break;
      case 'Done':
        localStorage.setItem('doneColor', color);
        break;
    }
  }

  ngOnDestroy() {
    this.filterSub.unsubscribe();
    this.sortSub.unsubscribe();
    this.orderSub.unsubscribe();
  }
}
