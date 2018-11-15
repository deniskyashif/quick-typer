export interface AppState {
  readonly isGameStarted: boolean;
  readonly startTime: Date;
  readonly score: number;
  readonly elapsedSeconds: number;
}

export function getInitialState(): AppState {
  return {
    isGameStarted: false,
    startTime: null,
    score: 0,
    elapsedSeconds: 0
  }
}
