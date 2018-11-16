import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
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
