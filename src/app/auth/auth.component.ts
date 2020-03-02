import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, authResponse } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode=true;
  isLoading=false;
  error:string;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(form:NgForm){
    let authObs:Observable<authResponse>;
    const email=form.value.email;
      const password=form.value.password;
    if (!form.valid){
      return ;
    }
    this.isLoading=true;
    if(this.isLoginMode){
authObs=this.authService.login(email,password);
    } else {
      
      authObs=this.authService.signup(email,password)

    }

    authObs.subscribe((response)=>{
      console.log(response);
      this.isLoading=false;
      this.router.navigate(['/recipes']);
    }, (error)=>{
      this.error=error;
      //this.error='An error occurred';
      console.log(error);
    });
    
this.isLoading=false;
//console.log(form.value);
form.reset();
  }

  
}
