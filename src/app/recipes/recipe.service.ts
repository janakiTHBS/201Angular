import { Injectable, EventEmitter } from '@angular/core';
import {Recipe} from './recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as ShoppingListState from '../shopping-list/store/shopping-list.reducer';
import * as fromApp from '../app.reducer';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged=new Subject<Recipe[]>();

  //recipeSelected=new Subject<Recipe>();
  constructor(private shoppingService:ShoppingService,
    private store:Store<fromApp.AppState>) { }

  private recipes:Recipe[]=[];

  getRecipes(){
    return this.recipes.slice();

  }

  addIngredientToShopping(ingredients:Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    //this.shoppingService.addIngredients(ingredients);
//this.store.dispatch(new ShoppingListActions.ADD_INGREDIENTS(ingredients));
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

   setRecipes(recipes:Recipe[]){
this.recipes=recipes;
this.recipesChanged.next(this.recipes.slice());
  }
}
