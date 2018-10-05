
const curry = function (fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  }
}
const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
const head = xs => xs[0];
const split = curry((sep,str) => str.split(sep));

const fs = require('fs');
const { task, of } = require('folktale/concurrency/task');


const readFile = filename => task(({ resolve, reject }) => {
  fs.readFile(filename, (err, data) => (err ? reject(err): resolve(data)));
})

// const res = readFile('metamorphosis.txt').map(split('\n')).map(head);

readFile('metamorphosis.txt').run().listen({
  onCancelled: () => { console.log('the task was cancelled') },
  onRejected: (error) => { console.log('something went wrong') },
  onResolved: (value) => { console.log(`The value is ${value}`) }
});

of(3).map(three => three + 1).run().listen({
  onResolved: (value) => { console.log(`The value is ${value}`) }
});