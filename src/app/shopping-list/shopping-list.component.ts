import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  private subscription:Subscription;
ingredients:Ingredient[];
 
  constructor(private shopingService:ShoppingService) { }

  ngOnInit(): void {
    this.ingredients=this.shopingService.getIngredients();
   this.subscription=this.shopingService.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients=ingredients;
    });
  }
ngOnDestroy(){
  this.subscription.unsubscribe();
}

onEditItem(index:number){
this.shopingService.startedEdited.next(index);
}
}
