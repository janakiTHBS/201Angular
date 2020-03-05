import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import* as fromApp from './app.reducer';

@Injectable()
export class AuthinterceptorService implements HttpInterceptor {

  constructor(private authService:AuthService,
    private store:Store<fromApp.AppState>) { }

  intercept(request:HttpRequest<any>,next :HttpHandler){
    //return this.authService.user.pipe(take(1),exhaustMap(user=>{
    return this.store.select('auth'). pipe(take(1),
    map(authState=>{
      return authState.user;
    }),
    exhaustMap(user=>{ 
    if(!user){
        return next.handle(request);
      }
      const modifiedRequest=request.clone({params:new HttpParams().set('auth',user.token)});
      return next.handle(modifiedRequest);
    }));
   
  }
}
