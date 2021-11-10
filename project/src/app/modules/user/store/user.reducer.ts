import { User } from '../model/user';
import { UserActions, userActionsType } from './user.actions';


export const USER_REDUCER_NODE = 'user';

export interface UserState {
  userList: User[],
  idIncrement: number;
}

const initialState: UserState = {
  userList: [
    {
      id: 1,
      fullname: {
        name: 'Александра',
        surname: 'Александрова',
        lastname: 'Александровна',
      },
      login: 'alex17',
      dateOfBirth: new Date(1996, 3, 17),
      position: 'Старший дизайнер',
      incidents: [
        {
          id: 1,
          name: "Testing adaptive",
        }
      ]
    },
    {
      id: 2,
      fullname: {
        name: 'Иван',
        surname: 'Иванов',
        lastname: 'Иванович',
      },
      login: 'vanvan',
      dateOfBirth: new Date(1988, 7, 3),
      position: 'Тестировщик',
    },
  ]
  ,
  idIncrement: 3,
}

export const userReducer = (state: UserState = initialState, action: UserActions) => {
  switch(action.type) {
    case userActionsType.create:
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
          }
        ]
      };
    default:
      return state;
  }
};
