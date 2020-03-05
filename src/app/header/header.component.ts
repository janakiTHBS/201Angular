import {Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import * as fromApp from '../app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipes.actions';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent  implements OnInit,OnDestroy{
    userSub:Subscription;
    isAuthenticated=false;
    constructor(private datastorage:DataStorageService,
        private recipeService:RecipeService,
        private authService:AuthService,
        private store:Store<fromApp.AppState>){

    }
    ngOnInit(){
       //this.userSub= this.authService.user.subscribe(user=>{
       this.userSub=this.store.select('auth').pipe(map(authState=>{
           return authState.user;
       })).subscribe(user=>{
       this.isAuthenticated =!user ? false:true;
        console.log(!user);
        console.log(!!user);
       });
    }
    onSaveData(){
    this.datastorage.storeRecipe();
    }

    onLogout(){
       // this.authService.logout();
       this.store.dispatch(new AuthActions.LogOut())
    }
    onFetchData(){
    // this.datastorage.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes())
    }
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}