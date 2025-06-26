
'use client';

import { GuessResult } from '../types';

/**
 * Props for the GuessHistory component.
 * @interface GuessHistoryProps
 */
interface GuessHistoryProps {
    /** An array of previous guesses. */
    guesses: GuessResult[];
}

/**
 * A component to display the history of guesses.
 * @param {GuessHistoryProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered component, or null if there are no guesses.
 */
export default function GuessHistory({ guesses }: GuessHistoryProps) {
    if (guesses.length === 0) return null;

    return (
        <div className="mt-6">
            <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">Your Guesses</h3>
            <div className="space-y-2">
                {guesses.map((guess, guessIndex) => (
                    <div key={guessIndex} className="flex gap-2 justify-center">
                        {guess.word.split('').map((letter, letterIndex) => (
                            <div
                                key={letterIndex}
                                className={`w-10 h-10 rounded flex items-center justify-center font-bold text-white ${
                                    guess.feedback[letterIndex] === 'correct' ? 'bg-green-500' :
                                    guess.feedback[letterIndex] === 'present' ? 'bg-yellow-500' :
                                    'bg-gray-400'
                                }`}
                            >
                                {letter.toUpperCase()}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
