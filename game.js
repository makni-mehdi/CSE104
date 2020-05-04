class Game{
    actions = {'feed': feed, 'cure': cure}

    constructor(){
        this.trobbles = []
        this.date = 0
        this.grave = []
        this.running = true
    }

    play(){
        //create initial trobble
        this.new_trobble()

        //gameloop
        while (this.running){
            lot = document.querySelector(".list_of_trobbles")
            // remove all the old trobble cards
            while (lot.firstChild)
                lot.removeChild(lot.firstChild)


            let i = 0;
            for (i = 0; i < this.trobbles.length; i++){
                const trobble = this.trobbles[i]
                if (trobble.health == 0){
                    $('.messages').append(`<p>Unfortunately, your Trobble, ${trobble.name}, has died at the age of ${trobble.age}</p>`)
                    this.trobbles.splice(this.trobbles.indexOf(trobble),1)
                    this.grave.push(trobble)
                    continue
                }
                //$('.messages').append('<p>You have one Trobble named ' + trobble.str()+'</p>')
                // $('.messages').append(trobble.display())

                const tmp = document.createElement("div")
                tmp.innerHTML = trobble.display()

                lot.appendChild(tmp)

                let action = get_action(this.actions)
                action(trobble)
                trobble.next_turn()
            }

            if (this.trobbles.length === 0)
                this.running = false
        }
    }

    new_trobble(){
        let name = get_name()
        let sex = get_sex()
        let trobble = new Trobble(name, sex)

        this.trobbles.push(trobble)
    }
}


// input functions
function get_name(){
    return window.prompt('Please give your new Trobble a name: ');
}

function get_sex(){
    let sex = ''
    while (sex == ''){
        const quest = 'Is your new Trobble male or female? Type "m" or "f" to choose: ';
        let choice = window.prompt(quest);
        if (choice == 'm' || choice == 'male'){
            sex = 'male';
        }
        else if (choice == 'f' || choice == "female"){
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