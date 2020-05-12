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
    let sex;
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

    return sex
}

// input functions
function get_name(){
    return window.prompt('Please give your new Trobble a name: ');
}

// function get_sex(){
//     let sex = ''
//     while (sex == ''){
//         const quest = 'Is your new Trobble male or female? Type "m" or "f" to choose: ';
//         let choice = window.prompt(quest);
//         if (choice == 'm' || choice == 'male'){
//             sex = 'male';
//         }
//         else if (choice == 'f' || choice == "female"){
//             sex = 'female';
//         }
//     }
//     return sex
// }

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
}

function cure(trobble){ //could be implemented using lambdas later
    trobble.cure()
}

