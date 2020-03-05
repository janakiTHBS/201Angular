import { UserModel } from '../user.model';
import * as AuthActions from '../store/auth.actions';

export interface AuthState {
  user:UserModel,
  authError:string,
  loading:boolean
}


const initialState={
user:null,
authError:null,
loading:false
};
 

export function AuthReducer(state=initialState,action:AuthActions.AuthActions){

switch(action.type){
  case AuthActions.AUTHENTICATION_SUCCESS:
    const user=new UserModel(action.payload.email,
      action.payload.userId,
      action.payload.token,
      action.payload.expirationDate)
    return {
     ...state,
     user:user,
     authError:null,
     loading:false
    };

  case AuthActions.LOG_OUT:
    return {
      ...state,
      user:null

    };

    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
         ...state,
         authError:null,
         loading:true
      };
     
      case AuthActions.AUTHENTICATION_FAIL:
        return {
       ...state,
       user:null,
       authError:action.payload,
       loading:false
        };
        case AuthActions.CLEAR_ERROR:
          return {
            ...state,
            authError:null
          }
    default:
    return state;

  }

}