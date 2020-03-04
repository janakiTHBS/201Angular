import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription, Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as ShoppingListReducers from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  //private subscription:Subscription;
ingredients:Observable<{ingredients:Ingredient[]}>;
 
  constructor(
    //private shopingService:ShoppingService,
    private loggingService:LoggingService,
    private store:Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.ingredients=this.store.select('shoppingList')
    //this.ingredients=this.shopingService.getIngredients();
   //this.subscription=this.shopingService.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
     // this.ingredients=ingredients;
    //});
    this.loggingService.printlog("hello from shoppinglist");
  }
ngOnDestroy(){
  //this.subscription.unsubscribe();
}

onEditItem(index:number){
//this.shopingService.startedEdited.next(index);
this.store.dispatch(new ShoppingListActions.Startedit(index));
}
}
