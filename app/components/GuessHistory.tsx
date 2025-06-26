
'use client';

import { GuessResult } from '../types';

interface GuessHistoryProps {
    guesses: GuessResult[];
}

export default function GuessHistory({ guesses }: GuessHistoryProps) {
    if (guesses.length === 0) return null;

    return (
        <div className="mt-6">
            <h3 className="text-lg font-medium mb-3 text-gray-800">Your Guesses</h3>
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
