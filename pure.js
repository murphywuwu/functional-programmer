// A pure function is a function that, given the same input,
// will always return the same output and does not have any observable side effect

const xs = [1,2,3,4,5];

// pure
xs.slice(0, 3) // [1, 2, 3]
xs.slice(0, 3) // [1, 2, 3]
xs.slice(0, 3) // [1, 2, 3]

// impure
xs.splice(0, 3) // [1, 2, 3]
xs.splice(0, 3) // [4, 5]
xs.splice(0, 3) // []

// pure
const checkAge = (age) => {
    const minimum = 21;
    return age >= minimum;
}

// impure
let minimum = 21; // because depends on the mutable variable minimum to determine the result
const checkAge = age => age >= minimum

// pure
const obj = Object.freeze({ minimum: 21 })
const checkAge = age => age >= obj.minimum
