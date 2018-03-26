
const configs = {
    dimensions: 2,
    fixed_placement: false,
    pso: {
        accelP: 1.07,
        accelG: 2.12,
        inertia: 0.021,
        heuristics: {
            sphere: (position) => {
                let posx = position[0] - 210;
                let posy = position[1] - 210;

                // x^2 + y^2
                let result = Math.pow(posx, 2) + Math.pow(posy, 2);

                return result
            },
            himmelblau: (position) => {
                let posx = position[0] - 210;
                let posy = position[1] - 210;

                // (x^2 + y - 11)^2 + (x + y^2 - 7)^2
                let result = Math.pow( Math.pow(posx, 2) + posy - 11, 2) + Math.pow( posx + Math.pow(posy, 2) - 7, 2);

                return result
            },
            rastrigin: (position) => {
                let posx = position[0] - 210;
                let posy = position[1] - 210;

                // 10 * 2 + x^2 + y^2 - 10 * cos(2 * pi * x) - 10 * cos(2 * pi * y)
                let result = 2 * 10 + Math.pow(posx, 2) + Math.pow(posy, 2) - 10 * Math.cos(2 * Math.PI * posx) - 10 * Math.cos(2 * Math.PI * posy);

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
