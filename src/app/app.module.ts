import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found';
import { appRoutes, authProviders } from './app.routes';
import { LoginComponent } from './login';
import {
  LoaderComponent,
  LoaderService,
  ToastComponent,
  ToastService,
  IMaterialService,
  MaterialService,
  MockMaterialService,
  ICookieService,
  CookieService,
  MockCookieService,
  IAuthService,
  MockAuthService,
  AuthService
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
    Title,
    AuthService,
    MockAuthService,
    { provide: IAuthService, useExisting: AuthService },
    authProviders,
    LoaderService,
    ToastService,
    MaterialService,
    MockMaterialService,
    { provide: IMaterialService, useExisting: MaterialService },
    CookieService,
    MockCookieService,
    { provide: ICookieService, useExisting: CookieService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

