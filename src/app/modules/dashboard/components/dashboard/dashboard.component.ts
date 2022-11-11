import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { Board } from '../../../shared/models/board.model';
import { DataStorageService } from '../../../core/services/data-storage.service';
import { ToolbarService } from '../../../shared/services/toolbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  board!: Board;
  boards!: Board[];
  urlPath!: string;
  isAuthenticated!: boolean;
  error!: string | null;
  filterValue!: string;
  sortOrder!: string;
  sortValue!: string;
  isCreationMode!: boolean;
  private boardsSub!: Subscription;
  private errorSub!: Subscription;
  private userSub!: Subscription;
  private filterSub!: Subscription;
  private sortSub!: Subscription;
  private orderSub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private toolbarService: ToolbarService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });

    if (this.isAuthenticated) {
      this.dataStorageService.getAllBoards();
      this.boardsSub = this.dataStorageService.boardsChanged.subscribe({
        next: (boards) => {
          this.boards = boards;
        },
      });
    }

    this.errorSub = this.dataStorageService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
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

    this.urlPath = this.route.snapshot.url[0].path;
  }

  createBoard(): void {
    this.board = new Board('', '', new Date(), []);
    this.boards.unshift(this.board);
    this.isCreationMode = true;
  }

  navigateToAuth(): void {
    this.router.navigate(['auth']);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    if (this.isAuthenticated) {
      this.boardsSub.unsubscribe();
    }
    this.errorSub.unsubscribe();
    this.filterSub.unsubscribe();
    this.sortSub.unsubscribe();
    this.orderSub.unsubscribe();
  }
}
