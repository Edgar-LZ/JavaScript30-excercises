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
    console.log(this.dataset.skip);

}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
skipButtons.forEach(button => button.addEventListener('click',skip));
toggle.addEventListener('click',togglePlay);
window.addEventListener('keydown', e => {
    if (e.keyCode === 32){
        togglePlay();
    }
});