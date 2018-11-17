import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
  AfterViewChecked
} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnChanges, AfterViewChecked {

  @Input()
  isGameStarted: boolean;

  @Output()
  inputChange = new EventEmitter<{ typedText: string, time: Date }>();

  @ViewChild('textInput')
  textInput: ElementRef;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const hasGameJustStarted = changes.isGameStarted.previousValue === false
          && changes.isGameStarted.currentValue === true;

    if (hasGameJustStarted) {
      this.textInput.nativeElement.value = '';
    }
  }

  ngAfterViewChecked() {
    if (this.isGameStarted && !this.textInput.nativeElement.value) {
      this.textInput.nativeElement.focus();
    }
  }

  onInputChange(typedText) {
    this.inputChange.emit({ typedText, time: new Date() });
  }
}
