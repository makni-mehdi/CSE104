"use strict";
class Trobble{
    exhausted = false;
    baby = false;

    constructor(name, sex){
        this.name = name;
        this.sex = sex;
        this.age = 0
        this.health=10;
        this.hunger = 0;
    }
    
    str(){
        return `${this.name}{ ${this.sex}, health ${this.health}, hunger ${this.hunger}, age ${this.age}}`;
    }

    next_turn(){
        if (this.health != 0){
            this.age += 1;
            this.hunger += this.age;
            this.health = Math.max(Math.ceil(this.health) -(this.hunger / 20) , 0);
            this.exhausted = false;
        }
        if (this.baby) {
            this.baby = false
        }
    }

    feed(){
        this.hunger = Math.max(this.hunger - 25 , 0);
        this.exhausted = true;
    }

    cure(){
        this.health = Math.min(this.health + 5 , 10);
        this.exhausted = true;
    }

    is_alive(){
       return this.health > 0;
    }

    display(game){
        let health = "taking his last breath";
        if (this.health > 3) health = 'has seen better days'
        if (this.health > 5) health = 'faring well'
        if (this.health > 8) health = 'in his prime'

        let beegdiv = document.createElement('div')
        beegdiv.position= 'relative'
        beegdiv.classList.add('desc')
        if (this.sex === "male")
            beegdiv.classList.add('male')
        if (this.sex === 'female')
            beegdiv.classList.add('female')
        lot.appendChild(beegdiv)

        let tmp = document.createElement('img')
        tmp.src = "img/complete.svg"
        tmp.style.width = "100px"
        tmp.style.marginleft = 'auto'
        tmp.style.marginright = "auto"
        tmp.position="relative"
        beegdiv.appendChild(tmp)

        for (let i in [this.name, this.age, health]){
            tmp = document.createElement('p')
            tmp.textContent = [this.name, this.age, health][i]
            beegdiv.appendChild(tmp)
        }

        beegdiv.addEventListener('mousedown', (e)=>{
            if (this.exhausted) {
                $('.messages').append('<p>' + this.name + " is exhausted...</p>")
                return
            }
            trobble_do(this, game)
        })
    }
}