import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent {

  @Input()
  gameTimeInSeconds: number;

  @Input()
  elapsedSeconds: number;

  @Input()
  score: number;

  constructor() { }
}
