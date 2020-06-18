const person = {
    name: ['Bob', 'Smith'],
    age: 32,
    gender: 'male',
    interests: ['music', 'skiing'],
    bio: function() {
        console.log(this.name[0] + ' ' + this.name[1] + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.')
    },
    greeting: function() {
        console.log('Hi! I\'m ' + this.name[0] + '.')
    }
}

function createNuPerson(name) {
    const obj = {};
    obj.name = name;
    obj.greeting = function() {
        console.log('Hi! I\'m ' + obj.name + '.');
    };
    return obj;
}

function Person(name) {
    this.name = name;
    this.greeting = function() {
        console.log('Hi! I\'m ' + this.name + '.');
    };
}

person.name
person.name[0]
person.age
person.interests[1]
person.bio()
person.greeting()