// Time Elements
var timeEl = document.getElementById("time");
var hoursEl = document.getElementById("hours");
var minutesEl = document.getElementById("minutes");
var secondsEl = document.getElementById("seconds");
// Drop Menu Elements
var hoursDropEl = document.getElementById("hoursDrop");
var minutesDropEl = document.getElementById("minutesDrop");
var secondsDropEl = document.getElementById("secondsDrop");
// Button Elements
var startButton = document.getElementById("start-button");
var resetButton = document.getElementById("reset-button");
var pauseButton = document.getElementById("pause-button");
var timeInput = document.getElementsByTagName('input')[0];
// Create & Add Elements
for (var index = 0; index < 60; index++) {
    if (index < 24) {
        var hoursOptionEl = document.createElement("option");
        hoursOptionEl.value = String(index);
        hoursOptionEl.textContent = String(index);
        hoursDropEl === null || hoursDropEl === void 0 ? void 0 : hoursDropEl.appendChild(hoursOptionEl);
    }
    var minutesOptionEl = document.createElement("option");
    minutesOptionEl.value = String(index);
    minutesOptionEl.textContent = String(index);
    minutesDropEl === null || minutesDropEl === void 0 ? void 0 : minutesDropEl.appendChild(minutesOptionEl);
    var secondsOptionEl = document.createElement("option");
    secondsOptionEl.value = String(index);
    secondsOptionEl.textContent = String(index);
    secondsDropEl === null || secondsDropEl === void 0 ? void 0 : secondsDropEl.appendChild(secondsOptionEl);
}
// Create Needed Variables
var seconds = 0;
var minutes = 0;
var hours = 0;
var startCountDown = false;
var paused = false;
var start = function () {
    if (startCountDown === false) {
        seconds = Number(secondsDropEl.value);
        minutes = Number(minutesDropEl.value);
        hours = Number(hoursDropEl.value);
        startCountDown = true;
    }
    if ((secondsEl === null || secondsEl === void 0 ? void 0 : secondsEl.textContent) != null && (minutesEl === null || minutesEl === void 0 ? void 0 : minutesEl.textContent) != null && (hoursEl === null || hoursEl === void 0 ? void 0 : hoursEl.textContent) != null) {
        if (seconds !== 0 || minutes !== 0 || hours !== 0) {
            if ((startButton === null || startButton === void 0 ? void 0 : startButton.getAttribute('disabled')) === null) {
                startButton.setAttribute('disabled', 'true');
            }
            // seconds
            if (seconds in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
                secondsEl.textContent = String(seconds).replace(String(seconds), "0".concat(seconds));
            }
            else {
                secondsEl.textContent = String(seconds).slice(0);
            }
            // minutes
            if (minutes in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
                minutesEl.textContent = String(minutes).replace(String(minutes), "0".concat(minutes));
            }
            else {
                minutesEl.textContent = String(minutes).slice(0);
            }
            // hours
            if (hours in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
                hoursEl.textContent = String(hours).replace(String(hours), "0".concat(hours));
            }
            else {
                hoursEl.textContent = String(hours).slice(0);
            }
            // main functionality
            if (seconds !== 0) {
                seconds -= 1;
            }
            else if (seconds === 0 && minutes !== 0) {
                minutes -= 1;
                seconds = 59;
            }
            else if (minutes === 0 && seconds === 0) {
                hours -= 1;
                minutes = 59;
                seconds = 59;
            }
            var timeout_1 = setTimeout(start, 1000);
            var pause = function () {
                clearTimeout(timeout_1);
                if ((startButton === null || startButton === void 0 ? void 0 : startButton.getAttribute('disabled')) === 'true') {
                    startButton === null || startButton === void 0 ? void 0 : startButton.removeAttribute('disabled');
                }
                paused = true;
            };
            pauseButton === null || pauseButton === void 0 ? void 0 : pauseButton.addEventListener('click', pause);
            var reset = function () {
                seconds = minutes = hours = 0;
                if ((startButton === null || startButton === void 0 ? void 0 : startButton.getAttribute('disabled')) === 'true') {
                    startButton === null || startButton === void 0 ? void 0 : startButton.removeAttribute('disabled');
                }
                if (paused === true) {
                    startCountDown = false;
                    paused = false;
                }
                secondsEl.textContent = String(seconds).replace(String(seconds), "0".concat(seconds));
                minutesEl.textContent = String(minutes).replace(String(minutes), "0".concat(minutes));
                hoursEl.textContent = String(hours).replace(String(hours), "0".concat(hours));
            };
            resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener('click', reset);
        }
        else {
            startCountDown = false;
            secondsEl.textContent = String(seconds).replace(String(seconds), "0".concat(seconds));
            minutesEl.textContent = String(minutes).replace(String(minutes), "0".concat(minutes));
            hoursEl.textContent = String(hours).replace(String(hours), "0".concat(hours));
            if ((startButton === null || startButton === void 0 ? void 0 : startButton.getAttribute('disabled')) === 'true') {
                startButton === null || startButton === void 0 ? void 0 : startButton.removeAttribute('disabled');
            }
        }
    }
};
startButton === null || startButton === void 0 ? void 0 : startButton.addEventListener('click', start);
