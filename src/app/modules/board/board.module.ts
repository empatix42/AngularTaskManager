import { NgModule } from '@angular/core';
import { BoardComponent } from './components/board/board.component';
import { SharedModule } from '../shared/shared.module';
import { BoardListComponent } from './components/board-list/board-list.component';
import { BoardItemComponent } from './components/board-item/board-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BoardGuard } from './guards/board.guard';

@NgModule({
  declarations: [BoardComponent, BoardListComponent, BoardItemComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [AuthGuard, BoardGuard],
        component: BoardComponent,
      },
      {
        path: 'archive',
        canActivate: [AuthGuard, BoardGuard],
        loadChildren: () =>
          import('../archive/archive.module').then((m) => m.ArchiveModule),
      },
    ]),
  ],
  exports: [BoardComponent, BoardListComponent, BoardItemComponent],
})
export class BoardModule {}
