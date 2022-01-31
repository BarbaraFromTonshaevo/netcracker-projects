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
    case userActionsType.create:
      let count = 0;
      count++;
      return {
        ...state,
        // idIncrement: state.idIncrement + 1,
        // userList: [
        //   ...state.userList,
        //   {
        //     id: state.idIncrement,
        //     fullname: {
        //       name: action.payload.name,
        //       surname: action.payload.surname,
        //       lastname: action.payload.lastname,
        //     },
        //     login: action.payload.login,
        //     dateOfBirth: action.payload.dateOfBirth,
        //     position: action.payload.position,
        //     incidents: []
        //   }
        // ]
      };
    case userActionsType.delete:
      return {
        ...state,
        // userList: state.userList.filter(item => item.id !== action.payload),
      };
    case userActionsType.addincident:
      // console.log(action.payload.incident);
      // let newIncidents: {id: number, name: string}[] | null = [];
      // state.userList.find(item => item.id === action.payload.id)?.incidents?.forEach(item => {
      //   newIncidents?.push(item);
      // });
      // newIncidents.push(action.payload.incident);
      return {
        ...state,
        // userList: state.userList.map(user => user.id === action.payload.id ?
        //   {
        //   ...user,
        //   incidents: newIncidents,
        // }: user)
      }
    case userActionsType.edit:
      return {
        ...state,
        // userList: state.userList.map(item => item.id === action.payload.id? action.payload : item),
      }
    case userActionsType.deleteincident:
      // console.log(action.payload.incident);
      return {
        ...state,
        // userList: state.userList.map(user => user.id === action.payload.id?
        //   {
        //     ...user,
        //     incidents: user.incidents?.filter(incident => incident.id !== action.payload.incident.id),
        //   }: user),
      }
    case userActionsType.loadedSuccess:
      return {
        ...state,
        // userList: action.payload.userList,
        // idIncrement: action.payload.idIncrement,
      }
    case userActionsType.loadedError:
      // localStorage.setItem('user', JSON.stringify(state));
      return {
        ...state,
      };
    default:
      return state;
  }
};
