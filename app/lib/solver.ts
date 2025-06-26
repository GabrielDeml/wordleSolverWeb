
import { LetterConstraint, Suggestion } from '../types';

export function calculateLetterConstraints(guesses: { word: string; feedback: ('correct' | 'present' | 'absent')[] }[]): Map<string, LetterConstraint> {
    const constraints = new Map<string, LetterConstraint>();

    guesses.forEach(({ word, feedback }) => {
        word.split('').forEach((letter, position) => {
            if (!constraints.has(letter)) {
                constraints.set(letter, {
                    letter,
                    positions: { mustBe: [], cannotBe: [] },
                    minCount: 0,
                });
            }

            const constraint = constraints.get(letter)!;

            if (feedback[position] === 'correct') {
                constraint.positions.mustBe.push(position);
                constraint.minCount = Math.max(constraint.minCount, 1);
            } else if (feedback[position] === 'present') {
                constraint.positions.cannotBe.push(position);
                constraint.minCount = Math.max(constraint.minCount, 1);
            } else if (feedback[position] === 'absent') {
                const hasPositiveElsewhere = feedback.some((f, i) =>
                    i !== position && word[i] === letter && (f === 'correct' || f === 'present')
                );
                if (!hasPositiveElsewhere) {
                    constraint.maxCount = 0;
                }
            }
        });
    });

    return constraints;
}

export function filterWords(wordList: string[], letterConstraints: Map<string, LetterConstraint>): string[] {
    if (wordList.length === 0) return [];

    return wordList.filter(word => {
        for (const [letter, constraint] of letterConstraints.entries()) {
            const letterCount = word.split('').filter(l => l === letter).length;

            if (constraint.maxCount !== undefined && letterCount > constraint.maxCount) {
                return false;
            }

            if (letterCount < constraint.minCount) {
                return false;
            }

            for (const mustBePos of constraint.positions.mustBe) {
                if (word[mustBePos] !== letter) {
                    return false;
                }
            }

            for (const cannotBePos of constraint.positions.cannotBe) {
                if (word[cannotBePos] === letter) {
                    return false;
                }
            }
        }

        return true;
    });
}

export function getSuggestions(possibleWords: string[]): Suggestion[] {
    if (possibleWords.length === 0) return [];

    const letterFrequencies = new Map<string, number>();
    const positionFrequencies = new Map<string, number>();

    possibleWords.forEach(word => {
        const seenLetters = new Set<string>();
        word.split('').forEach((letter, position) => {
            if (!seenLetters.has(letter)) {
                letterFrequencies.set(letter, (letterFrequencies.get(letter) || 0) + 1);
                seenLetters.add(letter);
            }
            const posKey = `${letter}_${position}`;
            positionFrequencies.set(posKey, (positionFrequencies.get(posKey) || 0) + 1);
        });
    });

    const calculateWordScore = (word: string): number => {
        let score = 0;
        const wordLetters = new Set(word.split(''));
        score += wordLetters.size * 10;

        wordLetters.forEach(letter => {
            score += letterFrequencies.get(letter) || 0;
        });

        word.split('').forEach((letter, position) => {
            const posKey = `${letter}_${position}`;
            score += (positionFrequencies.get(posKey) || 0) * 0.5;
        });

        return score;
    };

    const wordsToScore = possibleWords.length > 1000
        ? possibleWords.slice(0, 1000)
        : possibleWords;

    return wordsToScore
        .map(word => ({
            word,
            score: calculateWordScore(word)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
}
