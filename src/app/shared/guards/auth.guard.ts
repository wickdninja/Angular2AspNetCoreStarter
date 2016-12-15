import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { IAuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: IAuthService
  ) { }

  canActivate() {
    if (this.authService.isAuthenticated) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
