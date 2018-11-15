import { Component, OnInit } from '@angular/core';
import { AppState } from './state/state';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { StartGame, EndGame, ProcessGame } from './state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Quick Typer';

  isGameStarted$: Observable<boolean>;
  elapsedSeconds$: Observable<number>;
  score$: Observable<number>;

  timer: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    const game = this.store.select('game');

    this.isGameStarted$ = game.pipe(select(s => s.isGameStarted));
    this.elapsedSeconds$ = game.pipe(select(s => s.elapsedSeconds));
    this.score$ = game.pipe(select(s => s.score));
  }

  startGame(time: Date) {
    this.store.dispatch(new StartGame(time));
    this.timer = interval(1000)
          .pipe(take(60))
          .subscribe(n => this.store.dispatch(new ProcessGame({ entries: n, time: new Date() })),
                     console.log,
                     () => this.store.dispatch(new EndGame(new Date())));
  }

  stopGame(date: Date) {
    this.timer.unsubscribe();
    this.store.dispatch(new EndGame(date));
  }
}
