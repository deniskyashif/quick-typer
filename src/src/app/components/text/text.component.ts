import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { TypingState } from 'src/app/state/state';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
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
