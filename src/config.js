
const configs = {
    generations: 10,
    pso: {
        heuristic: (position) => {
            let posx = position[0];
            let posy = position[1];

            let result = Math.pow(posx, 2) + Math.pow(posy, 2);

            return result
        },
        acceleration1: 1,
        acceleration2: 1,
        inertia: 1
    }
};

module.exports = configs;
