import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginVm } from './login-vm.model';
import { Credentials } from '../shared';
import { LoaderService } from '../shared/loader';
import { IAuthService, IMaterialService } from '../shared/services';

const errorMessage =
  `401 Unauthorized!\nUser may not have required permissions.\nUsername or password may be incorrect.`;

@Component({
  selector: 'app-login',
  styleUrls: ['login.component.css'],
  templateUrl: 'login.component.html',
})

export class LoginComponent implements OnInit {
  model = new LoginVm();
  constructor(
    private titleService: Title,
    private loader: LoaderService,
    private authService: IAuthService,
    private materialService: IMaterialService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Login');
    this.materialService.render();
  }

  onSubmit() {
    this.loader.show();
    let dto = new Credentials(this.model);
    this.authService.login(dto)
      .subscribe(isAuthorized => {
        return isAuthorized ?
          this.loader.success(`Welcome ${this.model.username}`)
          : this.loader.error(errorMessage);
      });
  }
}

