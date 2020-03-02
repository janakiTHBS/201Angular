import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Recipe} from '../recipes/recipes.model'
import { RecipeService } from '../recipes/recipe.service';
import {map,tap, take, exhaustMap} from 'rxjs/operators';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient,private recipeService:RecipeService,private authService:AuthService) { }

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
    this.recipeService.setRecipes(recipes);
    }));
  }
}
