import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-controls',
  template: `
<div>
    <button (click)="onStartBtnClick()" *ngIf="!isGameStarted">Start</button>
    <button (click)="onStopBtnClick()" *ngIf="isGameStarted">Reset</button>
</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsComponent {

  @Input()
  isGameStarted: boolean;

  @Output()
  private start = new EventEmitter<Date>();

  @Output()
  private stop = new EventEmitter<Date>();

  constructor() { }

  onStartBtnClick() {
    this.start.emit(new Date());
  }

  onStopBtnClick() {
    this.stop.emit(new Date());
  }
}
