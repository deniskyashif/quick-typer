import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TextApiService } from '../services/text.api.service';
import { LoadGame, ActionTypes, StartGame } from './actions';
import { exhaustMap, map } from 'rxjs/operators';

@Injectable()
export class GameEffects {

  @Effect()
  get$ = this.actions$.pipe(
    ofType<LoadGame>(ActionTypes.LoadGame),
    exhaustMap(() => this.textApi.getRandomText()
               .pipe(map(text => new StartGame({ text, time: new Date() })))));

  constructor(
    private actions$: Actions,
    private textApi: TextApiService) { }

}
