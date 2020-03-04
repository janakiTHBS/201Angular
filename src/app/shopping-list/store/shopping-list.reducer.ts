
import {Action} from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppinglistActions from './shopping-list.actions';


export interface ShoppingState {
    ingredients:Ingredient[];
    editedIngredient:Ingredient;
    editedIngredientItemIndex:number;

}
const initialState:ShoppingState={
    ingredients:[
        new Ingredient("apples",10),
        new Ingredient("tomato",12)
      ],
      editedIngredient:null,
      editedIngredientItemIndex:-1
};
export function shoppinglistReducer(state=initialState,action:ShoppinglistActions.ShoppingListActions) {
    switch(action.type){
        case ShoppinglistActions.ADD_INGREDIENT:
            return { 
                ...state,
                ingredients:[...state.ingredients,action.payload]
            };

        case ShoppinglistActions.ADD_INGREDIENTS:

        return {
            ...state,
            ingredients:[...state.ingredients,...action.payload]

        };

        case ShoppinglistActions.UPDATE_INGREDIENT:
            const ingredient=state.ingredients[state.editedIngredientItemIndex];
            const updatedIngredient={
                ...ingredient,
                ...action.payload
            };
            const updatedIngredients=[...state.ingredients];
            updatedIngredients[state.editedIngredientItemIndex]=updatedIngredient;
            return {
                ...state,
                ingredients:updatedIngredients,
                editedIngredient:null,
                editedIngredientItemIndex:-1

            };

        case ShoppinglistActions.DELETE_INGREDIENT:


            return {
                ...state,
                ingredients:state.ingredients.filter((ig,igindex)=>{
                 return igindex !==state.editedIngredientItemIndex;
                }),
                editedIngredient:null,
                editedIngredientItemIndex:-1
            };

        case ShoppinglistActions.START_EDIT:
            return {
             ...state,
             editedIngredientItemIndex:action.payload,
             editedIngredient:{...state.ingredients[action.payload]}
            }; 
        case ShoppinglistActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient:null,
                editedIngredientItemIndex:-1
            } ;      
        default:
            return state;  
    

    }
}