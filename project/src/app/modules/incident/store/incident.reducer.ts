import { Incident } from '../model/incident';
import { IncidentActions, incidentActionsType } from './incident.actions';
// import { incidents } from '../data/incidents';
import { act } from '@ngrx/effects';

export const INCIDENT_REDUCER_NODE = 'incident';

export interface IncidentState {
  incidentList: Incident[],
}

const initialState: IncidentState = {
  incidentList: [],
}

export const incidentReducer = (state: IncidentState = initialState, action: IncidentActions) => {
  switch(action.type) {
    case incidentActionsType.create:
      return {
        ...state,
        incidentList: [
          ...state.incidentList,
          {
            _id: 'lhdgfhjk',
            name:  action.payload.name,
            area:  action.payload.area,
            dueDate: action.payload.dueDate,
            startDate: action.payload.startDate,
            assignee: action.payload.assignee,
            priority: action.payload.priority,
            description: action.payload.description,
            status: action.payload.status,
          }
        ]
      };
    case incidentActionsType.delete:
      return {
        ...state,
        incidentList: state.incidentList.filter(item => item._id !== action.payload),
      }
    case incidentActionsType.edit:
      return {
        ...state,
        incidentList: state.incidentList.map(item => item._id === action.payload._id? action.payload : item),
      }
    case incidentActionsType.changeAssignee:
      return {
        ...state,
        incidentList: state.incidentList.map(item => item._id === action.payload.id ? {...item, assignee: action.payload.assignee} : item)
      }
    case incidentActionsType.loadedSuccess:
      console.log('Reducer');
      return {
        ...state,
        incidentList: action.payload,
      }
    case incidentActionsType.loadedError:
      console.log('Error');
      return {
        ...state,
      }
    default:
      return state;
  }
};
