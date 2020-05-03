class Trobble:
    """Trobbles: simplified digital pets.
    Data Attributes:
    name -- the Trobble's name.
    sex -- 'male' or 'female'.
    age -- an integer between 0 (dead) and 10 (full health) inclusive
    health -- a non-negative integer (0 is dead)
    hunger -- a non-negative integer (0 is not hungry)
    """
    def __init__(self, name, sex):
        self.name = name
        self.sex = sex
        self.age = 0
        self.health=10
        self.hunger = 0
    
    def __str__(self):
        return ('{}: {}, health {}, hunger {}, age {}'.format(self.name,self.sex,self.health,self.hunger,self.age))
    
    def next_turn(self):
        if (self.health != 0):
            self.age += 1
            self.hunger += self.age
            self.health = max(self.health -((self.hunger)// 20) , 0)
    
    def feed(self):
        """Feed the instance to decrease the hunger by 25 with a minimum value of 0."""
        self.hunger = max(self.hunger - 25 , 0)
        
    def cure(self):
        """Increase the health of the instance by 5 up to the maximum of 10."""
        self.health = min(self.health + 5 , 10)
    
    def is_alive(self):
       """Return True if the health of the instance is positive,
       otherwise False.
       """
       return self.health > 0
   

def get_name():
    return input('Please give your new Trobble a name: ')

def get_sex():
    sex = None
    while sex is None:
        prompt = 'Is your new Trobble male or female? Type "m" or "f" to choose: '
        choice = input(prompt)
        if choice == 'm':
            sex = 'male'
        elif choice == 'f':
            sex = 'female'
    return sex

def get_action(actions,pets,n):
    while True:
        prompt = 'Type one of {} to perform the action: '.format(', '.join(actions.keys()))
        action_string = input(prompt)
        if action_string not in actions:
            print('Unknown action!')
        elif (action_string == 'mate'):
            test = False
            while not test:
                j = int(input('Please give the other trobble you want to mate with:'))
                test = j in range(len(pets)) and (j != n)
            name = get_name()
            return mate(pets[n],pets[j],name)
        else:
            return actions[action_string]
        
def play():
    name = get_name()
    sex = get_sex()
    trobble = Trobble(name, sex)
    actions = {'feed': trobble.feed, 'cure': trobble.cure}
    while trobble.is_alive():
        print('You have one Trobble named ' + str(trobble))
        action = get_action(actions)
        action()
        trobble.next_turn()
    print('Unfortunately, your Trobble {} has died at the age of {}'.format(
            trobble.name, trobble.age))

def mate(trobble1, trobble2, name_offspring):
    """Check if the given Trobbles can procreate and if so give back a new
    Trobble that has the sex of trobble1 and the name 'name_offspring'.
    Otherwise, return None.
    """
    if (trobble1.age > 3) and (trobble2.age > 3) and ((trobble1.sex,trobble2.sex) in [('male','female'),('female','male')]):
        return Trobble(name_offspring,trobble1.sex)
    
def multi_play():
    """ lets you play a game as in play(), but starts out with two Trobbles, 
    one male and one female. In each round, you can feed or cure one of the 
    current pets individually or use the function mate on two of them to create 
    more pets. """
    name1 = get_name()
    sex1 = get_sex()
    trobble1 = Trobble(name1, sex1)
    name2 = get_name()
    ls = ['male','female']
    ls.remove(sex1)
    sex2 = ls[0]
    trobble2 = Trobble(name2, sex2)
    pets = [trobble1,trobble2]
    while pets: 
        """ means pets is not empty so I still have pets to take care of :)"""
        print('You have {} Trobbles named: '.format(len(pets)))
        for i in pets:
            print(i.name + ' whose number is: ' + str(pets.index(i)))
        print(pets)
        n = int(input('choose which tobble you want to take. Give its number: '))
        trobble = pets[n]
        actions = {'feed': trobble.feed, 'cure': trobble.cure, 'mate':''}
        action = get_action(actions,pets,n) 
        """ I added n so that it does not mate with itself """
        test = action()
        if test != None:
            pets.append(test)
        for i in pets:
            i.next_turn()
        dead = []
        for i in pets:
            if not (i.is_alive):
                dead.append(i)
                pets.remove(i)
        if dead:
            print('Unfortunately your Trobbles ' + str(dead) + ' died. ')
    print('You killed every trobble')
