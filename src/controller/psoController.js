
const config = require('../config');
const particle = require('../model/particle');

function optimize(req, res, next) {
    const particles     = generate_particles(config.particles);
    const iterations    = config.iterations;
    let positions       = [];
    let gbest           = 9999999999999;

    for(let i = 0; i < iterations; i++) {
        let auxPos = [];
         particles.forEach((particle, index, particles) => {
             if (i !== 0) {
                 gbest = particle.evaluate();
             }

             let obj = [particle.position, gbest];
             auxPos.push(obj);
         });

         positions.push(auxPos);
    }

    const data = {
        iterations: iterations,
        positions: positions
    };

    res.json(data);
}

function generate_particles(amount) {
    let particles = [];
    let positions = [];
    let velocities = [];

    while (amount > 0) {

        let pos = getVector();
        if (positions.indexOf(pos) !== -1) {
            continue;
        }

        let vel = getVector();
        vel     = invert(vel);

        if (velocities.indexOf(vel) !== -1) {
            continue;
        }

        positions.push(pos);
        velocities.push(vel);

        amount--;
    }

    positions.forEach((pos, index, positions) => {
        let p = new particle(pos, velocities[index]);

        particles.push(p);
    });

    return particles
}

function getVector() {
    let x = Math.round(Math.random() * 1000) % config.canvas.width - 10;
    let y = Math.round(Math.random() * 1000) % config.canvas.height - 10;

    let vector = [x, y];

    return vector;
}

function invert(vector) {
    let chance = Math.random();

    if (chance % 7 === 0) {
        vector[0] = - vector[0];
    }

    if (chance % 3 === 0) {
        vector[1] = - vector[1];
    }

    return vector;
}

module.exports = {
    optimize
};