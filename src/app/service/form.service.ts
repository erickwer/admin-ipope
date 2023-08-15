import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }


  addPersonalData(data, search_id:string, form_id:string): Promise<any> {
    return this.http.post(`${environment.apiUrl}searches/${search_id}/forms/${form_id}/personal_data`, data).toPromise();
  }

  addSocialDemands(data, search_id:string, form_id:string): Promise<any> {
    return this.http.post(`${environment.apiUrl}searches/${search_id}/forms/${form_id}/social_demand`, data).toPromise();
  }

  addAdmnistrativeEvaluation(data, search_id:string, form_id:string): Promise<any> {
    return this.http.post(`${environment.apiUrl}searches/${search_id}/forms/${form_id}/administrative_evaluation`, data).toPromise();
  }

  addVoteSpontaneous(data, search_id:string, form_id:string): Promise<any> {
    return this.http.post(`${environment.apiUrl}searches/${search_id}/forms/${form_id}/vote_spontaneous`, data).toPromise();
  }

  addVoteStimulated(data, search_id:string, form_id:string): Promise<any> {
    return this.http.post(`${environment.apiUrl}searches/${search_id}/forms/${form_id}/vote_stimulated`, data).toPromise();
  }

  createForm(data, search_id:string): Promise<any>{
    return this.http.post(`${environment.apiUrl}searches/${search_id}/forms`, data).toPromise();
  }

  getForms(search_id:string): Promise<any>{
    return this.http.get(`${environment.apiUrl}searches/${search_id}/forms`).toPromise();
  }

}
