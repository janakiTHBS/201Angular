import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppinglistActions from '../store/shopping-list.actions';
import { ShoppingListComponent } from '../shopping-list.component';
import * as ShoppingListState from '../store/shopping-list.reducer';
import * as fromApp from '../../app.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy { 

  @ViewChild('f') spForm:NgForm;
  editMode=false;
  editedItemIndex:number;
  subscription:Subscription;
  editedItem:Ingredient;
  constructor(private shoppingService:ShoppingService,
    private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {

   this.subscription= this.store.select('shoppingList').subscribe(stateData=>{
      if(stateData.editedIngredientItemIndex > -1){
        this.editMode=true;
        this.editedItem=stateData.editedIngredient;
        this.spForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        });
      } else {
      this.editMode=false;
      }
    });
    //this.subscription=this.shoppingService.startedEdited.subscribe((index:number)=>{
      //this.editMode=true;
      //this.editedItemIndex=index;
      //this.editedItem=this.shoppingService.getIngredientAtIndex(index);
      //this.spForm.setValue({
        //name:this.editedItem.name,
        //amount:this.editedItem.amount
      //});
    //});
  }

   onAddItem(form:NgForm){
       const newIngredient=new Ingredient(form.value.name,form.value.amount);
       console.log(newIngredient);
    
     if(this.editMode){
       //this.shoppingService.updateIngredient(this.editedItemIndex,newIngredient);
       this.store.dispatch(new ShoppinglistActions.UpdateIngredient(newIngredient));
     }
     else {
      //this.shoppingService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppinglistActions.AddIngredient(newIngredient));
     }
     this.editMode=false;
     form.reset();
   }
 onClear(){
   this.spForm.reset();
   this.editMode=false;
   this.store.dispatch(new ShoppinglistActions.Stopedit());
 }

 onDelete(){
   //this.shoppingService.deleteIngredient(this.editedItemIndex);
   this.store.dispatch(new ShoppinglistActions.DeleteIngredient(this.editedItem));
   this.onClear();
 }
   ngOnDestroy(){
     this.subscription.unsubscribe();
     this.store.dispatch(new ShoppinglistActions.Stopedit());
   }
}
