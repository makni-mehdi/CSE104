function get_name(){
    return window.prompt('Please give your new Trobble a name: ');
}

function get_sex(){
    let sex = ''
    while (sex == ''){
        const quest = 'Is your new Trobble male or female? Type "m" or "f" to choose: ';
        let choice = window.prompt(quest);
        if (choice == 'm'){
            sex = 'male';
        }
        else if (choice == 'f'){
            sex = 'female';
        }
    }
    return sex
}

function get_action(actions,pets,n){
    while (true){
        const quest = `Type one of ${Object.keys(actions).join(', ')} to perform the action:`;
        let action_string = window.prompt(quest);
        if (!(action_string in actions)){
            document.write('Unknown action!');
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
        
function play(){
    let name = get_name()
    let sex = get_sex()
    let trobble = new Trobble(name, sex)
    let actions = {'feed': feed, 'cure': cure}
    while (trobble.is_alive()){
        document.write('You have one Trobble named ' + trobble.str())
        let action = get_action(actions)
        action(trobble)
        trobble.next_turn()
    }
    document.write(`Unfortunately, your Trobble ${trobble.name} has died at the age of {trobble.age}`)
}

function mate(trobble1, trobble2, name_offspring){
    if ((trobble1.age > 3) && (trobble2.age > 3) && ([trobble1.sex,trobble2.sex] in [['male','female'],['female','male']])){
        return Trobble(name_offspring,trobble1.sex)
    }
}

function feed(trobble){
    trobble.feed()
}

function cure(trobble){
    trobble.cure()
}