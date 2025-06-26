
/**
 * Represents the result of a single guess in the Wordle game.
 * @interface GuessResult
 */
export interface GuessResult {
  /** The guessed word. */
  word: string;
  /** An array of feedback for each letter in the guessed word. */
  feedback: ('correct' | 'present' | 'absent')[];
}

/**
 * Defines the constraints for a single letter in the Wordle puzzle.
 * @interface LetterConstraint
 */
export interface LetterConstraint {
  /** The letter for which the constraint applies. */
  letter: string;
  /** The positions where the letter must or must not appear. */
  positions: {
    /** An array of positions where the letter must be. */
    mustBe: number[];
    /** An array of positions where the letter cannot be. */
    cannotBe: number[];
  };
  /** The minimum number of times the letter must appear in the word. */
  minCount: number;
  /** The maximum number of times the letter can appear in the word. */
  maxCount?: number;
}

/**
 * Represents a suggested word and its calculated score.
 * @interface Suggestion
 */
export interface Suggestion {
  /** The suggested word. */
  word: string;
  /** The score of the suggested word, indicating its optimality. */
  score: number;
}
