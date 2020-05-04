class Trobble{
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
            this.health = Math.max(this.health -(this.hunger / 20) , 0);
        }
    }

    feed(){
        console.log(this.hunger)
        this.hunger = Math.max(this.hunger - 25 , 0);
    }

    cure(){
        this.health = Math.min(this.health + 5 , 10);
    }

    is_alive(){
       return this.health > 0;
    }
}

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