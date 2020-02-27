import { Injectable, EventEmitter } from '@angular/core';
import {Recipe} from './recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged=new Subject<Recipe[]>();

  //recipeSelected=new Subject<Recipe>();
  constructor(private shoppingService:ShoppingService) { }

  private recipes:Recipe[]=[
    new Recipe('A test recipe',
    'recipe test',
    "https://cdn.apartmenttherapy.info/image/upload/v1567541461/k/Photo/Recipes/2019-09-how-to-shrimp-alfredo/HT-Shrimp-Alfredo_103.jpg", [new Ingredient('meat',1),new Ingredient('rice',2)]),
    new Recipe('A test recipe','recipe test',"https://cdn.apartmenttherapy.info/image/upload/v1567541461/k/Photo/Recipes/2019-09-how-to-shrimp-alfredo/HT-Shrimp-Alfredo_103.jpg", [new Ingredient('meat',1),new Ingredient('rice',2)])
  ];

  getRecipes(){
    return this.recipes.slice();

  }

  addIngredientToShopping(ingredients:Ingredient[]){
    this.shoppingService.addIngredients(ingredients);
  }

  getRecipe(index:number){
    return this.recipes.slice()[index];
  }

  addRecipe(recipe:Recipe){
   this.recipes.push(recipe);
   this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index:number,recipe:Recipe){
   this.recipes[index]=recipe;
   this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number) {
    console.log("services:"+index);
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
    console.log(this.recipes.slice());

  }
}
