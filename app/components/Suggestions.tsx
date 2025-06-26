
'use client';

import { Dispatch, SetStateAction } from 'react';
import { Suggestion } from '../types';

interface SuggestionsProps {
    suggestions: Suggestion[];
    possibleWords: string[];
    setCurrentGuess: Dispatch<SetStateAction<string>>;
}

export default function Suggestions({ suggestions, possibleWords, setCurrentGuess }: SuggestionsProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Optimal Suggestions</h2>
                <div className="text-sm text-gray-600">
                    {possibleWords.length} possible words
                    {possibleWords.length > 1000 && (
                        <div className="text-xs text-orange-600">
                            (showing top 1000 for performance)
                        </div>
                    )}
                </div>
            </div>

            {suggestions.length > 0 ? (
                <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={suggestion.word}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => setCurrentGuess(suggestion.word.toUpperCase())}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                </div>
                                <div className="font-mono text-xl font-bold uppercase tracking-wider">
                                    {suggestion.word}
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">
                                Score: {Math.round(suggestion.score)}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-8">
                    {possibleWords.length === 0 ? 'No possible words remain.' : 'Calculating suggestions...'}
                </div>
            )}

            {possibleWords.length === 1 && (
                <div className="mt-4 p-4 bg-green-100 border border-green-200 rounded-lg">
                    <div className="text-green-800 font-bold text-center">
                        🎉 Found the answer: <span className="font-mono text-xl">{possibleWords[0].toUpperCase()}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
