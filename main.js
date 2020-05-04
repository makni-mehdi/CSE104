let observer = new MutationObserver(scrollToBottom);
let lot = document.querySelector('.messages')
observer.observe(lot, { childList: true });

let g;

function scrollToBottom() {
  lot.scrollTop = lot.scrollHeight;
}

window.onload = ()=>{
    g = new Game();

    let agebtn = document.getElementById("#age")
    agebtn.addEventListener('click', ()=>{g.next_day()})

    g.init()

    play()
}

function play(){
    g.play()
    requestAnimationFrame(play)
}