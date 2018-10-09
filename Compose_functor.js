// class Task {
//   constructor(fork) {
//     this.fork = fork;
//   }

//   inspect() {
//     return 'Task(?)';
//   }

//   static rejected(x) {
//     return new Task((reject, _) => reject(x));
//   }

//   // --- Pointed (Task a)
//   static of(x) {
//     return new Task((_, resolve) => resolve(x));
//   }

//   // --- Funcror (Task a)
//   map (fn) {
//     return new Task((reject, resolve) => this.fork(reject, compose(resolve, fn)))
//   }

//   // --- Applicative (Task a)
//   ap(f) {
//     return this.chain(fn => f.map(fn))
//   }

//   // --- Monad (Task a)
//   chain(fn) {
//     return new Task((reject, resolve) => this.fork(reject, x => fn(x).fork(reject, resolve)))
//   }

//   join() {
//     return this.chain(identity);
//   }
// }
                     
function inspect (val) {
  return val;
}

const curry = function (fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  }
}
const map = curry((fn, Functor) => Functor.map(fn));
const concat = curry((a, b) => a.concat(b));

class Compose {
  constructor(fgx) {
    this.getCompose = fgx;
  }
  static of(fgx) {
    return new Compose(fgx);
  }
  map (fn) {
    return new Compose(map(map(fn), this.getCompose));
  }
}

class Task {
  constructor (x) {
    this.$value = x;
  }

  static of (x) {
    return new Task(x);
  }

  map(fn) {
    return new Task(fn(this.$value));
  }
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

const tmd = Task.of(Maybe.of(', rock on, Chicago'));
const ctmd = Compose.of(tmd);

map(concat('Rock over London'), ctmd);

const result = ctmd.getCompose;
console.log('result', result);