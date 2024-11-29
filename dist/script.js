let breakDecrement = document.getElementById('break-decrement');
let breakIncrement = document.getElementById('break-increment');
let sessionDecrement = document.getElementById('session-decrement');
let sessionIncrement = document.getElementById('session-increment');
let breakLengthInput = document.getElementById('break-length');
let sessionLengthInput = document.getElementById('session-length');
let timerLabel = document.getElementById('timer-label');
let timeLeftDisplay = document.getElementById('time-left');
let startStopButton = document.getElementById('start_stop');
let resetButton = document.getElementById('reset');
let app = document.getElementById('app');

let breakLength = 5;
let sessionLength = 25;
let timeLeft = sessionLength * 60;
let timerInterval = null;
let isRunning = false;
let isSession = true;

function updateDisplays() {
    breakLengthInput.value = breakLength;
    sessionLengthInput.value = sessionLength;
    timeLeftDisplay.textContent = formatTime(timeLeft);
}

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}

function decrementBreak() {
    if (breakLength > 1) {
        breakLength--;
        updateDisplays();
    }
}

function incrementBreak() {
    if (breakLength < 60) {
        breakLength++;
        updateDisplays();
    }
}

function decrementSession() {
    if (sessionLength > 1) {
        sessionLength--;
        timeLeft = sessionLength * 60;
        updateDisplays();
    }
}

function incrementSession() {
    if (sessionLength < 60) {
        sessionLength++;
        timeLeft = sessionLength * 60;
        updateDisplays();
    }
}

function startStopTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startStopButton.textContent = '▶️';
    } else {
        isRunning = true;
        startStopButton.textContent = '⏸';
        timerInterval = setInterval(countDown, 1000);
    }
}

function countDown() {
    if (timeLeft > 0) {
        timeLeft--;
        timeLeftDisplay.textContent = formatTime(timeLeft);
    } else {
        triggerFlash(); // フラッシュを開始
        if (isSession) {
            isSession = false;
            timerLabel.textContent = 'Break';
            timeLeft = breakLength * 60;
        } else {
            isSession = true;
            timerLabel.textContent = 'Session';
            timeLeft = sessionLength * 60;
        }
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isSession = true;
    breakLength = 5;
    sessionLength = 25;
    timeLeft = sessionLength * 60;
    timerLabel.textContent = 'Session';
    updateDisplays();
    startStopButton.textContent = '▶️';
    clearFlash(); // フラッシュを停止
}

// 画面全体をフラッシュさせる関数
function triggerFlash() {
    let flashes = 0; // フラッシュ回数のカウント
    let flashInterval = setInterval(() => {
        if (flashes < 10) { // 2秒間で10回フラッシュ
            app.style.backgroundColor = flashes % 2 === 0 ? 'red' : '#1e4f54';
            flashes++;
        } else {
            clearInterval(flashInterval); // フラッシュ終了
            app.style.backgroundColor = '#1e4f54'; // 元の背景色に戻す
        }
    }, 200); // 1秒間に5回（200msごとに切り替え）
}

// フラッシュを停止する関数（リセット用）
function clearFlash() {
    app.style.backgroundColor = '#1e4f54'; // 元の背景色に戻す
}

breakDecrement.addEventListener('click', decrementBreak);
breakIncrement.addEventListener('click', incrementBreak);
sessionDecrement.addEventListener('click', decrementSession);
sessionIncrement.addEventListener('click', incrementSession);
startStopButton.addEventListener('click', startStopTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplays();