import { User } from '../model/user';
import { UserActions, userActionsType } from './user.actions';
import { userListSelector } from './user.selector';


export const USER_REDUCER_NODE = 'user';

export interface UserState {
  userList: User[],
  idIncrement: number;
}

const initialState: UserState = {
  userList: [
    {
      id: 12345,
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
          id: 12345,
          name: "Testing adaptive",
        }
      ]
    },
    {
      id: 12346,
      fullname: {
        name: 'Иван',
        surname: 'Иванов',
        lastname: 'Иванович',
      },
      login: 'vanvan',
      dateOfBirth: new Date(1988, 7, 3),
      position: 'Тестировщик',
    },
    {
      id: 12347,
      fullname: {
        name: 'Александр',
        surname: 'Блок',
        lastname: 'Александрович',
      },
      login: 'block',
      dateOfBirth: new Date(1880, 10, 16),
      position: 'Технический писатель',
    },
    {
      id: 12348,
      fullname: {
        name: 'Теодор',
        surname: 'Драйзер',
        lastname: '',
      },
      login: 'finansist',
      dateOfBirth: new Date(1871, 7, 27),
      position: 'Финансист',
    },
    {
      id: 12349,
      fullname: {
        name: 'Ада',
        surname: 'Лавлейс',
        lastname: '',
      },
      login: 'adalav',
      dateOfBirth: new Date(1815, 10, 27),
      position: 'Разработчик',
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
    case userActionsType.delete:
      return {
        ...state,
        userList: state.userList.filter(item => item.id !== action.payload.id),
      }
    default:
      return state;
  }
};
