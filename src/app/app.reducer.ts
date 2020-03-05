import * as ShoppingList from './shopping-list/store/shopping-list.reducer';
import * as Auth from './auth/store/auth.reducer';
import { State, ActionReducerMap } from '@ngrx/store';
import * as Recipes from './recipes/store/recipes.reducer';

export interface AppState {
    shoppingList:ShoppingList.ShoppingState,
    auth:Auth.AuthState,
    recipes:Recipes.State
}


export const appReducer:ActionReducerMap<AppState>={
shoppingList:ShoppingList.shoppinglistReducer,
auth:Auth.AuthReducer,
recipes:Recipes.RecipesReducer
}