import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GameState } from './state/state';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { StartGame, EndGame, ProcessGame } from './state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  private timer: Subscription;
  private typedText: string = '';

  isGameStarted$: Observable<boolean>;
  remainingSeconds$: Observable<number>;
  score$: Observable<number>;

  constructor(private store: Store<GameState>) { }

  ngOnInit() {
    const game = this.store.select('game');

    this.isGameStarted$ = game.pipe(select(s => s.isGameStarted));
    this.remainingSeconds$ = game.pipe(select(s => s.remainingSeconds));
    this.score$ = game.pipe(select(s => s.score));
  }

  startGame() {
    this.store.dispatch(new StartGame(new Date()));

    this.timer = interval(1000)
          .pipe(take(60))
          .subscribe(() =>
            this.store.dispatch(new ProcessGame({ typedText: this.typedText, time: new Date() })),
          console.error,
          () => this.store.dispatch(new EndGame()));
  }

  stopGame() {
    this.timer.unsubscribe();
    this.store.dispatch(new EndGame());
  }

  onInputChange(typedText: string) {
    this.typedText = typedText;
    this.store.dispatch(new ProcessGame({ typedText: this.typedText, time: new Date() }));
  }
}
