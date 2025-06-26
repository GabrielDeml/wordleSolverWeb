'use client';

import { useState, useEffect, useMemo } from 'react';
import { GuessResult, Suggestion } from '../types';
import { calculateLetterConstraints, filterWords, getSuggestions } from '../lib/solver';

/**
 * A custom hook to manage the state and logic of the Wordle solver.
 * @returns {object} An object containing the state and functions for the Wordle solver.
 */
export function useWordleSolver() {
    const [wordList, setWordList] = useState<string[]>([]);
    const [possibleWords, setPossibleWords] = useState<string[]>([]);
    const [guesses, setGuesses] = useState<GuessResult[]>([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [currentFeedback, setCurrentFeedback] = useState<('correct' | 'present' | 'absent')[]>(Array(5).fill('absent'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /**
         * Loads the list of valid Wordle words from the server.
         */
        const loadWords = async () => {
            try {
                const response = await fetch('/valid-wordle-words.txt');
                const text = await response.text();
                const words = text
                    .split('\n')
                    .map(word => word.trim().toLowerCase())
                    .filter(word => word.length === 5);

                setWordList(words);
                setPossibleWords(words);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load word list:', error);
                setLoading(false);
            }
        };

        loadWords();
    }, []);

    const letterConstraints = useMemo(() => calculateLetterConstraints(guesses), [guesses]);

    const filteredWords = useMemo(() => filterWords(wordList, letterConstraints), [wordList, letterConstraints]);

    useEffect(() => {
        setPossibleWords(filteredWords);
    }, [filteredWords]);

    const suggestions = useMemo(() => getSuggestions(possibleWords), [possibleWords]);

    /**
     * Adds the current guess to the list of guesses.
     */
    const addGuess = () => {
        if (currentGuess.length === 5) {
            setGuesses([...guesses, { word: currentGuess.toLowerCase(), feedback: [...currentFeedback] }]);
            setCurrentGuess('');
            setCurrentFeedback(Array(5).fill('absent'));
        }
    };

    /**
     * Updates the feedback for a letter in the current guess.
     * @param {number} index - The index of the letter to update.
     * @param {'correct' | 'present' | 'absent'} feedback - The feedback for the letter.
     */
    const updateFeedback = (index: number, feedback: 'correct' | 'present' | 'absent') => {
        const newFeedback = [...currentFeedback];
        newFeedback[index] = feedback;
        setCurrentFeedback(newFeedback);
    };

    /**
     * Resets the solver to its initial state.
     */
    const reset = () => {
        setGuesses([]);
        setCurrentGuess('');
        setCurrentFeedback(Array(5).fill('absent'));
        setPossibleWords(wordList);
    };

    return {
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
    };
}
