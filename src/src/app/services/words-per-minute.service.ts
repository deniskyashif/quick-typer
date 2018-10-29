import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordsPerMinuteService {

  constructor() { }

  calculateGrossWpm(typedEntries: number, minutes: number) {
    return Math.round((typedEntries / 5) / minutes);
  }
}
