# Nerdle

[Nerdle](https://guessing-game-app.vercel.app/)

![showcase main page](/nerdle.png)

Nerdle is a clone of [Wordle](https://www.nytimes.com/games/wordle/index.html), the
word guessing game. To play, enter a five-letter English word. This version offers several noteworthy improvements, ensuring a fun and fair gaming experience.

Unlike the original version, this game architecture is designed to be secure from client-side manipulation, eliminating the possibility of cheating. The game's intuitive interface ensures that users can easily understand and enjoy the game, but for those who need extra guidance, a 'how-to-play' page provides detailed explanations and examples. The game's modern and beautiful design enhances the overall user experience.

![demo](/nerdle.gif)

One of the main challenges in developing this game was moving the game logic to the server side, ensuring that players cannot determine the correct word. This adds an extra layer of mystery and excitement to the gameplay.

## Key Features
 - Feedback on Guesses: After the first guess, users receive feedback indicating which letters are correct but in the wrong position, which letters are entirely correct, and which are incorrect. This feature aids in narrowing down the possible word options.
 - Keyboard Input: Users can input their guesses using the keyboard, and the game supports Enter and Backspace for ease of use.
 - Persistent Progress: The current game state is stored in web cookies, allowing users to continue their game and not lose any progress even after closing the tab or refreshing the page.

## Used technologies

- [React](https://react.dev/)
- [Nextjs](https://nextjs.org/)
