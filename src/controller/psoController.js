
const config    = require('../config');
const particle  = require('../model/particle');

function optimize(req, res, next) {
    const func_name     = req.body.func_name;
    const num_particles = req.body.num_particles;
    const iterations    = req.body.max_iteration;

    particle.clear();
    let particles = generate_particles(num_particles, func_name);

    let positions = [];
    let gbest = {
        solution: NaN,
        position: [NaN, NaN]
    };

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
        positions:  positions,
        boundary:   config.pso.boundaries[func_name]
    };

    res.json(data);
}

function generate_particles(amount, func_name) {
    let particles   = [];
    let positions   = [];
    let velocities  = [];
    const boundary  = config.pso.boundaries[func_name];

    while (amount > 0) {
        let pos = get_vector(boundary);
        if (positions.indexOf(pos) !== -1) {
            continue;
        }

        let vel = get_vector(boundary);
        if (velocities.indexOf(vel) !== -1) {
            continue;
        }

        positions.push(pos);
        velocities.push(vel);

        amount--;
    }

    const heuristic = config.pso.heuristics[func_name];

    positions.forEach((pos, index, positions) => {
        let p = new particle(pos, velocities[index], heuristic, boundary);

        particles.push(p);
    });

    return particles
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
}

function get_vector(boundary) {
    const dimensions    = config.dimensions;
    let vector          = [];

    for(let n = 0; n < dimensions; n++){
        let k = randomBetween(boundary[0], boundary[1]);

        vector.push(k);
    }

    return vector;
}

module.exports = {
    optimize
};
