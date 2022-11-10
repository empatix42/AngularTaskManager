import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Board } from '../../../shared/models/board.model';
import { Task } from '../../../shared/models/task.model';
import { DataStorageService } from '../../../core/services/data-storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, OnDestroy {
  id!: string;
  board!: Board;
  boardTitle!: string;
  newTasks!: Task[];
  tasksInProgress!: Task[];
  tasksDone!: Task[];
  error!: string | null;
  private routeSub!: Subscription;
  private errorSub!: Subscription;
  private boardsSub!: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    this.errorSub = this.dataStorageService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });

    this.dataStorageService.getAllBoards();
    this.boardsSub = this.dataStorageService.boardsChanged.subscribe({
      next: (boards) => {
        this.board = boards.find((board) => board.id === this.id)!;
        this.boardTitle = this.board.name!;

        if (!this.board.tasks) this.board.tasks = [];

        this.newTasks = this.board.tasks.filter(
          (task) => task.status === 'todo'
        )!;
        this.tasksInProgress = this.board.tasks.filter(
          (task) => task.status === 'inProgress'
        )!;
        this.tasksDone = this.board.tasks.filter(
          (task) => task.status === 'done'
        )!;
      },
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.boardsSub.unsubscribe();
    this.errorSub.unsubscribe();
  }
}
