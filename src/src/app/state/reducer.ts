import { GameState, getInitialState, TypingState } from "./state";
import { ActionsUnion, ActionTypes } from './actions';
import { calculateGrossWpm } from './../services/words-per-minute';

export function reducer(state: GameState = getInitialState(), action: ActionsUnion): GameState {

  switch(action.type) {
    case ActionTypes.StartGame:
      const text = 'The brown fox jumped over the crazy dog.';
      return {
        isGameStarted: true,
        startTime: action.payload,
        score: 0,
        elapsedSeconds: 0,
        text,
        typingState: {
          correct: '',
          mistyped: '',
          remaining: text
        }
      };

    case ActionTypes.EndGame:
      const elapsedSeconds = getSecondsInRange(state.startTime, action.payload);

      return {
        ...state,
        isGameStarted: false,
        elapsedSeconds,
        score: calculateGrossWpm(state.typingState.correct.length, elapsedSeconds / 60)
      };

    case ActionTypes.TimeStep:
      const elapsedSecondsAtTimeStep = getSecondsInRange(state.startTime, action.payload);

      return {
        ...state,
        elapsedSeconds: elapsedSecondsAtTimeStep,
        score: calculateGrossWpm(state.typingState.correct.length, elapsedSecondsAtTimeStep / 60)
      };

    case ActionTypes.ProcessInput:
      debugger;
      const { typedText, time } = action.payload;
      const elapsedSecondsAtProcessInput = getSecondsInRange(state.startTime, time)
      const typingState = inferTypingState(state.text, typedText);

      return {
        ...state,
        elapsedSeconds: elapsedSecondsAtProcessInput,
        score: calculateGrossWpm(typingState.correct.length, elapsedSecondsAtProcessInput / 60),
        typingState
      };

    default:
      return state;
  }
}

function getSecondsInRange(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / 1000);
}

function inferTypingState(text: string, typedText: string): TypingState {
  let correct = '', mistyped = '', remaining = '';

  for(let i = 0; i < text.length; i++) {
    const char = text[i];

    if(i < typedText.length) {
      if(!mistyped.length && typedText[i] === char) {
        correct += char;
      } else {
        mistyped += char;
      }
    } else {
      remaining += char;
    }
  }

  return { correct, mistyped, remaining };
}
