import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import { throwError, Subject,BehaviorSubject } from 'rxjs';
import { UserModel } from './auth/user.model';
import { Router } from '@angular/router';
import {environment} from '../environments/environment'
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

  user=new BehaviorSubject<UserModel>(null);
  
tokenExpirationTimer:any;
  constructor(private http:HttpClient,private router :Router) { }

  signup(email:string,password:string){

    return  this.http.post<authResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseAPIKey,
     {
       email:email,
      password:password,
      returnSecureToken:true
    }
    ).pipe(catchError(this.handleError),tap(response=>{
     this.handleAuth(response.email,response.localId,response.idToken,+response.expiresIn);
    })
  );
  }

  login(email:string,password:string){
    return this.http.post<authResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseAPIKey,
    {
     email:email,
     password:password,
     returnSecureToken:true
    }
    ).pipe(catchError(this.handleError),tap(response=>{
      this.handleAuth(response.email,response.localId,response.idToken,+response.expiresIn);
     }));
    
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer=null;
  }

  autoLogout(experirationDuration:number){
    this.tokenExpirationTimer=setTimeout(()=>{
      this.logout();
     
    }, experirationDuration);

  }
  autoLogin(){
    const user:{
      email:string,
      id:string,
      _token:string,
      _tokenExpirationDate:string
    }=JSON.parse(localStorage.getItem('userData'));
    if(!user){
      return;
    }
    
    const loadedUser=new UserModel(user.email,user.id,user._token,new Date(user._tokenExpirationDate));
     
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expDuration=new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expDuration);
    }
  }


  private handleAuth(email:string,userId:string,token:string,expiresIn:number){

    const expirationDate=new Date(new Date().getTime()+ +expiresIn*1000);
    const user=new UserModel(email,userId,token,expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn*1000);
    localStorage.setItem('userData',JSON.stringify(user));
  }

  private handleError(errorRes:HttpErrorResponse){
    let errorMessage="unknowm error occured..";
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
      }
      
      switch(errorRes.error.error.message){
        case "EMAIL_EXISTS":
          errorMessage='Email already exists';
          break;
        case "EMAIL_NOT_FOUND":
          errorMessage:'Email not found';  
          break;
         case "INVALID_PASSWORD":
           errorMessage='password is incorrect';
           break;
                }
          return throwError(errorMessage);  

  }
}
