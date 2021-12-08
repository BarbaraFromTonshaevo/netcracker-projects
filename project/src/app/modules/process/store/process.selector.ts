import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProcessState, PROCESS_REDUCER_NODE } from "./process.reducer";

export const processFeatureSelector = createFeatureSelector<ProcessState>(PROCESS_REDUCER_NODE);

export const processListSelector = createSelector(
  processFeatureSelector,
  state => state.processList
);

