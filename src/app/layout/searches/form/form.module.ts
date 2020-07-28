import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { PageHeaderModule } from '../../../shared/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { AdministrativeEvaluationComponent } from './administrative-evaluation/administrative-evaluation.component';
import { VoteSpontaneousComponent } from './vote-spontaneous/vote-spontaneous.component';
import { VoteStimulatedsComponent } from './vote-stimulateds/vote-stimulateds.component';
import { SocialDemandsComponent } from './social-demands/social-demands.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormRoutingModule,
    PageHeaderModule
  ],
  declarations: [
   FormComponent,
   PersonalDataComponent,
   AdministrativeEvaluationComponent,
   VoteSpontaneousComponent,
   VoteStimulatedsComponent,
   SocialDemandsComponent
  ]
})
export class FormModule { }
