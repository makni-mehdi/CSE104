let observer = new MutationObserver(scrollToBottom);
let lot = document.querySelector('.messages')
observer.observe(lot, { childList: true });

function scrollToBottom() {
  lot.scrollTop = lot.scrollHeight;
}

window.onload = ()=>{
    const g = new Game();
    g.play();
}