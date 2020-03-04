import * as ShoppingList from './shopping-list/store/shopping-list.reducer';
import * as Auth from './auth/store/auth.reducer';
import { State, ActionReducerMap } from '@ngrx/store';


export interface AppState {
    shoppingList:ShoppingList.ShoppingState,
    auth:Auth.AuthState
}


export const appReducer:ActionReducerMap<AppState>={
shoppingList:ShoppingList.shoppinglistReducer,
auth:Auth.AuthReducer
}