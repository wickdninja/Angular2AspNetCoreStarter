import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../main';
import { DashboardComponent } from './dashboard';
import { SignoutComponent } from './signout';
import { AuthGuard, SignoutGuard } from '../shared';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', redirectTo: '' },
    ]
  },
  { path: 'signout', component: SignoutComponent, canActivate: [SignoutGuard] }
];

export const mainRoutes = RouterModule.forChild(routes);


