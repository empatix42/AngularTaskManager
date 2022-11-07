import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../shared/models/user.model';
import { Board } from '../../shared/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  error = new Subject<string>();
  boardsChanged = new Subject<Board[]>();
  boardChanged = new Subject<Board>();
  boards!: Board[];
  user!: User;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getUser() {
    this.user = this.authService.user.value!;
  }

  storeBoard(board: Board) {
    this.getUser();
    return this.http.post<{ name: string }>(
      `https://angular-task-manager-c64f2-default-rtdb.firebaseio.com/${this.user.id}/boards.json`,
      board
    );
  }

  updateBoard(board: Board, boardId: string) {
    this.getUser();
    this.http
      .patch(
        `https://angular-task-manager-c64f2-default-rtdb.firebaseio.com/${this.user.id}/boards/${boardId}.json`,
        { ...board }
      )
      .subscribe({
        next: () => {
          this.boardsChanged.next(this.boards);
          localStorage.setItem('boards', JSON.stringify(this.boards));
        },
        error: (error) => {
          this.error.next(`An error occured! ${error.error.error}`);
        },
      });
  }

  deleteBoard(boardId: string) {
    this.getUser();
    this.http
      .delete(
        `https://angular-task-manager-c64f2-default-rtdb.firebaseio.com/${this.user.id}/boards/${boardId}.json`
      )
      .subscribe({
        next: () => {
          this.boards = this.boards.filter((board) => board.id !== boardId);
          this.boardsChanged.next(this.boards);
          localStorage.setItem('boards', JSON.stringify(this.boards));
        },
        error: (error) => {
          this.error.next(`An error occured! ${error.error.error}`);
        },
      });
  }

  getBoard(boardId: string) {
    this.getUser();
    this.http
      .get(
        `https://angular-task-manager-c64f2-default-rtdb.firebaseio.com/${this.user.id}/boards/${boardId}.json`
      )
      .subscribe({
        next: (board) => {
          this.boardChanged.next(board);
        },
        error: (error) => {
          this.error.next(`An error occured! ${error.error.error}`);
        },
      });
  }

  getAllBoards() {
    this.getUser();
    this.http
      .get<Board[]>(
        `https://angular-task-manager-c64f2-default-rtdb.firebaseio.com/${this.user.id}/boards.json`
      )
      .pipe(
        map((resData) => {
          const boardsArr = [];
          for (const key in resData) {
            boardsArr.push({ ...resData[key as keyof Object], id: key });
          }
          return boardsArr;
        })
      )
      .subscribe({
        next: (boards) => {
          this.boards = boards!;
          this.boardsChanged.next(this.boards.reverse());
          localStorage.setItem('boards', JSON.stringify(this.boards));
        },
        error: (error) => {
          this.error.next(`An error occured! ${error.error.error}`);
        },
      });
  }
}
