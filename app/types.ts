
export interface GuessResult {
  word: string;
  feedback: ('correct' | 'present' | 'absent')[];
}

export interface LetterConstraint {
  letter: string;
  positions: {
    mustBe: number[];
    cannotBe: number[];
  };
  minCount: number;
  maxCount?: number;
}

export interface Suggestion {
  word: string;
  score: number;
}
