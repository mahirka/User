import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  createBusinessListing(body: any) {
    return this.http.post('https://api.listnsell.in/api/user', { requestType: 'createBusinessListing', requestBody: body }, {
      
      observe: 'body'
    });
  }
  
  getbusinessListingBasicDetails(businessListingId) {
    return this.http.post('https://api.listnsell.in/api/businessListing',{requestType:'readById','requestBody': {
      'businessListingId': businessListingId  
    }  }, {
     
      observe: 'body',
    });
  }
  getbusinessListing(requestBody) : Observable<any> {
    return this.http.post('https://api.listnsell.in/api/businessListing', { requestType: 'readByCreator','requestBody': requestBody   }, {
     
      observe: 'body',
    });
  }
  getLoggedInUserDetails() {
    return this.http.post('https://api.listnsell.in/api/user',{requestType:'getLoggedInUserDetails'}, {
     
      observe: 'body',
    });
  }
  uploadMedia(uploadData) {
    return this.http.post('https://api.listnsell.in/api/upload',
      uploadData, {
      observe: 'body',
    });
  }

}
