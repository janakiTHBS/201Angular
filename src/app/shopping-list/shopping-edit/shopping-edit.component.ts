import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    this.subscription=this.shoppingService.startedEdited.subscribe((index:number)=>{
      this.editMode=true;
      this.editedItemIndex=index;
      this.editedItem=this.shoppingService.getIngredientAtIndex(index);
      this.spForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      });
    });
  }

   onAddItem(form:NgForm){
       const newIngredient=new Ingredient(form.value.name,form.value.amount);
       console.log(newIngredient);
    
     if(this.editMode){
       this.shoppingService.updateIngredient(this.editedItemIndex,newIngredient);
     }
     else {
      this.shoppingService.addIngredient(newIngredient);
     }
     this.editMode=false;
     form.reset();
   }
 onClear(){
   this.spForm.reset();
   this.editMode=false;
 }

 onDelete(){
   this.shoppingService.deleteIngredient(this.editedItemIndex);
   this.onClear();
 }
   ngOnDestroy(){
     this.subscription.unsubscribe();
   }
}
