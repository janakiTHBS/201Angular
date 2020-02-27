import { Injectable, EventEmitter } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
ingredientsChanged=new Subject<Ingredient[]>();

startedEdited=new Subject<number>();
  private ingredients:Ingredient[]=[
    new Ingredient("apples",10),
    new Ingredient("tomato",12)
  ];
  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient){
   this.ingredients.push(ingredient);
   this.ingredientsChanged.next(this.ingredients.slice());
  }
 addIngredients(ingredients:Ingredient[]){
   // for(let ingredient of this.ingredients){
     // this.addIngredient(ingredient);
     this.ingredients.push(...ingredients);
     this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredientAtIndex(index:number){
      return this.ingredients[index];
    }
    updateIngredient(index:number,ingredient:Ingredient){
this.ingredients[index]=ingredient;
this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
      console.log(index);
  this.ingredients.slice(index,1);
  this.ingredientsChanged.next(this.ingredients.slice());
  console.log(this.ingredients);
    }
  }

