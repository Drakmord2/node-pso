
const configs = {
    dimensions: 3,
    fixed_placement: false,
    pso: {
        accelP: 1.07,
        accelG: 2.12,
        inertia: 0.021,
        heuristics: {
            sphere: (position, dimensions) => {
                let pos = [];
                for(let n = 0; n < dimensions; n++){
                    pos.push(position[n] - 210);
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
                    pos.push(position[n] - 210);
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
                    pos.push(position[n] - 210);
                }

                // 10 * n + ∑ [ x^2 - 10 * cos(2 * pi * x) ]
                let result = 10 * dimensions;

                for(let n = 0; n < dimensions; n++){
                    result += Math.pow(pos[n], 2) - 10 * Math.cos(2 * Math.PI * pos[n]);
                }

                return result
            }
        }
    },
    canvas: {
        width: 420,
        height: 420
    }
};

module.exports = configs;
