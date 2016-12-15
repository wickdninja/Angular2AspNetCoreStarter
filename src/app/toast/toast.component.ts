import { Component, OnInit } from '@angular/core';
import { ToastVm } from './toast-vm.model';
import { ToastService } from '../shared';

@Component({
  selector: 'app-toast',
  templateUrl: 'toast.component.html',
  styleUrls: ['toast.component.css']
})

export class ToastComponent implements OnInit {
  model: ToastVm;
  constructor(
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.toast.messages$.subscribe(this.show);
  }

  show(message: string) {
    this.model = document.querySelector('#app-toast') as ToastVm;
    this.model.MaterialSnackbar.showSnackbar({ message: message });

  }

}
