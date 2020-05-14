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

                const tmp = document.createElement("div")
                tmp.innerHTML = trobble.display()
                tmp.classList.add('desc')
                tmp.addEventListener('mousedown', (e)=>{
                    if (trobble.exhausted) {
                        $('.messages').append('<p>' + trobble.name + " is exhausted...</p>")
                        return
                    }
                    trobble_do(trobble, this)
                })
                live_trobbles.push(trobble)

                lot.appendChild(tmp)
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
        console.log('f')
    }
}