import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { TypingState } from 'src/app/state/state';

@Component({
  selector: 'app-text',
  template: `
<p>
  <span class="typed-so-far">{{typingState.correct}}</span>
  <span class="mistyped">{{typingState.mistyped}}</span>
  <span class="remaining">{{typingState.remaining}}</span>
</p>`,
  styles: [`
.typed-so-far {
  background-color: lightgreen;
}`,
`.mistyped {
  background-color: red;
}`,
`.remaining {
  background-color: inherit;
}`]
})
export class TextComponent implements OnChanges {

  @Input()
  text: string;

  @Input()
  typingState: TypingState;

  @Output()
  typingComplete = new EventEmitter<Date>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if(this.text && this.typingState.correct === this.text) {
      this.typingComplete.emit(new Date());
    }
  }
}
