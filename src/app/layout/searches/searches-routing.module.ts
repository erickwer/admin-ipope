import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchesComponent } from './searches.component';
import { CreateSearchComponent } from './create-search/create-search.component';
import { ViewSearchComponent } from './view-search/view-search.component';
import { CreateSecretaryComponent } from './create-secretary/create-secretary.component';
import { CreateCouncilorComponent } from './create-councilor/create-councilor.component';
import { CreateMayorCandidateComponent } from './create-mayor-candidate/create-mayor-candidate.component';
import { ChartsComponent }  from './charts/charts.component';
import { CreateFirstDisputeComponent } from './create-first-dispute/create-first-dispute.component';
import { CreateSecondDisputeComponent } from  './create-second-dispute/create-second-dispute.component';


const routes: Routes = [
  {
    path: '', component: SearchesComponent
  },
  {
    path: 'create', component: CreateSearchComponent
  },
  {
    path: 'view/:id', component: ViewSearchComponent
  },
  {
    path: ':id/secretary', component: CreateSecretaryComponent
  },
  {
    path: ':id/councilor', component: CreateCouncilorComponent
  },
  {
    path: ':id/mayor', component: CreateMayorCandidateComponent
  },
  {
    path: ':id/first', component: CreateFirstDisputeComponent
  },
  {
    path: ':id/second', component: CreateSecondDisputeComponent
  },

  {
    path: ':id/forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule),
  },
  {
    path: ':id/charts', component: ChartsComponent
  } 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchesRoutingModule {
}
