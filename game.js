"use strict";
class Game{
    actions = {
        'feed': feed,
        'cure': cure,
        'mate': mate,
        'cancel': ()=>{}
    }

    constructor(){
        this.trobbles = []
        this.date = 0
        this.grave = []
        this.running = true
    }

    new_trobble(){
        //create initial trobble
        create_new_trobble(this, popup)
    }

    play(){
        //gameloop
        if (this.running){
            lot = document.querySelector(".list_of_trobbles")
            // remove all the old trobble cards
            while (lot.firstChild)
                lot.removeChild(lot.firstChild)

            let live_trobbles = []
            for (let i = 0; i < this.trobbles.length; i++){
                const trobble = this.trobbles[i]
                if (trobble.health == 0){
                    $('.messages').append(`<p>Unfortunately, your Trobble, ${trobble.name}, has died at the age of ${trobble.age}</p>`)
                    this.grave.push(trobble)
                    continue
                }

                if (trobble.baby) {
                    trobble.age = -1
                    live_trobbles.push(trobble)
                    continue
                }

                //const tmp = document.createElement("div")
                //tmp.innerHTML = trobble.display()
                //tmp.classList.add('desc')
                // tmp.addEventListener('mousedown', (e)=>{
                //     if (trobble.exhausted) {
                //         $('.messages').append('<p>' + trobble.name + " is exhausted...</p>")
                //         return
                //     }
                //     trobble_do(trobble, this)
                // })
                trobble.display(this)
                live_trobbles.push(trobble)

                //lot.appendChild(tmp)
            }
            this.trobbles = live_trobbles
            if (this.trobbles.length === 0)
                this.running = false
        }
    }

    append_trobble(trobble){
        this.trobbles.push(trobble)
    }

    next_day(){
        if (!this.running)
            return
        for (let i = 0; i < this.trobbles.length; i++) {
            this.trobbles[i].next_turn()
        }
        $('.messages').append('<p>A day has passed</p>')
        turncount++
    }
}

class Story{
    events = {
        0: this.start_msg,
        2: this.second_trobble_msg,
        4: this.goal
    }

    start_msg(){
        popup.clear_content()

        let div = document.createElement('div')
        let tmp = document.createElement('h2')
        tmp.textContent = "Hello newcomer!"
        div.appendChild(tmp)
        tmp = document.createElement('p')
        tmp.textContent = "Welcome to the world of trobbles! To start you off, here comes your first specimen."
        div.appendChild(tmp)
        tmp = document.createElement('p')
        tmp.textContent = "Click on this popup to get your trobble"
        div.appendChild(tmp)
        div.addEventListener('mousedown', ()=>{
            popup.hide()
            popup.clear_content()
            console.log(this.game_init)
            g.new_trobble()
        })

        popup.append(div)
        popup.show()
    }

    second_trobble_msg(){
        popup.clear_content()

        let div = document.createElement('div')
        let tmp = document.createElement('h2')
        tmp.textContent = "Wow! I can see you're doing great!"
        div.appendChild(tmp)
        tmp = document.createElement('p')
        tmp.textContent = "To help your trobble farm thrive, here comes a second trobble!"
        div.appendChild(tmp)
        tmp = document.createElement('p')
        tmp.textContent = "If this new trobble's sex is different that your first's, they'll be able to have kids!"
        div.appendChild(tmp)
        div.appendChild(tmp)
        tmp.textContent = "Click on this popup to get your trobble"
        div.addEventListener('mousedown', ()=>{
            popup.hide()
            popup.clear_content()
            g.new_trobble()
        })

        popup.append(div)
        popup.show()
    }

    goal(){
        popup.clear_content()

        let div = document.createElement('div')
        let tmp = document.createElement('h2')
        tmp.textContent = "Congratulations, I see you're taking great care of your trobbles!"
        div.appendChild(tmp)
        tmp = document.createElement('p')
        tmp.textContent = "I want to see how your farm will turn out..."
        div.appendChild(tmp)
        tmp = document.createElement('p')
        tmp.textContent = "I once heard a man managed to get his trobbles to last more than 20years. And his collection was more than 10 strong!"
        div.appendChild(tmp)
        tmp = document.createElement('p')
        tmp.textContent = "How about you try and beat that!"
        div.appendChild(tmp)
        div.addEventListener('mousedown', ()=>{
            popup.hide()
            popup.clear_content()
        })

        popup.append(div)
        popup.show()
    }

    event_happen(counter){
        if (counter in this.events){
            this.events[counter]()
        }

    }
}