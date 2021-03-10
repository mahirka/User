import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingleViewsHttpService {

  constructor(private http:HttpClient) { }
  createEnquiry(newEnquiryBody) {
    setTimeout(function(){
      return this.http.post('https://api.listnsell.in/api/enquiry',{requestType:'createEnquiry',requestBody:newEnquiryBody},{
        observe:'body'
      })
    },2000);
  };

  createReview(newReviewBody) {
    return this.http.post('https://api.listnsell.in/api/review',{requestType:'createReview',requestBody:newReviewBody},{
      observe:'body'
    })
  };

}
