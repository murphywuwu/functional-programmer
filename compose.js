const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}`;

const shout = compose(exclaim, toUpperCase);
const result = shout('send in the clowns');

console.log('result', result);