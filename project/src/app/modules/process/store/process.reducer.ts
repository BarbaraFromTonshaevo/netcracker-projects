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
    case processActionsType.delete:
      return {
        ...state,
        // processList: state.processList.map(item => item.id === action.payload.id?{...item, toStatus: item.toStatus.filter(status => status !== action.payload.value)}: item),
      };
    case processActionsType.add:
      // let newToStatus: string[] = [];
      // state.processList.find(item => item.id === action.payload.id)?.toStatus.forEach(status => {
      //   newToStatus.push(status);
      // });
      // newToStatus.push(action.payload.value);
      return {
        ...state,
        // processList: state.processList.map(item => item.id === action.payload.id? {
        //   ...item,
        //   toStatus: newToStatus,
        // }: item),
      };
    case processActionsType.loadedSuccess:
      // console.log('success');
      return {
        ...state,
        // processList: action.payload.processList,
      }
    case processActionsType.loadError:
      // localStorage.setItem('process', JSON.stringify(state));
      // console.log('error');
      // вставить стэйт в локалсторидж
      return {
        ...state,
      }
    default:
      return state;
  }
}
