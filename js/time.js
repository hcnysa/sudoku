let timerInterval;
let elapsedSeconds = 0;
let isPaused = true;
let clickCount = 0;

function startTimer() {
  if (!isPaused) return; // 如果计时器已经在运行，则不执行任何操作
  isPaused = false;
  timerInterval = setInterval(() => {
    elapsedSeconds++;
    document.getElementById('timer').textContent = "Time: " + formatTime(elapsedSeconds);
  }, 1000); // 每秒更新一次
}

function pauseTimer() {
    if(clickCount % 2 == 0){
        isPaused = true;
        clearInterval(timerInterval);
        document.getElementById('pause').textContent = "开始计时";
    }else{
        startTimer();
        document.getElementById('pause').textContent = "暂停计时";
    }
    clickCount++;
}

function resetTimer() {
  isPaused = true;
  clearInterval(timerInterval);
  elapsedSeconds = 0;
  document.getElementById('timer').textContent = "00:00:00";
}

function formatTime(totalSeconds) {
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  let seconds = totalSeconds - (hours * 3600) - (minutes * 60);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

window.onload = startTimer();

// document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
// document.getElementById('reset').addEventListener('click', resetTimer);
