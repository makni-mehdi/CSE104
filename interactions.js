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

function trobble_do(trobble, actions){
    let div = document.createElement('div')
    let tmp = document.createElement('h5')
    tmp.textContent = "What do you wanna do?"
    div.appendChild(tmp)
    for (const action in actions){
        tmp = document.createElement('p')
        tmp.classList.add('btn')
        tmp.textContent = action
        tmp.addEventListener("mousedown", ()=>{
            popup.clear_content()
            popup.hide()
            actions[action](trobble)
        })
        div.appendChild(tmp)
    }
    popup.append(div)
    popup.show()
}

// input functions
function get_name(){
    return window.prompt('Please give your new Trobble a name: ');
}

function get_action(actions,pets,n){
    while (true){
        const quest = `Type one of ${Object.keys(actions).join(', ')} to perform the action:`;
        let action_string = window.prompt(quest);
        if (!(action_string in actions)){
            console.log('Unknown action!');
            alert('Unknown action!')
        }
        else if (action_string == 'mate'){
            let test = false;
            while (! (test)){
                let j = int(window.prompt('Please give the other trobble you want to mate with{'));
                test = (j<Object.keys(pets).length) && (j >= 0) && (j != n);
            }
            let name = get_name()
            return mate(pets[n],pets[j],name)
        }
        else{
            return actions[action_string]
        }
    }
}

// trobble interactions
function mate(trobble1, trobble2, name_offspring){
    if ((trobble1.age > 3) && (trobble2.age > 3) && ([trobble1.sex,trobble2.sex] in [['male','female'],['female','male']])){
        return Trobble(name_offspring,trobble1.sex)
    }
}

function feed(trobble){ //could be implemented using lambdas later
    trobble.feed()
    $('.messages').append(`<p>You fed ${trobble.name}.</p>`)
}

function cure(trobble){ //could be implemented using lambdas later
    trobble.cure()
    $('.messages').append(`<p>You cured ${trobble.name}.</p>`)
}

