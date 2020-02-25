import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef:ElementRef;
  @ViewChild('amountInput') amountInputRef:ElementRef;

 
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
  }

   onAddItem(){
     const name=this.nameInputRef.nativeElement.value;
     const amount=this.amountInputRef.nativeElement.value;
       const newIngredient=new Ingredient(name,amount);
     this.shoppingService.addIngredient(newIngredient);
   }
}
