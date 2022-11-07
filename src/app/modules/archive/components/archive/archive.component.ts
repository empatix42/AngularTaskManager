import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/modules/core/services/data-storage.service';
import { Board } from 'src/app/modules/shared/models/board.model';
import { Task } from 'src/app/modules/shared/models/task.model';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements OnInit, OnDestroy {
  boardId!: string;
  board!: Board;
  archivedTasks!: Task[] | undefined;
  boardSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.boardId = this.route.snapshot.params['id'];

    this.dataStorageService.getBoard(this.boardId)!;
    this.boardSub = this.dataStorageService.boardChanged.subscribe((board) => {
      this.board = board;
      this.archivedTasks = this.board.tasks?.filter(
        (task) => task.status === 'archived'
      );
    });
  }

  ngOnDestroy(): void {
    this.boardSub.unsubscribe();
  }
}
