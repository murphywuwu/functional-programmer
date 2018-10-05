const curry = (fn) => {
    const arity = fn.length;

    return function $curry(...args) {
        if (args.length < arity) {
            return $curry.bind(null, ...args);       
        }

        return fn.call(null, ...args);
    }
}

const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0]

const match = curry((what, s) => s.match(what));
const prop = curry((prop, obj) => obj[prop]);
const add = curry((a, b) => a + b);
  
const map = curry((f, anyFunctor) => anyFunctor.map(f))
                     
function inspect (val) {
    return val;
}

class Maybe {
    static of(x) {
        return new Maybe(x);
    }
    
    get isNothing() {
        return this.$value === null || this.$value === undefined;
    }

    constructor(x) {
        this.$value = x;
    }
    map(fn) {
        return this.isNothing ? this : Maybe.of(fn(this.$value))
    }
    inspect() {
        return this.isNothing ? 'Nothing' : `Just(${inspect(this.$value)})`;
    }
}

const val1 = Maybe.of('Malkvovich Malkovich').map(match(/a/ig));
const val2 = Maybe.of(null).map(/a/ig);

const val3 = Maybe.of({name: 'Boris'}).map(prop('age')).map(add(10))

const val4 = Maybe.of({name: 'Dinah', age: 14}).map(prop('age')).map(add(10));

console.log('val1', val1);
console.log('val2', val2);
console.log('val3', val3); 
console.log('val4', val4)

const safeHead = xs => Maybe.of(xs[0]);
const streetName = compose(map(prop('street')),  safeHead, prop('addresses'));

const result1 = streetName({ addresses: [] });
const result2 = streetName({ addresses: [{ street: 'Shady Ln', number: 420 }] });

console.log('result1', result1);
console.log('result2', result2);

const withdraw = curry((amount, { balance }) => Maybe.of(balance >= amount ? { balance: balance - amount } : null));
const updateLedger = account => account;

const remainingBalance = ({ balance }) => `Your balance is $${balance}`;
const finishTransaction = compose(remainingBalance, updateLedger);

// const getTwenty = compose(map(finishTransaction), withdraw(20));
 
// const m1 = getTwenty({ balance: 200.00 });
// const m2 = getTwenty({ balance: null });

// console.log('m1', m1);
// console.log('m2', m2)

const maybe = curry((v, f, m) => {
    if (m.isNothing) {
        return v;
    }

    return f(m.$value)
})

const getTwenty = compose(maybe('You\'re broken!', finishTransaction), withdraw(20));
const m1 = getTwenty({ balance: 200.00 });
const m2 = getTwenty({ balance: 10.00 });

console.log('m1', m1);
console.log('m2', m2);

 