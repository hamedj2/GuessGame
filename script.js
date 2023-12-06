$(document).ready(function() {
    let lowerBound = 1;
    let upperBound = 100;
    let currentGuess;
    let userName;
    const wrongGuessMessages = [
        "Oops! Missed that one. How about this number?",
        "Not quite right, let's try again!",
        "Hmm, I need to do better. Is it this number?",
        "I guess I was wrong. Maybe this time?",
        "Missed again! Could it be this number?",
        "Nope, not that one. What about this?",
        "I'm not giving up! Is your number this?",
        "Wrong again! Let's try another number.",
        "I must be close now! Is it this?",
        "Another miss. I think this might be it!"
    ];

    function makeGuess() {
        if (lowerBound > upperBound) {
            Swal.fire('Oops!', 'Something went wrong. Let\'s start over.', 'error').then(() => window.location.reload());
            return;
        }
        currentGuess = Math.floor((lowerBound + upperBound) / 2);
        $('#guess-message').text(`Is your number ${currentGuess}?`).show();
    }

    function getRandomWrongMessage() {
        return wrongGuessMessages[Math.floor(Math.random() * wrongGuessMessages.length)];
    }

    $('#start-button').click(function() {
        userName = $('#name-input').val().trim();
        if (userName && /^[a-zA-Z\s]+$/.test(userName)) {
            $('#welcome-message').text(`Let's play, ${userName}!`);
            $('#name-input, #start-button').hide();
            $('#game-section').fadeIn();
            makeGuess();
        } else {
            Swal.fire('Invalid Name', 'Please enter a valid name (letters and spaces only).', 'error');
        }
    });

    $('#higher-button, #lower-button').click(function() {
        if (this.id === 'higher-button') {
            lowerBound = currentGuess + 1;
        } else {
            upperBound = currentGuess - 1;
        }
        makeGuess();
        $('#feedback-message').text(getRandomWrongMessage()).show(); // Update feedback message
    });

    $('#correct-button').click(function() {
        $('#result-message').text(`I guessed it! Your number was ${currentGuess}!`).show();
        $('#game-section').hide();
        Swal.fire({
            title: 'Congratulations to ME!',
            text: 'I guessed your number!',
            icon: 'success',
            confirmButtonText: 'Play Again'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        });
    });
});
