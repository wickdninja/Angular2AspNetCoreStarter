import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { SignoutComponent } from './signout';
import { mainRoutes } from './main.routes';
import {
  IDialogService,
  DialogService,
  MockDialogService,
  IPingService,
  PingService,
  MockPingService,
  TruncatePipe,
  MaskPipe,
  TimePipe
} from '../shared';
import {
  DashboardComponent,
  CarouselComponent
} from './dashboard';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    mainRoutes
  ],
  declarations: [
    MainComponent,
    DashboardComponent,
    CarouselComponent,
    SignoutComponent,
    MaskPipe,
    TimePipe,
    TruncatePipe,
  ],
  providers: [
    DialogService,
    MockDialogService,
    { provide: IDialogService, useExisting: DialogService },
    PingService,
    MockPingService,
    { provide: IPingService, useExisting: PingService }
  ],
  exports: [MainComponent]
})
export class MainModule {
}
