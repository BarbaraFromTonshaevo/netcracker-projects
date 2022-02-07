import { ProcessActions, processActionsType } from "./process.actions";
// import { processData } from "../data/process";
export const PROCESS_REDUCER_NODE = 'process';

export interface Status{
  _id: string,
  position: number,
  status: string,
  toStatus: string[],
}

export interface ProcessState {
  processList: Status[],
}

const initialState: ProcessState = {
  processList: [],
}

export const processReducer = (state:ProcessState = initialState, action: ProcessActions) => {
  switch(action.type) {
    case processActionsType.loadedSuccess:
      return {
        ...state,
        processList: action.payload,
      }
    case processActionsType.loadError:
      return {
        ...state,
      }
    case processActionsType.deleteSuccess:
      return {
        ...state,
        processList: state.processList.map((item) => item._id === action.payload._id? action.payload : item)
      };
    case processActionsType.deleteError:
      return {
        ...state,
      };
    case processActionsType.addSuccess:
      return {
        ...state,
        processList: state.processList.map((item) => item._id === action.payload._id? action.payload : item)
      };
    case processActionsType.addError:
      return {
        ...state,
      };
    default:
      return state;
  }
}
