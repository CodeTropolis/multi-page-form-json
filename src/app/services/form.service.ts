import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  
  // An observable to hold the form values.
  formValue$ = new BehaviorSubject(null);
  
  constructor(private httpClient: HttpClient,) { }

  getFormData(): Promise<any> {
    return this.httpClient.get("../assets/data/form.json").toPromise();
  }

}
