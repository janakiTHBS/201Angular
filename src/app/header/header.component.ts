import {Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent  implements OnInit,OnDestroy{
    userSub:Subscription;
    isAuthenticated=false;
    constructor(private datastorage:DataStorageService,
        private recipeService:RecipeService,private authService:AuthService){

    }
    ngOnInit(){
       this.userSub= this.authService.user.subscribe(user=>{
        this.isAuthenticated =!user ? false:true;
        console.log(!user);
        console.log(!!user);
       });
    }
    onSaveData(){
    this.datastorage.storeRecipe();
    }

    onLogout(){
        this.authService.logout();
    }
    onFetchData(){
     this.datastorage.fetchRecipes().subscribe();
    }
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}