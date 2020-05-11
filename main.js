let observer = new MutationObserver(scrollToBottom);
let lot = document.querySelector('.list_of_trobbles')
let msg = document.querySelector('.messages')

observer.observe(msg, { childList: true });

let g;

function scrollToBottom() {
  msg.scrollTop = msg.scrollHeight;
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