import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiamondListing } from './models/diamondlisting.model';
import { FreeListing } from './models/freelisting.model';
import { OtherListing } from './models/otherlisting-model';
import { PlatinumListing } from './models/platinumlisting.model';
import { SilverListing } from './models/silverlisting-model';
import { Observable } from 'rxjs';
import { GoldListing } from './models/goldlisting.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  getPlatinumListingById(platinumlisting: PlatinumListing) : Observable<any> {
    return this.http.post('https://putsreq.com/C1D0hKMoU7V3M08noFwp',platinumlisting)
  };

  getDiamondListingById(diamondlisting: DiamondListing) : Observable<any> {
     return this.http.post('https://putsreq.com/fV6DlaRuPX68nt0GkToX',diamondlisting)
  };
  getGoldListingById(goldlisting: GoldListing) : Observable<any> {
    return this.http.post('https://putsreq.com/fV6DlaRuPX68nt0GkToX',goldlisting)
  };
  getOtherListingById(otherlisting: OtherListing) : Observable<any> {
    return this.http.post('https://putsreq.com/fV6DlaRuPX68nt0GkToX',otherlisting)
  };
  getFreeListingById(freelisting: FreeListing) : Observable<any> {
    return this.http.post('https://putsreq.com/fV6DlaRuPX68nt0GkToX',freelisting)
  };
  getSilverListingById(silverlisting: SilverListing) : Observable<any> {
    return this.http.post(' https://putsreq.com/uiU1hUv6jOmCWa0dk1YW',silverlisting)
  };
  createEnquiry(newEnquiryBody) : Observable<any> {
    return this.http.post('https://api.listnsell.in/api/enquiry',{requestType:'createEnquiry',requestBody:newEnquiryBody},{
     
      observe:'body'
    })
  };
}
