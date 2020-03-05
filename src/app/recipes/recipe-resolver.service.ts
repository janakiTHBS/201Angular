import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipes.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import * as fromApp from '../app.reducer';
import * as RecipeActions from '../recipes/store/recipes.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorgae:DataStorageService,
    private recipeService:RecipeService,
    private stroe:Store<fromApp.AppState>,
    private actions:Actions
    ) { }

resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):any {
  this.stroe.dispatch(new RecipeActions.FetchRecipes());
return this.actions.pipe(ofType(RecipeActions.SET_RECIPES),take(1));
}

}
