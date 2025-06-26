# Wordle Web Solver

This is a [Next.js](https://nextjs.org) project that provides a simple and effective interface for solving Wordle puzzles.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use

1.  Enter your guess in the input field.
2.  Click on the letters to set the feedback (gray, yellow, or green).
3.  Click "Add Guess" to see the optimal suggestions.

## Running Tests

This project uses [vitest](https://vitest.dev/) for testing. To run the tests, use the following command:

```bash
npm test
```

## Project Structure

-   `app/` - Contains the main application code.
    -   `components/` - Contains the React components.
    -   `hooks/` - Contains the custom hooks.
    -   `lib/` - Contains the core solver logic.
    -   `types.ts` - Contains the type definitions.
-   `public/` - Contains the static assets.