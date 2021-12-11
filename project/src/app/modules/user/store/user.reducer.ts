import { User } from '../model/user';
import { UserActions, userActionsType } from './user.actions';
import { users } from '../data/users';

export const USER_REDUCER_NODE = 'user';

export interface UserState {
  userList: User[],
  idIncrement: number;
}

const initialState: UserState = {
  userList: users,
  idIncrement: 12350,
}

export const userReducer = (state: UserState = initialState, action: UserActions) => {
  switch(action.type) {
    case userActionsType.create:
      let count = 0;
      count++;
      return {
        ...state,
        idIncrement: state.idIncrement + 1,
        userList: [
          ...state.userList,
          {
            id: state.idIncrement,
            fullname: {
              name: action.payload.name,
              surname: action.payload.surname,
              lastname: action.payload.lastname,
            },
            login: action.payload.login,
            dateOfBirth: action.payload.dateOfBirth,
            position: action.payload.position,
            incidents: null
          }
        ]
      };
    case userActionsType.delete:
      return {
        ...state,
        userList: state.userList.filter(item => item.id !== action.payload.id),
      };
    case userActionsType.addincident:
      let newIncidents: {id: number, name: string}[] | null = [];
      state.userList.find(item => item.id === action.payload.id)?.incidents?.forEach(item => {
        newIncidents?.push(item);
      });
      newIncidents.push(action.payload.incident);
      return {
        ...state,
        userList: state.userList.map(user => user.id === action.payload.id ?
          {
          ...user,
          incidents: newIncidents,
        }: user)
      }
    case userActionsType.edit:
      return {
        ...state,
        userList: state.userList.map(item => item.id === action.payload.id? action.payload : item),
      }
    case userActionsType.deleteincident:
      return {
        ...state,
        userList: state.userList.map(user => user.id === action.payload.id?
          {
            ...user,
            incidents: user.incidents?.filter(incident => incident.id !== action.payload.incident.id),
          }: user),
      }
    case userActionsType.load:
      let localUserData = localStorage.getItem('user');
      let userData = localUserData? JSON.parse(localUserData) : null;
      return {
        ...state,
        userList: userData? userData.userList : state.userList,
        idIncrement: userData? userData.idIncrement : state.idIncrement,
      }
    default:
      return state;
  }
};
