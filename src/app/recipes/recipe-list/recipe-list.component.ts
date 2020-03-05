import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
subscription:Subscription;
recipes:Recipe[];
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
  // this.recipes=this.recipeService.getRecipes();
  this.store.select('recipes').pipe(map(recipesState=>{
    return recipesState.recipes
  })).subscribe((recipes:Recipe[])=>{
  this.recipes=recipes;
  });
   //this.subscription=this.recipeService.recipesChanged.subscribe((recipes:Recipe[])=>{
    //this.recipes=recipes;
   //});
  }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
  ngOnDestroy(){
   // this.subscription.unsubscribe();
  }
}
