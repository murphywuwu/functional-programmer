/* 
  It specifies what, not how
*/

// imperative 
const makes = [];

for (let i = 0; i < cars.length; i++) {
    makes.push(cars[i].make);
}

const authenticate = (form) => {
    const user = toUser(form);
    return logIn(user);
}

// declarative
const makes = cars.map(car => car.make);

const authenticate = compose(logIn, toUser);

