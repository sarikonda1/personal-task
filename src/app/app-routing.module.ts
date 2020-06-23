import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UlbReportComponent } from './ulb-report/ulb-report.component';
import { ChartsComponent } from './charts/charts.component';
import { MapsComponent } from './maps/maps.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ulb-report'
  },
  {
    path: 'ulb-report',
    component: UlbReportComponent
  },
  {
    path: 'chart',
    component: ChartsComponent
  },
  {
    path: 'map',
    component: MapsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
