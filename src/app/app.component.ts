import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GameState, TypingState } from './state/state';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { StartGame, EndGame, ProcessInput, TimeStep, LoadGame } from './state/actions';

@Component({
  selector: 'app-root',
  template: `
<div class="main">
  <h1>Quick Typer</h1>
  <app-details
    [isGameLoading]="isGameLoading$ | async"
    [elapsedSeconds]="elapsedSeconds$ | async"
    [score]="score$ | async">
  </app-details>
  <app-text
    [text]="text$ | async"
    [typingState]="typingState$ | async"
    (typingComplete)="endGame($event)">
  </app-text>
  <app-input (inputChange)="onInputChange($event)"
    [isGameStarted]="isGameStarted$ | async">
  </app-input>
  <app-controls [isGameStarted]="isGameStarted$ | async"
    (start)="startGame($event)"
    (stop)="endGame($event)">
  </app-controls>
</div>
`,
  styles: [`
.main {
  padding: 5px 25px;
  text-align: center;
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  private timer: Subscription;

  isGameStarted$: Observable<boolean>;
  isGameLoading$: Observable<boolean>;
  elapsedSeconds$: Observable<number>;
  score$: Observable<number>;
  text$: Observable<string>;
  typingState$: Observable<TypingState>;

  constructor(private store: Store<GameState>) { }

  ngOnInit() {
    const game$ = this.store.select('game');

    this.isGameStarted$ = game$.pipe(select(s => s.isGameStarted));
    this.isGameLoading$ = game$.pipe(select(s => s.isGameLoading));
    this.elapsedSeconds$ = game$.pipe(select(s => s.elapsedSeconds));
    this.score$ = game$.pipe(select(s => s.score));
    this.text$ = game$.pipe(select(s => s.text));
    this.typingState$ = game$.pipe(select(s => s.typingState));
  }

  startGame(time) {
    this.store.dispatch(new LoadGame());

    this.timer = interval(1000)
          .subscribe(() => this.store.dispatch(new TimeStep(new Date())));
  }

  endGame(time) {
    this.timer.unsubscribe();
    this.store.dispatch(new EndGame(time));
  }

  onInputChange(textAtTime: { typedText: string, time: Date }) {
    this.store.dispatch(new ProcessInput(textAtTime));
  }
}
