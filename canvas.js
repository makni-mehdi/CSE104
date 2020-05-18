"use strict";

// Creation of the canvas
const canvasElement = document.querySelector('canvas');
const ctx = canvasElement.getContext('2d');

// Size of the canvas
ctx.canvas.width = window.innerWidth*0.96;
ctx.canvas.height = window.innerHeight*0.85;


var tp = window.innerHeight*0.112;
var lft = window.innerWidth*0.02;

canvasElement.addEventListener('mousedown', mousedown)
canvasElement.addEventListener('mouseup', mouseup)
canvasElement.addEventListener('mousemove', mousemove)

// Draw some lines
ctx.lineWidth = 2;
ctx.strokeStyle = 'black';
var drawing_state = false;

function mousedown(event){
    drawing_state = true;
    ctx.moveTo(event.clientX-lft,event.clientY-tp);
}

function mouseup(event){
    drawing_state = false;
}

function mousemove(event){
    if (drawing_state) {
        ctx.lineTo(event.clientX-lft,event.clientY-tp);
        ctx.stroke();
    }
}

