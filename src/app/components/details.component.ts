import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  template: `
<p *ngIf="!isGameLoading">
  <span><strong>Elapsed:</strong>&nbsp; {{elapsedSeconds}} sec</span>&nbsp;
  <span><strong>WPM:</strong>&nbsp; {{score}}</span>
</p>
<p *ngIf="isGameLoading">
  Loading...
</p>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent {

  @Input()
  isGameLoading: boolean;

  @Input()
  elapsedSeconds: number;

  @Input()
  score: number;

  constructor() { }
}
