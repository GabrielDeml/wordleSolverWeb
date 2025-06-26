'use client';

import React, { Dispatch, SetStateAction } from 'react';

interface GuessInputProps {
    currentGuess: string;
    setCurrentGuess: Dispatch<SetStateAction<string>>;
    currentFeedback: ('correct' | 'present' | 'absent')[];
    updateFeedback: (index: number, feedback: 'correct' | 'present' | 'absent') => void;
    addGuess: () => void;
    reset: () => void;
}

export default function GuessInput({ currentGuess, setCurrentGuess, currentFeedback, updateFeedback, addGuess, reset }: GuessInputProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Enter Your Guess</h2>

            <div className="mb-4">
                <input
                    type="text"
                    value={currentGuess}
                    onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
                    placeholder="Enter 5-letter word"
                    maxLength={5}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg text-center text-xl font-mono uppercase tracking-widest focus:border-blue-500 focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <div className="text-sm font-medium mb-2 text-gray-600">Click to set feedback:</div>
                <div className="flex gap-2 justify-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                const feedbacks: ('correct' | 'present' | 'absent')[] = ['absent', 'present', 'correct'];
                                const currentIndex = feedbacks.indexOf(currentFeedback[index]);
                                const nextFeedback = feedbacks[(currentIndex + 1) % feedbacks.length];
                                updateFeedback(index, nextFeedback);
                            }}
                            className={`w-12 h-12 rounded-lg font-bold text-white text-lg ${
                                currentFeedback[index] === 'correct' ? 'bg-green-500' :
                                currentFeedback[index] === 'present' ? 'bg-yellow-500' :
                                'bg-gray-400'
                            } hover:opacity-80 transition-opacity`}
                        >
                            {currentGuess[index] || '?'}
                        </button>
                    ))}
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                    Gray = Not in word, Yellow = Wrong position, Green = Correct position
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={addGuess}
                    disabled={currentGuess.length !== 5}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                    Add Guess
                </button>
                <button
                    onClick={reset}
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}