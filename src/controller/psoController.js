
const config    = require('../config');
const particle  = require('../model/particle');

function optimize(req, res, next) {
    const func_name     = req.body.func_name;
    const num_particles = req.body.num_particles;
    const iterations    = req.body.max_iteration;
    const particles     = generate_particles(num_particles, func_name);

    let positions       = [];
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
        positions: positions
    };

    res.json(data);
}

function generate_particles(amount, func_name) {
    let particles = [];
    let positions = [];
    let velocities = [];

    while (amount > 0) {

        let pos = get_vector();
        if (positions.indexOf(pos) !== -1) {
            continue;
        }

        let vel = get_vector();
        vel     = invert(vel);

        if (velocities.indexOf(vel) !== -1) {
            continue;
        }

        positions.push(pos);
        velocities.push(vel);

        amount--;
    }
    
    if (config.fixed_placement) {
        positions = fixed_particles();
    }

    const heuristic = config.pso.heuristics[func_name];

    positions.forEach((pos, index, positions) => {
        let p = new particle(pos, velocities[index], heuristic);

        particles.push(p);
    });

    return particles
}

function fixed_particles() {
    positions = [
        [10, 10],  [137, 10],  [264, 10],  [390, 10],
        [10, 195], [137, 195], [264, 195], [390, 195],
        [10, 390], [137, 390], [264, 390], [390, 390],
    ];

    return positions;
}

function get_vector() {
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