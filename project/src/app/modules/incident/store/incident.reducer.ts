import { Incident } from '../model/incident';
import { IncidentActions, incidentActionsType } from './incident.actions';
// import { incidents } from '../data/incidents';

export const INCIDENT_REDUCER_NODE = 'incident';

export interface IncidentState {
  incidentList: Incident[],
}

const initialState: IncidentState = {
  incidentList: [],
}

export const incidentReducer = (state: IncidentState = initialState, action: IncidentActions) => {
  switch(action.type) {
    case incidentActionsType.loadedSuccess:
      return {
        ...state,
        incidentList: action.payload,
      }
    case incidentActionsType.loadedError:
      console.log('Error');
      return {
        ...state,
      }
    case incidentActionsType.createSuccess:
      return {
        ...state,
        incidentList: [
          ...state.incidentList,
          {
            ...action.payload
          }
        ]
      };
    case incidentActionsType.createError:
      console.log('Error');
      return {
        ...state,
      }
    case incidentActionsType.deleteSuccess:
      return {
        ...state,
        incidentList: state.incidentList.filter(item => item._id !== action.payload),
      }
    case incidentActionsType.deleteError:
      console.log('Error');
      return {
        ...state,
      }
    case incidentActionsType.editSuccess:
      return {
        ...state,
        incidentList: state.incidentList.map(item => item._id === action.payload._id? action.payload : item),
      }
    case incidentActionsType.editError:
      console.log('Error');
      return {
        ...state,
      }
    case incidentActionsType.changeAssigneeSuccess:
      console.log(action.payload);
      return {
        ...state,
        incidentList: state.incidentList.map(item => item._id === action.payload._id ? action.payload: item)
      }
    case incidentActionsType.changeAssigneeError:
      console.log('Error');
      return {
        ...state,
      }
    default:
      return state;
  }
};
