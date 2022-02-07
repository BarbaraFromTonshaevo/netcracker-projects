import { User } from '../model/user';
import { UserActions, userActionsType } from './user.actions';
// import { users } from '../data/users';

export const USER_REDUCER_NODE = 'user';

export interface UserState {
  userList: User[],
}

const initialState: UserState = {
  userList: [],
}

export const userReducer = (state: UserState = initialState, action: UserActions) => {
  switch(action.type) {
    case userActionsType.loadedSuccess:
      return {
        ...state,
        userList: action.payload,
      }
    case userActionsType.loadedError:
      return {
        ...state,
      };
    case userActionsType.createSuccess:
      return {
        ...state,
        userList: [
          ...state.userList,
          {
            ...action.payload
          }
        ]
      };
    case userActionsType.createError:
      return {
        ...state,
      };
    case userActionsType.deleteSuccess:
      return {
        ...state,
        userList: state.userList.filter(item => item._id !== action.payload),
      };
    case userActionsType.deleteError:
      return {
        ...state,
      };
    case userActionsType.editSuccess:
      return {
        ...state,
        userList: state.userList.map(item => item._id === action.payload._id? action.payload : item),
      }
    case userActionsType.editError:
      return {
        ...state,
      }
    case userActionsType.addincidentSuccess:
      return {
        ...state,
        userList: state.userList.map(item => item._id === action.payload._id ? action.payload : item),
      }
    case userActionsType.addincidentError:
      return {
        ...state,
      }
    case userActionsType.deleteincidentSuccess:
      return {
        ...state,
        userList: state.userList.map(item => item._id === action.payload._id? action.payload: item),
      }
    case userActionsType.deleteincidentError:
      return {
        ...state,
      }
    default:
      return state;
  }
};
