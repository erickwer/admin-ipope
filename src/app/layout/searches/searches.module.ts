import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchesRoutingModule } from './searches-routing.module';
import { SearchesComponent } from './searches.component';
import { PageHeaderModule } from '../../shared';
import { CreateSearchComponent } from './create-search/create-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewSearchComponent } from './view-search/view-search.component';
import { CreateSecretaryComponent } from './create-secretary/create-secretary.component';
import { CreateCouncilorComponent } from './create-councilor/create-councilor.component';
import { CreateMayorCandidateComponent } from './create-mayor-candidate/create-mayor-candidate.component';
import { ChartsComponent } from './charts/charts.component';
import { CreateSecondDisputeComponent } from './create-second-dispute/create-second-dispute.component';
import { CreateFirstDisputeComponent } from './create-first-dispute/create-first-dispute.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchesRoutingModule,
    PageHeaderModule
  ],
  declarations: [
    SearchesComponent,
    CreateSearchComponent,
    ViewSearchComponent,
    CreateSecretaryComponent,
    CreateCouncilorComponent,
    CreateMayorCandidateComponent,
    ChartsComponent,
    CreateSecondDisputeComponent,
    CreateFirstDisputeComponent
  ]
})
export class SearchesModule { }
