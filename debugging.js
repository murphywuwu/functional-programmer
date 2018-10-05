const curry = (fn) => {
    const arity = fn.length;

    return function $curry(...args) {
        if (args.length < arity) {
            return $curry.bind(null, ...args);       
        }

        return fn.call(null, ...args);
    }
}

const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

const map = curry((fn, f) => f.map(fn));
const reverse = x => Array.isArray(x) ? x.reverse() : x.split('').reverse().join('');
const toLowerCase = s => s.toLowerCase();
const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}`;
// debugging
const trace = curry((tag, x) => {
    console.log(tag, x);
    return x;
})

const angry = compose(exclaim, toUpperCase);

const latin = compose(map(angry), trace('after reverse'),reverse);

latin(['frog', 'eyes'])
