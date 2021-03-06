
const configs = {
    dimensions: 2,
    pso: {
        accelP: 2.05,
        accelG: 2.05,
        inertia: 0.4,
        boundaries: {
            sphere: [-100, 100],
            rosenbrock: [-30, 30],
            rastrigin: [-5.12, 5.12]
        },
        heuristics: {
            sphere: (position, dimensions) => {
                let pos = [];
                for(let n = 0; n < dimensions; n++){
                    pos.push(position[n]);
                }

                // ∑ x^2
                let result = Math.pow(pos[0], 2);

                for(let n = 1; n < dimensions; n++){
                    result += Math.pow(pos[n], 2);
                }

                return result
            },
            rosenbrock: (position, dimensions) => {
                let pos = [];
                for(let n = 0; n < dimensions; n++){
                    pos.push(position[n]);
                }

                // ∑ [ 100 * (y - x^2)^2 + (1 - x)^2 ]
                let result = 100 * Math.pow((pos[1] - Math.pow(pos[0], 2)), 2) + Math.pow((1 - pos[0]), 2);

                for(let n = 1; n < dimensions-1; n++){
                    result += 100 * Math.pow((pos[n+1] - Math.pow(pos[n], 2)), 2) + Math.pow((1 - pos[n]), 2);
                }

                return result
            },
            rastrigin: (position, dimensions) => {
                let pos = [];
                for(let n = 0; n < dimensions; n++){
                    pos.push(position[n]);
                }

                // 10 * n + ∑ [ x^2 - 10 * cos(2 * pi * x) ]
                let result = 10 * dimensions;

                for(let n = 0; n < dimensions; n++){
                    result += Math.pow(pos[n], 2) - 10 * Math.cos(2 * Math.PI * pos[n]);
                }

                return result
            }
        }
    }
};

module.exports = configs;
