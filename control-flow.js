// class Either {
//     static of(x) {
//         return new Right(x);
//     }

//     constructor(x) {
//         this.$value = x;
//     }
// }

// class Left extends Either {
//     map(f) {
//         return this;
//     }
//     inspect() {
//         return `Left(${inspect(this.$value)})`
//     }
// }

// class Right extends Either {
//     map(f) {
//         return Either.of(f(this.$value));
//     }
//     inspect() {
//         return `Right(${inspect(this.$value)})`
//     }
// }

// const left = x => new Left(x);

// const ins = Either.of('rain').map(str => `b${str}`);
// console.log(ins)
const curry = function(fn) {
    var arity = fn.length;

    return function $curry(...args) {
        if (args.length < arity) {
            return $curry.bind(null, ...args)
        }

        return fn.call(null, ...args)
    }
}

const prop = curry((prop, obj) => obj[prop]);
const concat = curry((a, b) => a.concat(b));

class Container {
    constructor(x) {
        this.$value = x;
    }
    static of(x) {
        return new Container(x);
    }
}

Container.prototype.map = function (f) {
    return Container.of(f(this.$value))
}

const val1 = Container.of(3);
const val2 = Container.of('hotdogs');
const val3 = Container.of(Container.of({name: 'yoda'}))

const result1 = Container.of(2).map(two => two + 2);
const result2 = Container.of('flamethrowers').map(s => s.toUpperCase());
const result3 = Container.of('bombs').map(concat('away')).map(prop('length'))
console.log('result1', result1);
console.log('result2', result2);
console.log('result3', result3);
