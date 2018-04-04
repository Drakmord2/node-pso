
const config        = require('../config');
const dimensions    = config.dimensions;

let gbest = {
    solution: NaN,
    position: [NaN, NaN]
};

class Particle {
    constructor(position, velocity, heuristic) {
        this.heuristic  = heuristic;
        this.position   = position;
        this.velocity   = velocity;
        this.pbest      = {
            solution: heuristic(position, dimensions),
            position: position
        };
    }

    evaluate() {
        let result = this.heuristic(this.position, dimensions);

        if (result < this.pbest.solution) {
            this.pbest.solution = result;
            this.pbest.position = this.position;
        }

        if (isNaN(gbest.solution) || this.pbest.solution < gbest.solution) {
            gbest = this.pbest;
        }

        this.getNextPosition();

        return gbest;
    }

    getNextPosition() {
        // v(t+1) = w.v(t) + c1.r1.(pbest - x(t)) + c2.r2.(gbest - x(t))
        // x(t+1) = x(t) + v(t+1)

        let nextPosition    = [];
        let inertia         = config.pso.inertia;
        let accelp          = config.pso.accelP;
        let accelg          = config.pso.accelG;

        for (let i = 0; i < config.dimensions; i++) {
            let rp = Math.random();
            let rg = Math.random();

            let inertialComponent     = inertia * this.velocity[i];
            let cognitiveComponent    = accelp * rp * (this.pbest.position[i] - this.position[i]);
            let socialComponent       = accelg * rg * (gbest.position[i] - this.position[i]);

            let nextVelocity = inertialComponent + cognitiveComponent + socialComponent;

            let component = this.position[i] + nextVelocity;

            nextPosition.push(component);
        }

        nextPosition = this.bindVector(nextPosition);

        this.position = nextPosition;
    }

    bindVector(vector) {
        let width   = config.canvas.width - 10;
        let height  = config.canvas.height - 10;

        if (vector[0] > width) {
            vector[0] = width;
        }

        if (vector[0] < 0 ) {
            vector[0] = 0;
        }

        if (vector[1] > height) {
            vector[1] = height;
        }

        if (vector[1] < 0 ) {
            vector[1] = 0;
        }

        return vector
    }
}

module.exports = Particle;
