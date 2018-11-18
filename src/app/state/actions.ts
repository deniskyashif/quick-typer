import { Action } from '@ngrx/store';

export enum ActionTypes {
  LoadGame = '[GAME] Load',
  StartGame = '[GAME] Start',
  EndGame = '[GAME] End',
  ProcessInput = '[GAME] Process Input',
  TimeStep = '[GAME] Time Step'
}

export class LoadGame implements Action {
  readonly type = ActionTypes.LoadGame;

  constructor() { }
}

export class StartGame implements Action {
  readonly type = ActionTypes.StartGame;

  constructor(public payload: {text: string, time: Date}) { }
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

export type ActionsUnion = LoadGame | StartGame | EndGame | ProcessInput | TimeStep;
