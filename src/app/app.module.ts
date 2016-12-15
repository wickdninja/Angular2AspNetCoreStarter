import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found';
import { appRoutes, authGuards } from './app.routes';
import { LoginComponent } from './login';
import { LoaderComponent } from './loader';
import { ToastComponent } from './toast';
import {
  IAuthService,
  AuthService,
  MockAuthService,
  ICookieService,
  CookieService,
  IDialogService,
  DialogService,
  MockDialogService,
  LoaderService,
  IMaterialService,
  MaterialService,
  MockMaterialService,
  MockCookieService,
  ToastService,
} from './shared';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRoutes,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    LoaderComponent,
    ToastComponent
  ],
  providers: [
    authGuards,
    Title,
    { provide: IAuthService, useClass: AuthService },
    { provide: ICookieService, useClass: CookieService },
    { provide: IDialogService, useClass: MockDialogService },
    LoaderService,
    { provide: IMaterialService, useClass: MaterialService },
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

