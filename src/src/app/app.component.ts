import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GameState, TypingState } from './state/state';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { StartGame, EndGame, ProcessInput, TimeStep } from './state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  private timer: Subscription;

  readonly gameTimeInSeconds = 60;

  isGameStarted$: Observable<boolean>;
  elapsedSeconds$: Observable<number>;
  score$: Observable<number>;
  text$: Observable<string>;
  typingState$: Observable<TypingState>;

  constructor(private store: Store<GameState>) { }

  ngOnInit() {
    const game$ = this.store.select('game');

    this.isGameStarted$ = game$.pipe(select(s => s.isGameStarted));
    this.elapsedSeconds$ = game$.pipe(select(s => s.elapsedSeconds));
    this.score$ = game$.pipe(select(s => s.score));
    this.text$ = game$.pipe(select(s => s.text));
    this.typingState$ = game$.pipe(select(s => s.typingState));
  }

  startGame() {
    this.store.dispatch(new StartGame(new Date()));

    this.timer = interval(1000)
          .pipe(take(this.gameTimeInSeconds))
          .subscribe(() =>
            this.store.dispatch(new TimeStep(new Date())),
            console.error,
            () => this.store.dispatch(new EndGame(new Date())));
  }

  stopGame() {
    this.timer.unsubscribe();
    this.store.dispatch(new EndGame(new Date()));
  }

  onInputChange(typedText: string) {
    this.store.dispatch(new ProcessInput({ typedText, time: new Date() }));
  }
}
