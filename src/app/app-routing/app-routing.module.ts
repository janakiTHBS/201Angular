import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { RecipesComponent } from '../recipes/recipes.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { RecipesStartComponent } from '../recipes/recipes-start/recipes-start.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
const routes:Routes =[
  {path:'',redirectTo:'recipes',pathMatch:'full'},
  {path:'recipes',component:RecipesComponent ,children:[
    {path:'',component:RecipesStartComponent},
    {path:'new',component:RecipeEditComponent},
    {path:':id',component:RecipeDetailComponent},
    {path:':id/edit',component:RecipeEditComponent},
  ]},
  {path:'shopping',component:ShoppingListComponent}
    ];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes,{useHash:true})
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
