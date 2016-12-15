import { Title }     from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { IMaterialService, IPingService } from '../../shared';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['dashboard.component.css'],
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  constructor(
    private titleService: Title,
    private material: IMaterialService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Dashboard');
    console.log('dashboard component loaded');
    this.material.render();
  }

  maint() {
    window.alert('This feature is under construction');
  }
}

