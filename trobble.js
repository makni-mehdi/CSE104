class Trobble{
    constructor(name, sex){
        this.name = name;
        this.sex = sex;
        this.age = 0
        this.health=10;
        this.hunger = 0;
    }
    
    str(){
        return `${this.name}{ ${this.sex}, health ${this.health}, hunger ${this.hunger}, age ${this.age}`;
    }

    next_turn(){
        if (this.health != 0){
            this.age += 1;
            this.hunger += this.age;
            this.health = Math.max(this.health -(this.hunger / 20) , 0);
        }
    }

    feed(){
        this.hunger = Math.max(this.hunger - 25 , 0);
    }

    cure(){
        this.health = Math.min(this.health + 5 , 10);
    }

    is_alive(){
       return this.health > 0;
    }
}

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
    let actions = {'feed': trobble.feed, 'cure':trobble.cure}
    while (trobble.is_alive()){
        document.write('You have one Trobble named ' + trobble.str())
        let action = get_action(actions)
        action()
        trobble.next_turn()
    }
    document.write(`Unfortunately, your Trobble ${trobble.name} has died at the age of {trobble.age}`)
}

function mate(trobble1, trobble2, name_offspring){
    if ((trobble1.age > 3) && (trobble2.age > 3) && ([trobble1.sex,trobble2.sex] in [['male','female'],['female','male']])){
        return Trobble(name_offspring,trobble1.sex)
    }
}

play()

/*
function multi_play(){
    let name1 = get_name()
    let sex1 = get_sex()
    let trobble1 = Trobble(name1, sex1)
    let name2 = get_name()
    let ls = ['male','female']
    ls.remove(sex1)
    sex2 = ls[0]
    trobble2 = Trobble(name2, sex2)
    pets = [trobble1,trobble2]
    while pets{ 
        document.write('You have {} Trobbles named{ '.format(len(pets)))
        for i in pets{
            document.write(i.name + ' whose number is{ ' + str(pets.index(i)))
        document.write(pets)
        n = int(window.prompt('choose which tobble you want to take. Give its number{ '))
        trobble = pets[n]
        actions = {'feed'{ trobble.feed, 'cure'{ trobble.cure, 'mate'{''}
        action = get_action(actions,pets,n) 
        test = action()
        if test != None{
            pets.append(test)
        for i in pets{
            i.next_turn()
        dead = []
        for i in pets{
            if ! (i.is_alive){
                dead.append(i)
                pets.remove(i)
        if dead{
            document.write('Unfortunately your Trobbles ' + str(dead) + ' died. ')
    document.write('You killed every trobble')
*/
