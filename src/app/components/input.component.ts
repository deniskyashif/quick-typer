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
  template: `
<p>
  <input #textInput class="text-input"
    [disabled]="!isGameStarted"
    (keyup)="onInputChange(textInput.value)" />
</p>`,
  styles: [`
.text-input {
  font-size: 30px;
  width: 350px;
}`],
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
