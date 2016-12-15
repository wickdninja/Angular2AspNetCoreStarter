import { Component, OnInit } from '@angular/core';
import { IMaterialService, IPingService } from '../shared';


@Component({
  styleUrls: ['main.style.css'],
  templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit {
  constructor(
    private materialService: IMaterialService,
    private pingService: IPingService
  ) { }

  ngOnInit() {
    console.log('main component loaded');
    this.materialService.render();
  }

  ping() {
    this.pingService.ping()
      .subscribe(pong => {
        console.log(pong);
      });
  }

  pingAnonymous() {
    this.pingService.pingAnonymous()
      .subscribe(pong => {
        console.log(pong);
      });
  }
}
