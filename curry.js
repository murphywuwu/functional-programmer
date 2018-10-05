// function add(a, b) {
//     return a + b;
// }


// var curry = function (fn) {
//     var args = [].slice.call(arguments, 1);
    
//     return function() {
//         var newArgs = args.concat([].slice.call(arguments));

//         return fn.apply(this, newArgs);
//     }
// }

// var addCurry = curry(add, 1, 2)
// console.log(addCurry()) // 3

// var addCurry = curry(add, 1);
// console.log(addCurry(2)) // 3

// var addCurry = curry(add);
// console.log(addCurry(1, 2)) // 3

// function sub_curry(fn) {
//     var args = [].slice.call(arguments, 1);

//     return function () {
//         return fn.apply(this, args.concat([].slice.call(arguments)))
//     }
// }

// function curry(fn, length) {
//     var length = length || fn.length;
//     var slice = Array.prototype.slice;
    
//     return function () {
//         if (arguments.length < length) {
//             var combined = [fn].concat(slice.call(arguments));
            
//             return curry(sub_curry.apply(this, combined), length - arguments.length)
//         }
//         else {
//             return fn.apply(this, arguments)
//         }
//     }
// }

// var fn = curry(function (a, b, c) {
//     return [a, b, c];
// });

// var result1 = fn('a', 'b', 'c')
// var result2 = fn('a', 'b')('c')
// var result3 = fn('a')('b', 'c')

// var result4 = fn('a')('b')('c')
// 第一次调用,a, curry返回一个函数, 将fn传入sub_curry(),args = ['a'],返回一个fn,为了便于理解将其命名为fn-a
// fnA = function() {
//     return fn.apply(this, args.concat([].slice.call(arguments)))
// }
// 第二次调用,b, curry返回一个函数, 将fn-a传入sub_curry(), args = ['b'],返回一个fn,同理将其命名为fn-b
// fnB = function() {
//     return fnA.apply(this, args.concat([].slice.call(arguments)))
// }
// 第三次调用,c, fn.apply(this, ['c'])
// fnB.apply(this, ['c'])


// console.log(result1)
// console.log(result2)
// console.log(result3)
// console.log(result4)

const curry = (fn) => {
    const arity = fn.length;

    return function $curry(...args) {
        if (args.length < arity) {
            return $curry.bind(null, ...args);       
        }

        return fn.call(null, ...args);
    }
}

const match = curry((what, s) => s.match(what));

var result1 = match(/r/g, 'hello world');
console.log('result1', result1);

const hasLetterR = match(/r/g); // x => x.match(/r/g)
hasLetterR('hello world') // ['r']
hasLetterR('just j and s and t etc'); // null