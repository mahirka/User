import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  login(body) : Observable<any>  {
    return this.http.post('https://api.listnsell.in/api/auth/user', { requestType: 'login', requestBody: body }, {
      
      observe: 'body'
    });
  }
  register(body) : Observable<any>  {
    return this.http.post('https://api.listnsell.in/api/auth/user', { requestType: 'register', requestBody: body }, {
      
      observe: 'body'
    });
  }
  sendOtpToResetPassword(requestBody) : Observable<any> {
    return this.http.post('https://api.listnsell.in/api/auth/user', { requestType: 'sendOtpToResetPassword', 'requestBody': requestBody }, {
      
      observe: 'body',
    });
  }

  verifyOtpToResetPassword(requestBody) : Observable<any> {
    return this.http.post('https://api.listnsell.in/api/auth/user', { requestType: 'verifyOtpToResetPassword', 'requestBody': requestBody }, {
      
      observe: 'body',
    });
  }
  sendOtpToRegister(requestBody) : Observable<any> {
    return this.http.post('https://api.listnsell.in/api/auth/user', { requestType: 'sendOtpToRegister', 'requestBody': requestBody }, {
      
      observe: 'body',
    });
  }

  verifyOtpToRegister(requestBody) : Observable<any> {
    return this.http.post('https://api.listnsell.in/api/auth/user', { requestType: 'verifyOtpToRegister', 'requestBody': requestBody }, {
      
      observe: 'body',
    });
  }

  resetPassword(requestBody) : Observable<any> {
    return this.http.post('https://api.listnsell.in/api/auth/user', { requestType: 'resetPassword', 'requestBody': requestBody }, {
      
      observe: 'body',
    });
  }


}
