
const configs = {
    iterations: 60,
    particles: 12,
    dimensions: 2,
    pso: {
        heuristic: (position) => {
            let posx = position[0] - 200;
            let posy = position[1] - 200;

            // x^2 + y^2
            let result = Math.pow(posx, 2) + Math.pow(posy, 2);

            return result
        },
        accelP: 1.75,
        accelG: 1,
        inertia: 0.015
    },
    canvas: {
        width: 400,
        height: 400
    }
};

module.exports = configs;
