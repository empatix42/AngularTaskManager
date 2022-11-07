import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, DashboardCardComponent],
  imports: [SharedModule, AppRoutingModule, ReactiveFormsModule],
  exports: [DashboardComponent, DashboardCardComponent],
})
export class DashboardModule {}
