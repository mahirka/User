import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class ListNHttpInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiKey = environment.apiKey;
    // headers:{"authTocken":localStorage.getItem('tocken'),"apiKey":environment.apiKey},
    let authTocken = localStorage.getItem('tocken');
    console.log("authTocken")
    console.log(authTocken)

    if(authTocken){
      return next.handle(httpRequest.clone({ setHeaders: { authTocken,apiKey } }));

    }else{
      console.log("else")
      return next.handle(httpRequest.clone({ setHeaders: { apiKey } }));

    }

  }
}