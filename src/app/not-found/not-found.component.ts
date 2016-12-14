import { Component } from '@angular/core';
const min = 200;
const max = 300;

@Component({
  styleUrls: [`not-found.component.css`],
  templateUrl: 'not-found.component.html'
})

export class NotFoundComponent {
  w1: Number;
  h1: Number;
  w2: Number;
  h2: Number;
  w3: Number;
  h3: Number;

  constructor() {
    this.w1 = this.getRandomInt(min, max);
    this.h1 = this.getRandomInt(min, max);
    this.w2 = this.getRandomInt(min, max);
    this.h2 = this.getRandomInt(min, max);
    this.w3 = this.getRandomInt(min, max);
    this.h3 = this.getRandomInt(min, max);
  }

  getRandomInt(minM: number, maxM: number) {
    return Math.floor(Math.random() * (maxM - minM + 1) + minM);
  }

}

