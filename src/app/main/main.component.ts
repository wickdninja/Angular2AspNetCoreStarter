import { Component, OnInit } from '@angular/core';
import {IMaterialService} from '../shared';


@Component({
  styleUrls: ['main.style.css'],
  templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit {
  constructor(
    private materialService: IMaterialService
  ) {}

  ngOnInit() {
    console.log('main component loaded');
    this.materialService.render();
  }
}
