import {Component} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent {
    constructor(private datastorage:DataStorageService,private recipeService:RecipeService){

    }
    onSaveData(){
    this.datastorage.storeRecipe();
    }

    onFetchData(){
     this.datastorage.fetchRecipes().subscribe();
    }
}