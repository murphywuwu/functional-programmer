const curry = function (fn) {
    const arity = fn.length;

    return function $curry (...args) {
        if (args.length < arity) {
            return $curry.bind(null, ...args)
        }

        return fn.call(null, ...args)
    }
}
const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

const prop = curry((prop, obj) => obj[prop]);


class Either {
    // static of(x) {
    //     return new Rright(x);
    // }

    constructor(x) {
        this.$value = x;
    }
}

class Left extends Either {
    map(f) {
        return this;
    }
    
    inspect() {
        return `Left(${this.$value})`
    }
}

class Rright extends Either {
    static of (x) {
        return new Rright(x);
    }
    map(f) {
        return Rright.of(f(this.$value))
    }

    inspect() {
        return `Rright(${this.$value})`
    }
}

const left = x => new Left(x);
const right = x => new Rright(x);


const result1 =  right('rain').map(str => `b${str}`);
const result2 = left('rain').map(str => `It's gonna ${str}, better bring ypur umbrella!`);

console.log('result1', result1);
console.log('result2', result2);

const result3 = right({ host: 'localhost', port: 80 }).map(prop('host'));
const result4 = left('rolls eys...').map(prop('host'));

console.log('result3', result3);
console.log('result4', result4);

const moment = require('moment');
const getAge = curry((now, user) => {
    const birthDate = moment(user.birthDate, 'YYYY-MM-DD');
    
    return birthDate.isValid() ? right(now.diif(birthDate, 'years')) : left('Birth date could not be parsed');
});

getAge(moment(), { birthDate: '2015-12-12' });
getAge(moment(), { birthDate: 'July 4, 2001' });



const either = curry((f, g, e) => {
    let result;

    switch(e.constructor) {
        case Left:
          result = f(e.$value);
          break;
        case Rright: 
          result = g(e.$value);
          break;      
    }

    return result;
});

const zoltar = compose(console.log, either(id, fortune), getAge(moment()));
zoltar({ birthDate: '2005-12-12' });
zoltar({ birthDate: 'balloons!' })