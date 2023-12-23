const prompt = require('prompt-sync')();

/**
 * @function getRandomCard - Get a random card type (fire, water, grass).
 * @returns {string} A randomly chosen card type.
 */
function getRandomCard() {
    const types = ['fire', 'water', 'grass'];
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
}

/**
 * @function determineWinner - Determine the winner of a round based on the chosen cards.
 * @param {string} trainerCard - The card chosen by the user (nicknamed Trainer).
 * @param {string} red_s_card - The card chosen by the program (nicknamed Red) .
 * @returns {string} The winner of the round (Trainer, Red, or Tie).
 */
function determineWinner(trainerCard, red_s_card) {
    if (trainerCard === red_s_card) {
        return 'Tie';
    } else if (
        (trainerCard === 'fire' && red_s_card === 'grass') ||
        (trainerCard === 'grass' && red_s_card === 'water') ||
        (trainerCard === 'water' && red_s_card === 'fire')
    ) {
        return 'Trainer';
    } else {
        return 'Red';
    }
}

/**
 * @function play  - Play a single round of the game.
 * @returns {string} The winner of the round (Trainer, Red, or Tie).
 */
function playRound() {
    console.log('Champion Red challenged you to battle');
    console.log('What will you do?');

    let trainerCard;
    while (!['fire', 'water', 'grass'].includes(trainerCard)) {
        trainerCard = prompt('Choose your card (fire, water, grass): ').toLowerCase();
        if (!['fire', 'water', 'grass'].includes(trainerCard)) {
            console.log('Invalid card. Please choose a valid card.');
        }
    } 

    const red_s_card = getRandomCard();
    console.log(`Red chose: ${red_s_card}`);
    if (trainerCard === red_s_card) {
        console.log('It\'s not very effective...');
    } else {
        console.log('It\'s super effective!');
    }

    const winner = determineWinner(trainerCard, red_s_card);
    if (winner === 'Tie') {
        console.log('Tie!');
    } else {
        console.log(`${winner} wins the round!`);
    }

    return winner;
}

/**
 * @function playGame - Play the full game consisting of multiple rounds.
 */
function playGame() {
    let trainerScore = 0;
    let redScore = 0;

    for (let round = 1; round <= 3; round++) {
        console.log(`\nRound ${round}`);
        const roundWinner = playRound();

        if (roundWinner === 'Trainer') {
            trainerScore++;
        } else if (roundWinner === 'Red') {
            redScore++;
        }
    }

    console.log('\nEnd of the game!');
    console.log(`Final Score - Trainer: ${trainerScore}, Red: ${redScore}`);

    if (trainerScore > redScore) {
        console.log('You won the game!');
    } else if (trainerScore < redScore) {
        console.log('Red won the game!');
    } else {
        console.log('The game is a tie!');
    }
}

/**
 * @function playAgain - Ask the user if they want to play again.
 * @returns {boolean} True if the user wants to play again, false otherwise.
 */
function playAgain() {
    const answer = prompt('Do you want to play again? (Yes/No): ').toLowerCase();
    return answer === 'yes';
}

do {
    playGame();
} while (playAgain());