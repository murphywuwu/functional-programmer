const memoize  = (f) => {
    const cache = {};

    return (...args) => {
        const argStr = JSON.stringify(args);

        cache[argStr]= cache[argStr] || f(...args);
        return cache[argStr];
    }
}

const squreNumber = memoize(x => x * x);
squreNumber(4);
squreNumber(4); // return cache for input 4
