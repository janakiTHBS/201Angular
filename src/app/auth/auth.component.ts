import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, authResponse } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../placeholder/placeholder.directive';
import { Store } from '@ngrx/store';

import * as fromApp from  '../app.reducer';

import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit ,OnDestroy{
  isLoginMode=true;
  isLoading=false;
  error:string=null;
  private closeSub:Subscription;
  storeSub:Subscription;
@ViewChild(PlaceholderDirective,{static:false}) alertHost:PlaceholderDirective;
  constructor(private authService:AuthService,
    private router:Router,
    private componentFactoryResolver:ComponentFactoryResolver,
    private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSub=this.store.select('auth').subscribe(authState=>{
      this.isLoading=authState.loading;
      this.error=authState.authError;
      if(this.error)
      this.showErrorAlert(this.error);
    });
  }

  onSwitchMode() {
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(form:NgForm){
    //let authObs:Observable<authResponse>;
    const email=form.value.email;
      const password=form.value.password;
    if (!form.valid){
      return ;
    }
    this.isLoading=true;
    if(this.isLoginMode){
//authObs=this.authService.login(email,password);
this.store.dispatch(new AuthActions.LoginStart({email:email,password:password}))
    } else {
      
     // authObs=this.authService.signup(email,password)
     this.store.dispatch(new AuthActions.Signup({email:email,password:password}));

    }

   

    //authObs.subscribe((response)=>{
      //console.log(response);
      //this.isLoading=false;
      //this.router.navigate(['/recipes']);
    //}, (error)=>{
      //this.error=error;
      //this.error='An error occurred';
      //this.showErrorAlert(error);
      //console.log(error);
    //});
    
this.isLoading=false;
//console.log(form.value);
form.reset();
  }

  

  onHandleError(){
    this.store.dispatch(new AuthActions.ClearError())
  }

  private showErrorAlert(message:string){
//const alert=new AlertComponent();
const alertFactory=this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

const hostviewContainerRef=this.alertHost.viewContinerRef;
hostviewContainerRef.clear();
const componentRef=hostviewContainerRef.createComponent(alertFactory);
componentRef.instance.message=message;
this.closeSub=componentRef.instance.close.subscribe(()=>{
  this.closeSub.unsubscribe();
  hostviewContainerRef.clear();

});
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
    this.storeSub.unsubscribe();
  }
}
