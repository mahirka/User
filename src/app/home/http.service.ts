import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http:HttpClient) { }

  createEnquiry(newEnquiryBody) : Observable<any> {
    return this.http.post('https://api.listnsell.in/api/enquiry',{requestType:'createEnquiry',requestBody:newEnquiryBody},{
     
      observe:'body'
    })
  };
  createAutomobileList(requestBody) : Observable<any> {
    return this.http.post('https://api.listnsell.in/api/auth/user', { requestType: 'createAutomobileList', 'requestBody': requestBody }, {
     
      observe: 'body',
    });
  }
  createFashionList(requestBody) : Observable<any> {
    return this.http.post('https://api.listnsell.in/api/auth/user', {requestType: 'createFashionList', 'requestBody': requestBody }, {
     
      observe: 'body',
    });
  }
  createJobList(requestBody) : Observable<any> {
    return this.http.post('https://api.listnsell.in/api/auth/user', { requestType: 'createJobList', 'requestBody': requestBody }, {
     
      observe: 'body',
    });
  }
  createRealEstateList(requestBody) : Observable<any> {
    return this.http.post('https://api.listnsell.in/api/auth/user', { requestType: 'createRealEstateList', 'requestBody': requestBody }, {
     
      observe: 'body',
    });
  }
  
  getLoggedInUserDetails() {
    return this.http.post('https://api.listnsell.in/api/user',{requestType:'getLoggedInUserDetails'}, {
     
      observe: 'body',
    });
  }
  

}
