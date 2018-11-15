import { Action } from '@ngrx/store';

export enum ActionTypes {
  StartGame = '[GAME] Start',
  EndGame = '[GAME] End',
  ProcessGame = '[GAME] Process'
};

export class StartGame implements Action {
  readonly type = ActionTypes.StartGame;

  constructor(public payload: Date) { }
}

export class EndGame implements Action {
  readonly type = ActionTypes.EndGame;

  constructor(public payload: Date) { }
}

export class ProcessGame implements Action {
  readonly type = ActionTypes.ProcessGame;

  constructor(public payload: { entries: number, time: Date }) { }
}

export type ActionsUnion = StartGame | EndGame | ProcessGame;
