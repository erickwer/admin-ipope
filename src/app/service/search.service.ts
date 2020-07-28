import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getAll(): Promise<any> {
    return this.http.get(`${environment.apiUrl}searches`).toPromise();
  }

  getSearch(search_id: string): Promise<any> {
    return this.http.get(`${environment.apiUrl}searches/${search_id}`).toPromise();
  }
  removeSearch(search_id: string): Promise<any>{
    return this.http.delete(`${environment.apiUrl}searches/${search_id}`).toPromise();
  }

  addSearch(data): Promise<any> {
    return this.http.post(`${environment.apiUrl}searches`, data).toPromise();
  }

  addSecretary(data, search_id:string): Promise<any> {
    return this.http.post(`${environment.apiUrl}searches/${search_id}/secretaries`, data).toPromise();
  }
  removeSecretary(secretary_id: string, search_id:string): Promise<any>{
    return this.http.delete(`${environment.apiUrl}searches/${search_id}/secretaries/${secretary_id}`).toPromise();
  }

  addCouncilor(data, search_id:string): Promise<any> {
    return this.http.post(`${environment.apiUrl}searches/${search_id}/councilors`, data).toPromise();
  }

  addMayorCandidate(data, search_id:string): Promise<any> {
    return this.http.post(`${environment.apiUrl}searches/${search_id}/mayors`, data).toPromise();
  }
  addFirst(data, search_id:string): Promise<any> {
    return this.http.post(`${environment.apiUrl}searches/${search_id}/first`, data).toPromise();
  }
  addSecond(data, search_id:string): Promise<any> {
    return this.http.post(`${environment.apiUrl}searches/${search_id}/second`, data).toPromise();
  }
  removeMayorCandidate(mayor_id: string, search_id:string): Promise<any>{
    return this.http.delete(`${environment.apiUrl}searches/${search_id}/mayors/${mayor_id}`).toPromise();
  }
  removeFirst(first_id: string, search_id:string): Promise<any>{
    return this.http.delete(`${environment.apiUrl}searches/${search_id}/first/${first_id}`).toPromise();
  }
  removeSecond(second_id: string, search_id:string): Promise<any>{
    return this.http.delete(`${environment.apiUrl}searches/${search_id}/second/${second_id}`).toPromise();
  }
  
  createForm(data, search_id:string): Promise<any>{
    return this.http.post(`${environment.apiUrl}searches/${search_id}/forms`, data).toPromise();
  }

}
