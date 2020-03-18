let countdown;
const timerDisplay =  document.querySelector('.display__time-left');
const buttons = document.querySelectorAll('[data-time]');
function timer(seconds){
    countdown && clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds *1000;
    displayTimeLeft(seconds);
    countdown = setInterval(()=> {
        const secondsLeft = Math.round((then - Date.now()) /1000);
        if(secondsLeft < 0){
            clearInterval(countdown);     
            return;
        }
        displayTimeLeft(secondsLeft);
    },1000);
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSecs = seconds%60;
    const display = `${minutes}:${remainderSecs < 10 ? '0'+remainderSecs : remainderSecs }`;
    timerDisplay.textContent = display;  
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    const mins = parseInt(this.minutes.value);
    timer(mins*60);
    this.reset();
});
