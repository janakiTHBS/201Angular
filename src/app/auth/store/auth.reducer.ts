import { UserModel } from '../user.model';


export interface AuthState {
  user:UserModel;
}


const initialState={
user:null
}
 

export function AuthReducer(state=initialState,action){

    return state;

}