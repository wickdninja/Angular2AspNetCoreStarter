import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Pong } from '../models';
import { API } from '../constants';
import { IAuthService } from './auth.service';
import { LoaderService } from './loader.service';

@Injectable()
export class IPingService {
  ping(): Observable<Pong> { return null }
  pingAnonymous(): Observable<Pong> { return null }
}


@Injectable()
export class PingService {

  constructor(
    private http: Http,
    private authService: IAuthService,
    private loader: LoaderService
  ) {
  }

  ping(): Observable<Pong> {
    return this.http.get(`${API}/ping`)
      .map(response => {
        let pong = response.json() as Pong;
        return pong;
      })
      .catch(error => {
        this.authService.validate(error);
        let message = this.parseError(error);
        this.loader.error(message);
        return Observable.throw(error);
      });
  }
  pingAnonymous(): Observable<Pong> {
    return this.http.get(`${API}/ping/anonymous`)
      .map(response => {
        let pong = response.json() as Pong;
        return pong;
      })
      .catch(error => {
        this.authService.validate(error);
        let message = this.parseError(error);
        this.loader.error(message);
        return Observable.throw(error);
      });
  }

  private parseError(error: any): string {
    return (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  }
}


@Injectable()
export class MockPingService {

  constructor(
    private authService: IAuthService
  ) { }

  ping(): Observable<Pong> {
    return (this.authService.isAuthenticated) ? Observable.of(new Pong("MockPong")) : Observable.throw("Unauthorized!");
  }
  pingAnonymous(): Observable<Pong> {
    return Observable.of(new Pong("MockPong"));
  }
}
