import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { AdministrativeEvaluationComponent } from './administrative-evaluation/administrative-evaluation.component';
import { VoteSpontaneousComponent } from './vote-spontaneous/vote-spontaneous.component';
import { VoteStimulatedsComponent } from './vote-stimulateds/vote-stimulateds.component';
import { SocialDemandsComponent } from './social-demands/social-demands.component';

const routes: Routes = [
  {
    path: '', component: FormComponent
  },
  {
    path: ':form_id/personal_data', component: PersonalDataComponent
  },
   {
    path: ':form_id/social_demand', component: SocialDemandsComponent
  },
  {
    path: ':form_id/administrative_evaluation', component: AdministrativeEvaluationComponent
  },
  {
    path: ':form_id/vote_spontaneous', component: VoteSpontaneousComponent
  },
  {
    path: ':form_id/vote_stimulateds', component: VoteStimulatedsComponent
  },
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule {
}
