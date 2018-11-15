import { calculateGrossWpm } from './words-per-minute.service';

describe('Gross Words Per Minute Calculator', () => {

  it('typing 200 characters in 1 minute should calculate gross 40 wpm', () => {
    const expected = 40;
    const actual = calculateGrossWpm(200, 1);

    expect(actual).toEqual(expected);
  });

  it('typing 100 characters in 2 minutes should calculate gross 10 wpm', () => {
    const expected = 10;
    const actual = calculateGrossWpm(100, 2);

    expect(actual).toEqual(expected);
  });

  it('typing 990 characters in 2.5 minutes should calculate gross 79 wpm', () => {
    const expected = 79;
    const actual = calculateGrossWpm(990, 2.5);

    expect(actual).toEqual(expected);
  });
});
