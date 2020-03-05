import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import {map, tap,take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../app.reducer';
@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,
        private routerR:Router,private store:Store<fromApp.AppState>){

    }
canActivate(route:ActivatedRouteSnapshot,
    router:RouterStateSnapshot): boolean |UrlTree |Promise<boolean|UrlTree > | Observable<boolean | UrlTree> {
//return this.authService.user.pipe(take(1),map(user=>{
  return this.store.select('auth').pipe(take(1),map(authState=>{
      return authState.user;
  }),map(user=>{
    const isAuth= !!user;
    if(isAuth){
        return true;
    }
    return this.routerR.createUrlTree(['/auth']);
})
//tap(isAuth=>{
  //  if(!isAuth){
    //this.routerR.navigate(['/auth']);
//}})
);
    
}
}