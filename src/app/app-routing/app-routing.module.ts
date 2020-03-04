import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';



const routes:Routes =[
  {path:'',redirectTo:'recipes',pathMatch:'full'},
  //{path:'recipes',loadChildren:'../recipes/recipes.module#RecipesModule'}
//{path:'recipes',loadChildren:()=>import('../recipes/recipes.module').then(m=>m.RecipesModule)}
  //{path:'shopping',loadChildren:'../shopping-list/shopping-list.module#ShoppinglistModule'},

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes,{useHash:true})
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
