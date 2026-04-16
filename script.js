const volumeDisplay = document.getElementById('volumeDisplay');
const hintDisplay = document.getElementById('hint');
const inputField = document.getElementById('sequenceInput');
const submitBtn = document.getElementById('submitBtn');
const audioFileInput = document.getElementById('audioFileInput');
const audioPlayer = document.getElementById('audioPlayer');
const volumeBar = document.getElementById('volumeBar');

let volume = 0;
audioPlayer.volume = volume;

// Riddles array
const riddles = [
  { q: "I start small at 1 and double myself again and again. By the time I’ve doubled 10 times, I finally leap past 1000. What number did I become?", a: "1024" },
  { q: "Take all the odd numbers between 1 and 10, square them, and add them up. What secret number do you find?", a: "35" },
  { q: "Imagine a staircase with 5 steps. On each step, you place coins equal to the step number. How many coins are there in total?", a: "15" },
  { q: "I am small at 1, but each time I multiply by 3, I grow rapidly. After doing this 7 times, what giant number am I?", a: "2187" },
  { q: "Between 1 and 50, I only accept multiples of 7. When I gather them all and add them together, what number emerges?", a: "196" },
  { q: "I count numbers starting from 1, but only as long as my square doesn’t exceed 500. How many numbers can I count before stopping?", a: "22" },
  { q: "I am the product of all numbers from 1 to 6. What mighty number am I?", a: "720" },
  { q: "Four rows of chairs, each row with three seats. If you count each seat, how many seats are there in total?", a: "12" },
  { q: "Starting at 2, I triple every time. After repeating this 5 times, what huge number stands at the end?", a: "486" },
  { q: "I am the sum of powers of 2 from the zeroth to the fifth. Can you tell me what I total?", a: "63" }
];

let currentRiddleIndex = 0;

function updateBackground(vol) {
  const brightness = Math.floor(vol * 255);
  document.body.style.backgroundColor = `rgb(${brightness}, ${brightness}, 255)`;
  volumeDisplay.textContent = `Volume: ${Math.round(vol * 100)}%`;
  volumeBar.style.width = `${Math.round(vol * 100)}%`;
}

function getRandomIncrement() {
  return Math.random() * 0.2; 
}

function showRiddle() {
  if (currentRiddleIndex >= riddles.length) currentRiddleIndex = 0;
  hintDisplay.textContent = riddles[currentRiddleIndex].q;
}

// checkAnswer: silent volume changes (no alerts)
function checkAnswer() {
  const userAnswer = inputField.value.trim();
  if (!audioPlayer.src) return;

  if (userAnswer === riddles[currentRiddleIndex].a) {
    volume += getRandomIncrement();
    if (volume > 1) volume = 1;
    audioPlayer.volume = volume;
    currentRiddleIndex++;
    showRiddle();
  } else {
    volume = 0;
    audioPlayer.volume = volume;
  }

  updateBackground(volume);
  inputField.value = "";
}

submitBtn.addEventListener('click', checkAnswer);
inputField.addEventListener('keypress', e => { if(e.key === "Enter") checkAnswer(); });

audioFileInput.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    audioPlayer.src = url;
    audioPlayer.loop = true;        // <-- audio loops continuously
    audioPlayer.style.display = "block";
    audioPlayer.play();
  }
});

updateBackground(volume);
showRiddle();