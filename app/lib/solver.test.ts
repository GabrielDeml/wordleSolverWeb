
import { describe, it, expect } from 'vitest';
import { calculateLetterConstraints, filterWords, getSuggestions } from './solver';

describe('Wordle Solver Logic', () => {
    const wordList = ['apple', 'apply', 'angle', 'baker', 'crane'];

    it('calculates letter constraints correctly', () => {
        const guesses = [
            { word: 'crane', feedback: ['correct', 'absent', 'absent', 'present', 'absent'] as ('correct' | 'present' | 'absent')[] },
        ];
        const constraints = calculateLetterConstraints(guesses);

        expect(constraints.get('c')?.positions.mustBe).toEqual([0]);
        expect(constraints.get('r')?.maxCount).toBe(0);
        expect(constraints.get('a')?.maxCount).toBe(0);
        expect(constraints.get('n')?.positions.cannotBe).toEqual([3]);
        expect(constraints.get('e')?.maxCount).toBe(0);
    });

    it('filters words based on constraints', () => {
        const wordList = ['cigar', 'cilia', 'civic', 'crass'];
        const guesses = [
            { word: 'crane', feedback: ['correct', 'absent', 'present', 'absent', 'absent'] as ('correct' | 'present' | 'absent')[] },
        ];
        const constraints = calculateLetterConstraints(guesses);
        const filtered = filterWords(wordList, constraints);

        expect(filtered).toEqual(['cilia']);
    });

    it('generates suggestions', () => {
        const suggestions = getSuggestions(wordList);
        expect(suggestions.length).toBeGreaterThan(0);
        expect(suggestions[0].word).toBeDefined();
        expect(suggestions[0].score).toBeDefined();
    });
});
