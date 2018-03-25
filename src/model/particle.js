
const config = require('../config');

let heuristic = config.pso.heuristic;
let gbest = {
    solution: 99999999,
    position: []
};

class Particle {
    constructor(position) {
        this.position   = position;
        this.pbest      = {
            solution: heuristic(position),
            position: position
        };
    }

    evaluate() {
        let result = heuristic(this.position);

        if (result <= this.pbest[0]) {
            this.pbest.solution = result;
            this.pbest.position = this.position;
        }

        if (this.pbest.solution <= gbest.solution) {
            gbest = this.pbest;
        }

        this.getVelocity();
    }

    getVelocity() {
        //v(t+1) = w.v(t) + c1.r1.(pbest) + c2.r2.(gbest)
    }
}

module.exports = Particle;
