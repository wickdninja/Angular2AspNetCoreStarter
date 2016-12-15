import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { NotFoundComponent } from './not-found';
import { AuthGuard, SignoutGuard } from './shared/guards';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', loadChildren: 'app/main/main.module#MainModule' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

export const appRoutes = RouterModule.forRoot(routes);

export const authGuards = [AuthGuard, SignoutGuard];
