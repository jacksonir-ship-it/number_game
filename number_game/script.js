const msgEl = document.getElementById('msg');

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

let randomNum = getRandomNumber();
console.log('Number:', randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();

// Start recognition
recognition.start();

// Function to display spoken message
function writeMessage(msg) {
  msgEl.innerHTML = '';
  const div = document.createElement('div');
  div.textContent = 'You said: ';
  const span = document.createElement('span');
  span.classList.add('box');
  span.textContent = msg;

  msgEl.append(div, span);
}

// Function to check the number
function checkNumber(msg) {
  const wordToNumber = {
    one: 1, won: 1,
    two: 2, to: 2, too: 2,
    three: 3,
    four: 4, for: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8, ate: 8,
    nine: 9,
    ten: 10
  };

  if (wordToNumber[msg.toLowerCase()]) {
    msg = wordToNumber[msg.toLowerCase()];
  }

  let num = Number(msg);

  if (Number.isNaN(num)) {
    msgEl.innerHTML = '';
    const div = document.createElement('div');
    div.textContent = 'That is not a valid number';
    msgEl.append(div);
    return;
  }

  if (num < 1 || num > 100) {
    const div = document.createElement('div');
    div.textContent = 'Number must be between 1 and 100';
    msgEl.append(div);
    return;
  }

  if (num === randomNum) {
    msgEl.innerHTML = '';
    const h2 = document.createElement('h2');
    h2.textContent = `Congrats! You have guessed the number! It was ${num}`;

    const button = document.createElement('button');
    button.classList.add('play-again');
    button.textContent = 'Play Again';
    button.addEventListener('click', () => {
      window.location.reload();
    });

    msgEl.append(h2, button);
  } else if (num > randomNum) {
    const div = document.createElement('div');
    div.textContent = 'GO LOWER';
    msgEl.append(div);
  } else {
    const div = document.createElement('div');
    div.textContent = 'GO HIGHER';
    msgEl.append(div);
  }
}

// Capture speech
function onSpeak(event) {
  const msg = event.results[0][0].transcript;
  console.log('Spoken:', msg);
  writeMessage(msg);
  checkNumber(msg);
}

// Event listener for speech
recognition.addEventListener('result', onSpeak);

// Restart recognition after it ends
recognition.addEventListener('end', () => recognition.start());

