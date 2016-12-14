import { LoginVm } from '../../login';

export class Credentials {

  public username: string;
  public password: string;

  constructor(model?: LoginVm) {
    this.username = (model) ? model.username : null;
    this.password = (model) ? model.password : null;
  }

}
