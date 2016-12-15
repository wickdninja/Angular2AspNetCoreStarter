import { Component, OnInit } from '@angular/core';
import { IMaterialService } from '../services';
import { LoaderService } from './loader.service';
import { LoaderModel } from './loader.model';

@Component({
  selector: 'app-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.css']
})
export class LoaderComponent implements OnInit {
  model = new LoaderModel();
  constructor(
    private material: IMaterialService,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    this.loader.isVisible$
      .subscribe(isVisible => {
        this.model.setVisibility(isVisible);
        if (isVisible) {
          this.material.render();
        }
      });

    this.loader.isSuccess$
      .subscribe(message => {
        this.model.success(message);
      });

    this.loader.isError$
      .subscribe(message => {
        this.model.error(message);
      });
  }

  close() {
    this.model.close();
  }

}


