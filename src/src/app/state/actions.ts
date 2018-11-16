import { Action } from '@ngrx/store';

export enum ActionTypes {
  StartGame = '[GAME] Start',
  EndGame = '[GAME] End',
  ProcessGame = '[GAME] Process Game',
};

export class StartGame implements Action {
  readonly type = ActionTypes.StartGame;

  constructor(public payload: Date) { }
}

export class EndGame implements Action {
  readonly type = ActionTypes.EndGame;

  constructor() { }
}

export class ProcessGame implements Action {
  readonly type = ActionTypes.ProcessGame;

  constructor(public payload: { typedText: string, time: Date }) { }
}

export type ActionsUnion = StartGame | EndGame | ProcessGame;
