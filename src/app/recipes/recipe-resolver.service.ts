import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipes.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorgae:DataStorageService,private recipeService:RecipeService) { }

resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):any {
  const recipes=this.recipeService.getRecipes();

  if(recipes.length===0){
  return this.dataStorgae.fetchRecipes();
}
else {
  return recipes;
}
}

}
