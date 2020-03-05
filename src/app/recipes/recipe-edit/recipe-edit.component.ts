import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, NgControlStatus, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id:number;
editMode=false;
recipeForm:FormGroup;
  constructor(private route:ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router,
    private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      this.editMode=params['id']!=null;
      this.formInit();
  
    });
  }


private formInit(){
  let recipeName='';
  let imagePath='';
  let description='';
  let ingredients=new FormArray([]);

  if(this.editMode){
    //const recipe=this.recipeService.getRecipe(this.id);
    this.store.select('recipes').pipe(map(recipeState=>{
      return recipeState.recipes.find((recipe,index)=>{
        return index == this.id;
      })
    })).subscribe(recipe=>{
      recipeName=recipe.name;
    imagePath=recipe.imagePath;
    description=recipe.description;
    if(recipe['ingredients']){
      for(let ingredient of recipe.ingredients){
        ingredients.push(new FormGroup({
          name:new FormControl(ingredient.name,Validators.required),
         amount:new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
        }));
      }
    }

    })

    
  }
this.recipeForm=new FormGroup({
  name:new FormControl(recipeName,Validators.required),
  imagePath:new FormControl(imagePath,Validators.required),
  description:new FormControl(description,Validators.required),
  ingredients:ingredients

});
}

get controls () {
  return (<FormArray>this.recipeForm.get('ingredients')).controls;
}
onSubmit(){
  const newRecipe=new Recipe(this.recipeForm.value['name'],
    this.recipeForm.value['image'],
    this.recipeForm.value['description'],
    this.recipeForm.value['ingredients']
    );
 if(this.editMode){
   this.recipeService.updateRecipe(this.id,this.recipeForm.value);
 }
 else {
   this.recipeService.addRecipe(this.recipeForm.value);
 }
}

onAddIngredient(){
  (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      name:new FormControl(null,Validators.required),
      amount:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+[0-9]*$/)])
    }) 
  );
}
onCancel(){
  this.router.navigate(['../'],{relativeTo:this.route});
}
onDeleteIngredient(index:number){
(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
}
}
