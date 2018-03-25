
const config = require('../config');
const particle = require('../model/particle');

function optimize(req, res, next) {
    const particles     = generate_particles(15);
    const generations   = config.generations;
    let positions       = [];

    for(let i = 0; i < generations; i++) {
        let auxPos = [];
         particles.forEach((particle, index, particles) => {
             particle.evaluate();

             auxPos.push(particle.position);
         });

         positions.push(auxPos);
    }

    const data = {
        generations: generations,
        positions: positions
    };

    res.json(data);
}

function generate_particles(amount) {
    let particles = [];
    let positions = [];

    let posx = 0;
    let posy = 0;

    while (amount > 0) {
        posx = Math.round(Math.random()*1000)%380;
        posy = Math.round(Math.random()*1000)%380;

        let pos = [posx, posy];
        if (positions.indexOf(pos) !== -1) {
            continue;
        }

        positions.push(pos);

        amount--;
    }

    positions.forEach((pos, index, positions) => {
        let p = new particle(pos);

        particles.push(p);
    });

    return particles
}

module.exports = {
    optimize
};