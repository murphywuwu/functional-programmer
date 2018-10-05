// 1. Don't repeat yourself
// 2. loose coupling high cohesion
// 3. single responsibility

class Flock {
    constructor(n) {
        this.seagulls = n;
    }
    conjoin(other) {
        this.seagulls += other.seagulls;
        return this;
    }
    breed(other) {
        this.seagulls = this.seagulls * other.seagulls;
        return this;
    }
}

// const flockA = new Flock(4);
// const flockB = new Flock(2);
// const flockC = new Flock(0);

// const result = flockA.conjoin(flockC).breed(flockB).conjoin(flockA.breed(flockB)).seagulls; // 32

const conjoin = (flockX, flockY) => flockX + flockY;
const breed = (flockX, flockY) => flockX * flockY;

const flockA = 4;
const flockB = 2;
const flockC = 0;

const result2 = conjoin(breed(flockB, conjoin(flockA, flockC)), breed(flockA, flockB));
console.log(result2)

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

// 结合定律
add(add(x, y), z) === add(x, add(y, z))

// 交换定律
add(x, y) === add(y, x)

// 分配定律
multiply(x, add(y, z)) == add(multiply(x, y), multiply(x, z));

// 冗余的wrapper function
const getServerStuff = callback => ajaxCall(json => callback(json));
const getServerStuff = ajaxCall;
// this line
ajaxCall(json => callback(json))

// is the same as this line
ajaxCall(callback)

// so refactor getServerStuff
const getServerStuff = callback => ajaxCall(callback)

// ...which is equivalent to this
const getServerStuff  = ajaxCall;

const BlogController = {
    index(posts) {return Views.index(posts)},
    show(post) {return Views.show(post)},
    create(attrs) {return Db.create(attrs)},
    update(post, attrs) {return Db.update(post, attrs)},
    destroy(post) {return Db.destroy(post)},
}

const BlogController = {
    index: Views.index,
    show: Views.show,
    create: Db.create,
    update: Db.update,
    destroy: Db.destroy,
}

httpGet('/post/2', json => renderPost(json))
// if httpGet were to change to send a possible err, we would need to go back and change the 'glue'
// go back to every httpGet call in the application and explicity pass err along
httpGet('/post/2', (json, err) => renderPost(json, err)) 
// Had we written it as a first class function, much less would need to change
// renderPost is called from within httpGet with however many arguments it wants
httpGet('/post/2', renderPost) // removal of unnecessary functions

