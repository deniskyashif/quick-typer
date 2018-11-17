import { Action } from '@ngrx/store';

export enum ActionTypes {
  StartGame = '[GAME] Start',
  EndGame = '[GAME] End',
  ProcessInput = '[GAME] Process Input',
  TimeStep = '[GAME] Time Step'
}

export class StartGame implements Action {
  readonly type = ActionTypes.StartGame;

  constructor(public payload: Date) { }
}

export class EndGame implements Action {
  readonly type = ActionTypes.EndGame;

  constructor(public payload: Date) { }
}

export class ProcessInput implements Action {
  readonly type = ActionTypes.ProcessInput;

  constructor(public payload: { typedText: string, time: Date }) { }
}

export class TimeStep implements Action {
  readonly type = ActionTypes.TimeStep;

  constructor(public payload: Date) { }
}

export type ActionsUnion = StartGame | EndGame | ProcessInput | TimeStep;
