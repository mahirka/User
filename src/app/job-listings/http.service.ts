import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  createJobList(requestBody) : Observable<any> {
    return this.http.post('https://api.listnsell.in/api/auth/user', { requestType: 'createJobList', 'requestBody': requestBody }, {
     
      observe: 'body',
    });
  }
  getjobListing(requestBody) : Observable<any> {
    return this.http.post('https://api.listnsell.in/api/businessListing', { requestType: 'readByCreator','requestBody': requestBody   }, {
     
      observe: 'body',
    });
  }
  getLoggedInUserDetails() {
    return this.http.post('https://api.listnsell.in/api/user',{requestType:'getLoggedInUserDetails'}, {
     
      observe: 'body',
    });
  }
}
