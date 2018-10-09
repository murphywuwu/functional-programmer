
const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
const curry = (fn) => {
  const arity = fn.length;

  return function $curry(...args) {
      if (args.length < arity) {
          return $curry.bind(null, ...args);       
      }

      return fn.call(null, ...args);
  }
}
const map = curry((fn, Functor) => Functor.map(fn));
const head = xs => xs[0];
const fs = require('fs');

class IO {
  constructor(fn) {
    this.$value = fn;
  }

  map(fn) {
    return new IO(compose(fn, this.$value));
  };
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
      return this.isNothing ? 'Nothing' : `Just(${this.$value})`;
  }
  join () {
    return this.isNothing ? Maybe.of(null) : this.$value;
  }
}


const readFile = filename => new IO(() => fs.readFileSync(filename, 'utf-8'));
const print = x => new IO(() => { console.log('x', x); return x });
const cat = compose(map(print), readFile);
const catFirstClass = compose(map(map(head)), cat);

const result1 = cat('.git/config');
const result2 = catFirstClass('.git/config');

// console.log('result', result.$value());
console.log('result1', result1.$value().$value());
console.log('result2', result2.$value().$value());

const safeProp = curry((x, obj) => Maybe.of(obj[x]));
const safeHead = safeProp(0);

const firstAddressStreet = compose(map(map(safeProp('street'))), map(safeHead), safeProp('address'));

const address = firstAddressStreet({
  address: [{ street: { name: 'Mulburry', number: 8402 }, postcode: 'WC2N' }]
})

const mmo = Maybe.of(Maybe.of('nunchucks'));

mmo.join();