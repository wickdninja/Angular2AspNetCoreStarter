import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { User } from '../models';
import { Credentials } from '../models';
import { API } from '../constants';
import { ICookieService } from './cookie.service';

const USER = 'user';

@Injectable()
export class IAuthService {
  get user(): User { return null; }
  get isAuthenticated(): boolean { return null; }
  login(credentials: Credentials): Observable<boolean> { return null; }
  logout(): void { }
  validate(res: Response): boolean { return null; }
}

@Injectable()
export class MockAuthService implements IAuthService {
  private _user: User;

  get user(): User { return this._user; }

  get isAuthenticated(): boolean {
    return true;
  }
  login(credentials: Credentials): Observable<boolean> {
    return Observable.of(true);
  }
  logout(): void { }
  validate(res: Response): boolean { return false; }
}

@Injectable()
export class AuthService implements IAuthService {
  private _user: User = null;

  constructor(
    private http: Http,
    private router: Router,
    private cookies: ICookieService
  ) { }

  get user(): User {
    if (this._user === null) {
      let user = this.cookies.getObject(USER) as User;
      this._user = user;
    }
    return this._user;
  }


  login(credentials: Credentials): Observable<boolean> {
    return this.http.post(`${API}/auth/login`, credentials)
      .map(res => {
        let user = res.json();
        this._user = (user) ? user : null;
        this.cookies.setObject(USER, this._user);
        this.router.navigate(['']);
        return this._user !== null;
      })
      .catch(err => {
        return Observable.of(false);
      });
  }

  logout(): void {
    this._user = null;
    this.cookies.deleteAll();
    this.router.navigate(['/login']);
    this.http.get(`${API}/auth/logout`).subscribe(() => { });

  }

  get isAuthenticated(): boolean {
    return this.user !== null;
  }

  validate(response: Response): boolean {
    let unauthorized = response.status === 401 || response.status === 302 || response.text === undefined;
    if (unauthorized) {
      this.logout();
      return true;
    }
    return false;
  }
}
