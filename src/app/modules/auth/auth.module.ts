import { NgModule } from '@angular/core';
import { AuthComponent } from './components/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SignupGuard } from './guards/signup.guard';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', canActivate: [SignupGuard], component: AuthComponent },
    ]),
  ],
  exports: [AuthComponent],
})
export class AuthModule {}
