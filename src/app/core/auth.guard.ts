import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private loader$ = new Subject<boolean>();
  public loader = false;

  constructor(private _http: HttpClient, private store: Store<any>, private router: Router, private _httpService: HttpService, private toastr: ToastrService) {
    this.loader$.subscribe(loader => {
      this.loader = loader;
    });
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      this.loader$.next(true);
    return new Observable<boolean>(obs => {

      this._httpService.canActivateRoute(routerState.url).subscribe(

        data => {


          if (data['canActive']) {
            if (routerState.url.split('/')[1] == 'authentication') {
              this.router.navigateByUrl('/home');
              this.loader$.next(false);
              obs.next(false);

            } else {
              this.loader$.next(false);
              obs.next(true);

            }
          } else {
            this.router.navigateByUrl('/authentication/login');
            this.loader$.next(false);
            this.toastr.info("Please Login Or Create an account", "Please Login to your account",);

            obs.next(false);
          }

        },
        error => {

          if (routerState.url.split('/')[1] == 'authentication') {
            this.loader$.next(false);
            obs.next(true);
          } else {
            this.router.navigateByUrl('/authentication/login');
            this.toastr.info("Please Login Or Create an account", "Please Login to your account",);
            this.loader$.next(false);
            obs.next(false);

          }
        },
      )
    });
  }
  
}
