import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { ArchiveItemComponent } from './components/archive-item/archive-item.component';
import { ArchiveComponent } from './components/archive/archive.component';

@NgModule({
  declarations: [ArchiveComponent, ArchiveItemComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', canActivate: [AuthGuard], component: ArchiveComponent },
    ]),
  ],
  exports: [ArchiveComponent, ArchiveItemComponent],
})
export class ArchiveModule {}
