import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState, USER_REDUCER_NODE } from "./user.reducer";

export const userFeatureSelector = createFeatureSelector<UserState>(USER_REDUCER_NODE);

export const userListSelector = createSelector(
  userFeatureSelector,
  state => state.userList
);






