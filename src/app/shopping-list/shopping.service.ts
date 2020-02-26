import { Injectable, EventEmitter } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
ingredientsChanged=new Subject<Ingredient[]>();
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
  }

