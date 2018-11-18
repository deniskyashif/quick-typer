import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TextApiService {

  constructor() { }

  getRandomText(): Observable<string> {
    return of('The quick brown fox jumped over the lazy dog.').pipe(delay(1000));
  }
}
