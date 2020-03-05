import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Recipe} from '../recipes/recipes.model'
import { RecipeService } from '../recipes/recipe.service';
import {map,tap, take, exhaustMap} from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import * as RecipesActions from '../recipes/store/recipes.actions';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient
    ,private recipeService:RecipeService,
    private authService:AuthService,
    private store:Store<fromApp.AppState>) { }

  storeRecipe(){
    const recipes=this.recipeService.getRecipes();
   this.http.put("https://recipe-storage-bcd22.firebaseio.com/recipes.json",recipes).subscribe((recipes)=>{
     console.log(recipes);
   });
  }

  fetchRecipes(){
   
      return this.http.get<Recipe[]>
      ("https://recipe-storage-bcd22.firebaseio.com/recipes.json")
    .pipe(map((recipes)=>{
      return recipes.map(recipe=>{
       return {...recipe,ingredients:recipe.ingredients ? recipe.ingredients:[]}
      });
    }),tap((recipes)=>{
    //this.recipeService.setRecipes(recipes);
    this.store.dispatch(new RecipesActions.SetRecipes(recipes));
    console.log(recipes);
    }));
  }
}
