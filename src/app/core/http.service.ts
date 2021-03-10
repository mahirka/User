import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  canActivateRoute(requestedRoute) {
    return this._http.post('https://api.listnsell.in/api/userAuthguard', { 'requestType': 'canActive', 'requestBody': {requestedRoute:requestedRoute} }, {
      headers:{"authTocken":localStorage.getItem('tocken'),"apiKey":environment.apiKey},
      observe: 'body',
    });
  }
}
