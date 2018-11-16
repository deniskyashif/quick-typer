export interface GameState {
  readonly isGameStarted: boolean;
  readonly startTime: Date;
  readonly score: number;
  readonly remainingSeconds: number;
  readonly typedText: string;
}

export function getInitialState(): GameState {
  return {
    isGameStarted: false,
    startTime: null,
    score: 0,
    remainingSeconds: 60,
    typedText: ''
  }
}
