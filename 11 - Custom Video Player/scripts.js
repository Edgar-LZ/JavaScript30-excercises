/* Get our elements */
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/*Build our functions */
function togglePlay() {
    if (video.paused){
        video.play();
    } else {
        video.pause();
    }
    // This can be done in the next way
    // const method = video.paused ? 'play' : 'pause';
    // video[method]();  
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    //console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = video.duration*(e.offsetX / progress.offsetWidth);
    video.currentTime = scrubTime;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click',togglePlay);

window.addEventListener('keydown', e => {
    if (e.keyCode === 32){
        togglePlay();
    }
    if (e.keyCode === 39) {
        video.currentTime+=25;
    }
    if (e.keyCode === 37){
        video.currentTime-=10;
    }
});

skipButtons.forEach(button => button.addEventListener('click',skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown',() => mousedown =  true);
progress.addEventListener('mouseup',() => mousedown =  false);
progress.addEventListener('mouseout',() => mousedown =  false);

