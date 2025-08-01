
'use client';

import { useWordleSolver } from './hooks/useWordleSolver';
import GuessInput from './components/GuessInput';
import Suggestions from './components/Suggestions';
import GuessHistory from './components/GuessHistory';

/**
 * The main page of the Wordle Solver application.
 * @returns {JSX.Element} The rendered page.
 */
export default function WordleSolver() {
    const {
        loading,
        guesses,
        currentGuess,
        setCurrentGuess,
        currentFeedback,
        updateFeedback,
        addGuess,
        reset,
        possibleWords,
        suggestions,
    } = useWordleSolver();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading word list...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
                    🎯 Wordle Solver
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <GuessInput
                            currentGuess={currentGuess}
                            setCurrentGuess={setCurrentGuess}
                            currentFeedback={currentFeedback}
                            updateFeedback={updateFeedback}
                            addGuess={addGuess}
                            reset={reset}
                        />
                        <GuessHistory guesses={guesses} />
                    </div>
                    <Suggestions
                        suggestions={suggestions}
                        possibleWords={possibleWords}
                        setCurrentGuess={setCurrentGuess}
                    />
                </div>

                <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
                    <p className="text-sm">
                        This solver uses letter frequency analysis and position-based scoring to suggest the most statistically optimal words.
                        Green = correct position, Yellow = wrong position, Gray = not in word.
                    </p>
                </div>
            </div>
        </div>
    );
}
