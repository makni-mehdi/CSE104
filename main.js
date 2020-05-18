"use strict";
let observer = new MutationObserver(scrollToBottom);
let lot = document.querySelector('.list_of_trobbles')
let msg = document.querySelector('.messages')
let popup = new Popup(document.querySelector('#popups'))
let turncount = 0
let last = -1

observer.observe(msg, { childList: true });

let g;
let story;

function scrollToBottom() {
  msg.scrollTop = msg.scrollHeight;
}

window.onload = ()=>{
    g = new Game();

    let agebtn = document.getElementById("#age")
    agebtn.addEventListener('click', ()=>{
        popup.clear_content()
        popup.hide()
        g.next_day()
    })

    //g.new_trobble()

    story = new Story(g)
    play()
}

function play(){
    if (last != turncount) {
        story.event_happen(turncount)
    }
    last = turncount
    g.play()
    requestAnimationFrame(play)
}