import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from './app.reducer';
import * as fromStoreActions from './auth/store/auth.actions';


export interface authResponse {
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //user=new BehaviorSubject<UserModel>(null);
  
tokenExpirationTimer:any;
  constructor(private store:Store<fromApp.AppState>) { }

  

 

  setLogoutTimer(experirationDuration:number){
    this.tokenExpirationTimer=setTimeout(()=>{
     this.store.dispatch(new fromStoreActions.LogOut());
     
    }, experirationDuration);

  }
  
clearLogoutTimer(){
if(this.tokenExpirationTimer){
  clearTimeout(this.tokenExpirationTimer);
  this.tokenExpirationTimer=null;
}
}

}
