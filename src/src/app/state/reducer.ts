import { GameState, getInitialState } from "./state";
import { ActionsUnion, ActionTypes } from './actions';
import { calculateGrossWpm } from './../services/words-per-minute';

export function reducer(state: GameState = getInitialState(), action: ActionsUnion): GameState {

  switch(action.type) {
      
    case ActionTypes.StartGame:
      return {
        isGameStarted: true,
        startTime: action.payload,
        score: 0,
        remainingSeconds: 60,
        typedText: ''
      };
      
    case ActionTypes.EndGame:
      return {
        ...state,
        isGameStarted: false,
        typedText: ''
      };
      
    case ActionTypes.ProcessGame:
      const { typedText, time } = action.payload;
      const elapsedSeconds = Math.round((time.getTime() - state.startTime.getTime()) / 1000);
      const remainingSeconds = 60 - elapsedSeconds;
      const score = calculateGrossWpm(typedText.length, elapsedSeconds / 60);

      return {
        ...state,
        remainingSeconds,
        score,
        typedText
      };
      
    default:
      return state;
  }
}
