// Time Elements
const timeEl = document.getElementById("time");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// Drop Menu Elements
const hoursDropEl = document.getElementById("hoursDrop");
const minutesDropEl = document.getElementById("minutesDrop");
const secondsDropEl = document.getElementById("secondsDrop");

// Button Elements
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const pauseButton = document.getElementById("pause-button");
const timeInput = document.getElementsByTagName('input')[0];


// Create & Add Elements
for (let index = 0; index < 60; index++) {

    if (index < 24) {
        const hoursOptionEl = document.createElement("option");
        hoursOptionEl.value = String(index);
        hoursOptionEl.textContent = String(index);
        hoursDropEl?.appendChild(hoursOptionEl);
    }

    const minutesOptionEl = document.createElement("option");
    minutesOptionEl.value = String(index);
    minutesOptionEl.textContent = String(index);
    minutesDropEl?.appendChild(minutesOptionEl);

    const secondsOptionEl = document.createElement("option");
    secondsOptionEl.value = String(index);
    secondsOptionEl.textContent = String(index);
    secondsDropEl?.appendChild(secondsOptionEl);
}

// Create Needed Variables
let seconds = 0
let minutes = 0
let hours = 0
let startCountDown = false;
let paused = false;

const start = () => {
    if (startCountDown === false) {
        seconds = Number((secondsDropEl as HTMLInputElement).value);
        minutes = Number((minutesDropEl as HTMLInputElement).value);
        hours = Number((hoursDropEl as HTMLInputElement).value);
        startCountDown = true;
    }

    if (secondsEl?.textContent != null && minutesEl?.textContent != null && hoursEl?.textContent != null) {
        if (seconds !== 0 || minutes !== 0 || hours !== 0) {
            
            if (startButton?.getAttribute('disabled') === null) {
                startButton.setAttribute('disabled', 'true');
            }

            // seconds
            if (seconds in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
                secondsEl.textContent = String(seconds).replace(String(seconds), `0${seconds}`);
            } else {
                secondsEl.textContent = String(seconds).slice(0);
            }

            // minutes
            if (minutes in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
                minutesEl.textContent = String(minutes).replace(String(minutes), `0${minutes}`);
            } else {
                minutesEl.textContent = String(minutes).slice(0);
            }

            // hours
            if (hours in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
                hoursEl.textContent = String(hours).replace(String(hours), `0${hours}`);
            } else {
                hoursEl.textContent = String(hours).slice(0);
            }
            
            
            // main functionality
            if (seconds !== 0) {
                seconds -= 1;
            } else if (seconds === 0 && minutes !== 0) {
                minutes -= 1;
                seconds = 59;
            } else if (minutes === 0 && seconds === 0) {
                hours -= 1;
                minutes = 59;
                seconds = 59;
            }
            
            const timeout = setTimeout(start, 1000);

            const pause = () => {
                clearTimeout(timeout);
                if (startButton?.getAttribute('disabled') === 'true') {
                    startButton?.removeAttribute('disabled');
                }
                paused = true;
            };
            pauseButton?.addEventListener('click', pause);


            const reset = () => {
                seconds = minutes = hours = 0;
                if (startButton?.getAttribute('disabled') === 'true') {
                    startButton?.removeAttribute('disabled');
                }
                
                if (paused === true) {
                    startCountDown = false;
                    paused = false;
                }

                secondsEl.textContent = String(seconds).replace(String(seconds), `0${seconds}`);
                minutesEl.textContent = String(minutes).replace(String(minutes), `0${minutes}`);
                hoursEl.textContent = String(hours).replace(String(hours), `0${hours}`);
            };
            resetButton?.addEventListener('click', reset);

        } else {
            startCountDown = false;
            secondsEl.textContent = String(seconds).replace(String(seconds), `0${seconds}`);
            minutesEl.textContent = String(minutes).replace(String(minutes), `0${minutes}`);
            hoursEl.textContent = String(hours).replace(String(hours), `0${hours}`);

            if (startButton?.getAttribute('disabled') === 'true') {
                startButton?.removeAttribute('disabled');
            }
        }
    }
};
startButton?.addEventListener('click', start);