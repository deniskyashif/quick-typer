import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnChanges {

  @Input()
  isGameStarted: boolean;

  @Output()
  inputChange = new EventEmitter<string>();

  @ViewChild('textInput')
  textInput: ElementRef;

  constructor() { }

  onInputChange(text) {
    this.inputChange.emit(text);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.isGameStarted.currentValue === true) {
      this.textInput.nativeElement.value = '';
      this.textInput.nativeElement.focus();
    }
  }
}
