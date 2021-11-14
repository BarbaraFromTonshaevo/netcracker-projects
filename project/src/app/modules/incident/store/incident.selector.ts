import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IncidentState, INCIDENT_REDUCER_NODE } from "./incident.reducer";

export const incidentFeatureSelector = createFeatureSelector<IncidentState>(INCIDENT_REDUCER_NODE);

export const incidentListSelector = createSelector(
  incidentFeatureSelector,
  state => state.incidentList
);

