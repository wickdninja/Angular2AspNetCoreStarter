import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { IAuthService } from '../services';

@Injectable()
export class SignoutGuard implements CanActivate {

  constructor(
    private authService: IAuthService
  ) { }

  canActivate() {
    this.authService.logout();
    return false;
  }
}
