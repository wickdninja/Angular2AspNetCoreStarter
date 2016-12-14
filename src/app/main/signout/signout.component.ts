import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'signout.component.html',
  styleUrls: ['signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    console.log('signout component loaded');
  }

}

