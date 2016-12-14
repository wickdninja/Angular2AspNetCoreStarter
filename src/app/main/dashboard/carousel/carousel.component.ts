import { Component , HostBinding, OnInit } from '@angular/core';
import { IMaterialService } from '../../../shared';
import { CarouselVm } from './carousel-vm.model';

@Component({
  selector: 'app-carousel',
  styleUrls: ['carousel.component.css'],
  // templateUrl : 'carousel.component.html'
  template: `
    <div style="position: relative;" class="charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid">
  <button (click)="prev()" class="btn prev-btn mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
  <i class="material-icons">keyboard_arrow_left</i>
</button>
  <svg
   [class.active]="model.isBillsDueVisible" fill="currentColor" width="200px" height="200px"
   viewBox="0 0 1 1" class="active chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop">
              <use xlink:href="#piechart" mask="url(#piemask)" />
              <text x="0.5" y="0.25" font-family="Roboto" font-size="0.12"
              fill="#888" text-anchor="middle" dy="0.1">Stat #1</text>
              <text x="0.5" y="0.625" font-family="Roboto" font-size="0.16"
              fill="#888" text-anchor="middle" dy="0.1">
              <tspan font-size="0.12" dy="-0.07">$</tspan>198.99</text>
              <text x="0.5" y="0.58" font-family="Roboto" font-size="0.06"
              fill="#888" text-anchor="middle" dy="0.1">Upating</text>
              <text x="0.5" y="0.64" font-family="Roboto" font-size="0.05"
              fill="#888" text-anchor="middle" dy="0.1">Last Upated 32 hrs ago</text>
            </svg>
  <svg
   [class.active]="model.isCheckingVisible" fill="currentColor" width="200px"
   height="200px" viewBox="0 0 1 1" class="chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop">
              <use xlink:href="#piechart" mask="url(#piemask)" />
              <text x="0.5" y="0.25" font-family="Roboto" font-size="0.12" fill="#888" text-anchor="middle" dy="0.1">Stat #2</text>
              <text x="0.5" y="0.625" font-family="Roboto" font-size="0.16" fill="#888" text-anchor="middle" dy="0.1">
              <tspan font-size="0.12" dy="-0.07">$</tspan>4,217.84</text>
              <text x="0.5" y="0.6" font-family="Roboto" font-size="0.06" fill="#888" text-anchor="middle" dy="0.1">Upated 1 hr ago</text>
            </svg>
  <svg
   [class.active]="model.isSavingsVisible" fill="currentColor" width="200px"
   height="200px" viewBox="0 0 1 1" class="chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop">
              <use xlink:href="#piechart" mask="url(#piemask)" />
              <text x="0.5" y="0.25" font-family="Roboto" font-size="0.12"
              fill="#888" text-anchor="middle" dy="0.1">Stat #3</text>
              <text x="0.5" y="0.625" font-family="Roboto" font-size="0.16"
              fill="#888" text-anchor="middle" dy="0.1">
              <tspan font-size="0.12" dy="-0.07">$</tspan>12,792.31</text>
              <text x="0.5" y="0.6" font-family="Roboto" font-size="0.06"
              fill="#888" text-anchor="middle" dy="0.1">Upated Now</text>
            </svg>
  <svg
  [class.active]="model.isPendingVisible" fill="currentColor" width="200px"
  height="200px" viewBox="0 0 1 1" class="chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop">
              <use xlink:href="#piechart" mask="url(#piemask)" />
              <text x="0.5" y="0.215" font-family="Roboto" font-size="0.12"
              fill="#888" text-anchor="middle" dy="0.1">Stat #4</text>
              <text x="0.5" y="0.290" font-family="Roboto" font-size="0.05"
              fill="#888" text-anchor="middle" dy="0.1">Subheader text here</text>
              <text x="0.5" y="0.625" font-family="Roboto" font-size="0.16"
              fill="#888" text-anchor="middle" dy="0.1">
              <tspan font-size="0.12" dy="-0.07">$</tspan>78.99</text>
              <text x="0.5" y="0.6" font-family="Roboto" font-size="0.06" fill="#888" text-anchor="middle" dy="0.1">Upated 3 min ago</text>
            </svg>
  <button (click)="next()"
  class="btn next-btn mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
  <i class="material-icons">keyboard_arrow_right</i>
</button>
</div>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
version="1.1" style="position: fixed; left: -1000px; height: -1000px;">
        <defs>
          <mask id="piemask" maskContentUnits="objectBoundingBox">
            <circle cx=0.5 cy=0.5 r=0.49 fill="white" />
            <circle cx=0.5 cy=0.5 r=0.40 fill="black" />
          </mask>
          <g id="piechart">
            <circle cx=0.5 cy=0.5 r=0.5 />
          </g>
        </defs>
      </svg>
    `
})

export class CarouselComponent implements OnInit {
  // todo: test host binding
  @HostBinding('class') class = 'mdl-cell mdl-cell--12-col';
  model = new CarouselVm();

  constructor(
    private material: IMaterialService
  ) { }

  ngOnInit() {
    console.log('carousel component loaded');
    this.material.render();
  }

  prev() {
    this.model.prev();
  }

  next() {
    this.model.next();
  }
}
