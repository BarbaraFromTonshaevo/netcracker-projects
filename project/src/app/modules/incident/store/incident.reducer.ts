import { Incident } from '../model/incident';
import { IncidentActions, incidentActionsType } from './incident.actions';
import { incidents } from '../data/incidents';
import { act } from '@ngrx/effects';

export const INCIDENT_REDUCER_NODE = 'incident';

export interface IncidentState {
  incidentList: Incident[],
  idIncrement: number;
}

const initialState: IncidentState = {
  incidentList: incidents,
  idIncrement: 54327,
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
            dueDate: action.payload.dueDate,
            startDate: action.payload.startDate,
            assignee: action.payload.assignee,
            priority: action.payload.priority,
            description: action.payload.description,
            status: 'Открыто',
          }
        ]
      };
    case incidentActionsType.delete:
      return {
        ...state,
        incidentList: state.incidentList.filter(item => item.id !== action.payload.id),
      }
    case incidentActionsType.edit:
      return {
        ...state,
        incidentList: state.incidentList.map(item => item.id === action.payload.id? action.payload : item),
      }
    case incidentActionsType.changeAssignee:
      return {
        ...state,
        incidentList: state.incidentList.map(item => item.id === action.payload.id ? {...item, assignee: action.payload.assignee} : item)
      }
    case incidentActionsType.loadedSuccess:
      return {
        ...state,
        incidentList: action.payload.incidentList,
        idIncrement: action.payload.idIncrement,
      }
    case incidentActionsType.loadedError:
      localStorage.setItem('incident', JSON.stringify(state));
      return {
        ...state,
      }
    default:
      return state;
  }
};
