import { Incident } from '../model/incident';
import { IncidentActions, incidentActionsType } from './incident.actions';


export const INCIDENT_REDUCER_NODE = 'incident';

export interface IncidentState {
  incidentList: Incident[],
  idIncrement: number;
}

const initialState: IncidentState = {
  incidentList: [
    {
      id: 1,
      name: "Testing adaptive",
      assignee: {
        id: 1,
        fullname: {
          name: 'Александра',
          surname: 'Александрова',
          lastname: 'Александровна',
        }
      },
      area: "Web",
      startDate: new Date(2021, 0, 1),
      dueDate: new Date(2021, 3, 10),
      status: 'Закрыто',
    },
    {
      id: 2,
      name: "Create layout design",
      area: "Web",
      startDate: new Date(2021, 6, 22),
      dueDate: new Date(2021, 11, 14),
      status: 'Открыто',
    },
  ]
  ,
  idIncrement: 3,
}

export const incidentReducer = (state: IncidentState = initialState, action: IncidentActions) => {
  switch(action.type) {
    case incidentActionsType.create:
      return {
        ...state,
        idIncrement: state.idIncrement + 1,
        incidentList: [
          ...state.incidentList,
          {
            id: state.idIncrement,
            name:  action.payload.name,
            area:  action.payload.area,
            
            // area: area,
            // дополнить

          }
        ]
      };
    default:
      return state;
  }
};
