import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { RecipesComponent } from '../recipes/recipes.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { RecipesStartComponent } from '../recipes/recipes-start/recipes-start.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from '../recipes/recipe-resolver.service';
import { AuthComponent } from '../auth/auth.component';
import { AuthGuard } from '../auth/authguard';
const routes:Routes =[
  {path:'',redirectTo:'recipes',pathMatch:'full'},
  {path:'recipes',component:RecipesComponent ,canActivate:[AuthGuard],
  children:[
    {path:'',component:RecipesStartComponent},
    {path:'new',component:RecipeEditComponent},
    {path:':id',component:RecipeDetailComponent,resolve:[RecipeResolverService]},
    {path:':id/edit',component:RecipeEditComponent,resolve:[RecipeResolverService]},
  ]},
  {path:'shopping',component:ShoppingListComponent},
  {path:'auth',component:AuthComponent}
    ];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes,{useHash:true})
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
