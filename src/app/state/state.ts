export interface GameState {
  readonly isGameStarted: boolean;
  readonly startTime: Date;
  readonly score: number;
  readonly elapsedSeconds: number;
  readonly text: string;
  readonly typingState: TypingState;
}

export interface TypingState {
  correct: string;
  mistyped: string;
  remaining: string;
}

export function getInitialState(): GameState {
  return {
    isGameStarted: false,
    startTime: null,
    score: 0,
    elapsedSeconds: 0,
    text: '',
    typingState: {
      correct: '',
      mistyped: '',
      remaining: ''
    }
  };
}
