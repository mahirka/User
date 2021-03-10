import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  updateProfile(requestBody) : Observable<any> {
    return this.http.post('https://api.listnsell.in/api/user', { requestType: 'updateProfile', 'requestBody': requestBody }, {
     
      observe: 'body',
    });
  }
  resetPassword(requestBody) : Observable<any> {
    return this.http.post('https://api.listnsell.in/api/user', { requestType: 'updatePassword', 'requestBody': requestBody }, {
     
      observe: 'body',
    });
  }
  uploadMedia(uploadData) {
    return this.http.post('https://api.listnsell.in/api/upload',
      uploadData, {
      observe: 'body',
    });
  }
  getLoggedInUserDetails() {
    return this.http.post('https://api.listnsell.in/api/user',{requestType:'getLoggedInUserDetails'}, {
     
      observe: 'body',
    });
  }
}
