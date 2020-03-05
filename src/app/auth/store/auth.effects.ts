import {Actions,ofType, Effect} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../user.model';
import {AuthService} from '../../auth.service';
export interface authResponse {
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string
  }

  const handleAuthentication=(expiresIn:number,email:string,userId:string,token:string)=>{
   
    const expirationDate=new Date(new Date().getTime()+ +expiresIn*1000);
    const user=new UserModel(email,userId,token,expirationDate);
    localStorage.setItem('userData',JSON.stringify(user));
        return new AuthActions.AuthenticationSuccess({email:email,
            userId:userId,
            token:token,
            expirationDate:expirationDate,
          redirect:true});

  };

  const handleError=(errorRes:any)=>{

    let errorMessage="unknowm error occured..";
    if(!errorRes.error || !errorRes.error.error){
      return of(new AuthActions.AuthenticateFail(errorMessage));
    }
    
    switch(errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage='Email already exists';
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage='Email not found';  
        break;
       case "INVALID_PASSWORD":
         errorMessage='password is incorrect';
         break;
              }
      
          return of(new AuthActions.AuthenticateFail(errorMessage));

  };
@Injectable()
export class AuthEffects {

    @Effect()
    authSignUp=this.actions$.pipe(ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction:AuthActions.Signup)=>{
        
        return  this.http.post<authResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseAPIKey,
        {
          email:signupAction.payload.email,
         password:signupAction.payload.password,
         returnSecureToken:true
       }
       ).pipe(tap(response=>{
         this.authService.setLogoutTimer(+response.expiresIn*1000);
       }),map(resData=>{
    return handleAuthentication(+resData.expiresIn,resData.email,resData.localId,resData.idToken);
    }),catchError((errorRes) => {
      return handleError(errorRes);
       
        } ))
    }));

    @Effect()
    authLogin=this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
       switchMap((authData:AuthActions.LoginStart)=>{
        return this.http.post<authResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseAPIKey,
        {
         email:authData.payload.email,
         password:authData.payload.password,
         returnSecureToken:true
        }
        ).pipe(tap(response=>{
          this.authService.setLogoutTimer(+response.expiresIn*1000);
        }),map(resData=>{
            return handleAuthentication(+resData.expiresIn,resData.email,resData.localId,resData.idToken);
            }),catchError((errorRes) => {
              return handleError(errorRes);
               
                }))
            }));

      @Effect({dispatch:false})
       authRedirect=this.actions$.pipe(ofType(AuthActions.AUTHENTICATION_SUCCESS),
       tap((authSuccessAction:AuthActions.AuthenticationSuccess)=>{
         if(authSuccessAction.payload.redirect){
          this.router.navigate(['/']);
         }
      
       }));


       @Effect({dispatch:false})
       authLogout=this.actions$.pipe(ofType(AuthActions.LOG_OUT),tap(()=>{
         this.authService.clearLogoutTimer();
           localStorage.removeItem('userData');
           this.router.navigate(['/auth']);

       }));

       @Effect()
       autoLogin=this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN),
       map(()=>{

        const user:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string
          }=JSON.parse(localStorage.getItem('userData'));
          if(!user){
            return {type:'Dummy'};
          }
          
          const loadedUser=new UserModel(user.email,user.id,user._token,new Date(user._tokenExpirationDate));
           
          if(loadedUser.token){
            //this.user.next(loadedUser);
            const expDuration=new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
            this.authService.setLogoutTimer(expDuration);
            return new AuthActions.AuthenticationSuccess({email:loadedUser.email,
              userId:loadedUser.id,
              token:loadedUser.token,
            expirationDate:new Date(user._tokenExpirationDate),
          redirect:false});

           
            //this.autoLogout(expDuration);
          }

          return {type:'Dummy'};

       }));
    constructor(private actions$:Actions,
        private http:HttpClient,private router:Router,private authService:AuthService){

    }
}