import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TypingState } from 'src/app/state/state';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {

  @Input()
  typingState: TypingState;

  constructor() { }

}
