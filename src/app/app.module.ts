import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  IAuthService,
  AuthService,
  MockAuthService,
  ICookieService,
  CookieService,
  LoaderService,
  IMaterialService,
  MaterialService,
  MockMaterialService,
  MockCookieService,
  ToastService
} from './shared';
import { appRoutes, authGuards } from './app.routes';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found';
import { LoginComponent } from './login';
import { LoaderComponent } from './loader';
import { ToastComponent } from './toast';

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
    Title,
    AuthService,
    MockAuthService,
    { provide: IAuthService, useExisting: AuthService },
    authGuards,
    CookieService,
    MockCookieService,
    { provide: ICookieService, useExisting: CookieService },
    LoaderService,
    MaterialService,
    MockMaterialService,
    { provide: IMaterialService, useExisting: MaterialService },
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

