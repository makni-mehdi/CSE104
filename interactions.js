// interactions with user
class Popup{
    content = ""
    constructor(div){
        this.div = div
        this.hide()
    }
    append(node){
        this.div.appendChild(node)
    }
    clear_content(){
        this.div.innerHTML = ''
    }
    show(){
        this.div.style.visibility = 'visible'
    }
    hide(){
        this.div.style.visibility = "hidden"
    }
}

function generate(game, name, popup){
    popup.clear_content()

    let div = document.createElement('div')
    let tmp = document.createElement('h5')
    tmp.textContent = "What is your trobble's sex"
    div.appendChild(tmp)
    let choices = ['male', 'female']
    for (const i in choices){
        tmp = document.createElement('p')
        tmp.classList.add('btn')
        tmp.textContent = choices[i]
        tmp.addEventListener("mousedown", ()=>{
            popup.clear_content()
            popup.hide()
            let trobble = new Trobble(name, choices[i])
            game.append_trobble(trobble)
            game.running = true
            })
        div.appendChild(tmp)
    }
    popup.append(div)
    popup.show()
}

function create_new_trobble(game, popup, baby=false, parents=null){
    popup.clear_content()

    let div = document.createElement('div')
    let tmp = document.createElement('h5')
    tmp.textContent = "What is your trobble's name?"
    div.appendChild(tmp)

    tmp = document.createElement('input')
    tmp.type = "text"
    tmp.id = 'name'
    tmp.required = true
    div.appendChild(tmp)

    let name = tmp
    tmp = document.createElement('p')
    tmp.id = 'submitbtn'
    tmp.classList.add('btn')
    tmp.textContent = 'submit'

    div.appendChild(tmp)
    popup.append(div)
    popup.show()

    tmp = document.getElementById("submitbtn")
    tmp.addEventListener("mousedown", ()=>{
        popup.clear_content()
        popup.hide()
        if (!baby)
            generate(game, name.value, popup)
        else{
            let baby = new Trobble(name.value, parents[0].sex)
            baby.baby = true
            game.append_trobble(baby)

            $('.messages').append(`<p>${parents[0].name} and ${parents[1].name} mated.</p>`)
        }
    })
}

function trobble_do(trobble, game){
    popup.clear_content()

    let div = document.createElement('div')
    let tmp = document.createElement('h5')
    tmp.textContent = `What do you wanna do with ${trobble.name}?`
    div.appendChild(tmp)
    for (const action in game.actions){
        tmp = document.createElement('p')
        tmp.classList.add('btn')
        tmp.textContent = action
        tmp.addEventListener("mousedown", ()=>{
            popup.clear_content()
            popup.hide()
            game.actions[action](trobble, game)
        })
        div.appendChild(tmp)
    }
    popup.append(div)
    popup.show()
}

// trobble interactions
function mate(trobble, game){
    popup.clear_content()

    if (trobble.age <= 3) {
        $('.messages').append(`<p>${trobble.name} is too young to mate!</p>`)
        return
    }

    // prompt for second parent
    let div = document.createElement('div')
    let tmp = document.createElement('h5')
    tmp.textContent = `Whom should ${trobble.name} mate with?`
    div.appendChild(tmp)
    for (const p in game.trobbles){
        const partner = game.trobbles[p]
        if ((partner.sex === trobble.sex) || (partner.age <= 3) || (partner.exhausted))
            continue
        
        tmp = document.createElement('p')
        tmp.classList.add('btn')
        tmp.textContent = partner.name
        tmp.addEventListener("mousedown", ()=>{
            popup.clear_content()
            popup.hide()
            trobble.exhausted = true
            partner.exhausted = true

            create_new_trobble(game, popup, true, [trobble,partner])
            // let name = window.prompt("How shall the baby be called?")
            // let baby = new Trobble(name, trobble.sex)
            // baby.baby = true
            // game.append_trobble(baby)
            //
            // $('.messages').append(`<p>${trobble.name} and ${partner.name} mated.</p>`)
        })
        div.appendChild(tmp)
    }

    // cancel button
    tmp = document.createElement('p')
    tmp.classList.add('btn')
    tmp.textContent = "cancel"
    tmp.addEventListener("mousedown", ()=>{
        popup.clear_content()
        popup.hide()
    })
    div.appendChild(tmp)

    popup.append(div)
    popup.show()
}

function feed(trobble, game){ //could be implemented using lambdas later
    trobble.feed()
    $('.messages').append(`<p>You fed ${trobble.name}.</p>`)
}

function cure(trobble, game){ //could be implemented using lambdas later
    trobble.cure()
    $('.messages').append(`<p>You cured ${trobble.name}.</p>`)
}

