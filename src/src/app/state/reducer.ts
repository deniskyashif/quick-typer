import { AppState, getInitialState } from "./state";
import { ActionsUnion, ActionTypes } from './actions';
import { calculateGrossWpm } from './../services/words-per-minute';

export function reducer(state: AppState = getInitialState(), action: ActionsUnion): AppState {
  switch(action.type) {
    case ActionTypes.StartGame:
      return {
        isGameStarted: true,
        startTime: action.payload,
        score: 0,
        elapsedSeconds: 0
      };
    case ActionTypes.EndGame:
      return {
        ...state,
        isGameStarted: false,
      };
    case ActionTypes.ProcessGame:
      const { entries, time } = action.payload;
      const seconds = Math.floor((time.getTime() - state.startTime.getTime()) / 1000);
      const score = calculateGrossWpm(entries, seconds / 60);
      
      return {
        ...state,
        elapsedSeconds: seconds,
        score: score
      };
    default:
      return state;
  }
}
