import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from 'src/app/modules/auth/services/auth-interceptor.service';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [HeaderComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  imports: [SharedModule, AppRoutingModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
