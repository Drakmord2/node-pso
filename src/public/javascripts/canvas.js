
const xhr = new XMLHttpRequest();

let func_name;
let iteration;
let max_iteration;
let positions;
let frameID;
let num_particles;

const c     = document.getElementById("myCanvas");
const ctx   = c.getContext("2d");

xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        let data = this.responseText;

        data = JSON.parse(data);

        max_iteration  = data.iterations;
        positions      = data.positions;

        frameID = requestAnimationFrame(newGeneration);
    }
};

function clearCanvas() {
    cancelAnimationFrame(frameID);
    init();

    ctx.beginPath();
    ctx.clearRect(0, 0, 420, 460);

    drawContour();
    drawStats({solution:NaN, position:[NaN, NaN]});
}

function clear() {
    ctx.beginPath();
    ctx.clearRect(0, 0, 420, 420);
}

function draw(particles) {
    drawContour();

    particles.forEach((pos, index, particles) => {
        drawParticle(index+1, pos[0][0], pos[0][1]);
        drawStats(pos[1]);
    });
}

function drawContour() {
    let func = document.getElementById(func_name);
    ctx.drawImage(func, 0, 0);
}

function drawParticle(id, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+10, y);
    ctx.lineTo(x+10, y+10);
    ctx.lineTo(x, y+10);
    ctx.lineTo(x, y);
    ctx.lineTo(x+10, y+10);
    ctx.moveTo(x+10, y);
    ctx.lineTo(x, y+10);

    ctx.lineWidth   = 2;
    ctx.strokeStyle = "#0100ff";
    ctx.stroke();

    ctx.beginPath();
    ctx.font        = "14px Roboto";
    ctx.strokeStyle = "#16ff00";
    ctx.strokeText(id, x, y-4);
}

function drawStats(gbest) {
    ctx.beginPath();
    ctx.clearRect(0, 420, 420, 460);

    gbest.solution      = gbest.solution === null ? NaN : gbest.solution.toFixed(2);
    gbest.position[0]   = gbest.position[0] === null ? NaN : (gbest.position[0]-210).toFixed(2);
    gbest.position[1]   = gbest.position[1] === null ? NaN : (gbest.position[1]-210).toFixed(2);

    ctx.lineWidth   = 3;
    ctx.font        = "18px Roboto";
    ctx.strokeStyle = "#000";

    ctx.fillText("Iteration: " + (iteration + 1), 20, 445);
    ctx.fillText("gbest: " + gbest.solution + " ["+ gbest.position + "]", 200, 445);
}

function newGeneration() {
    if (iteration >= max_iteration) {
        cancelAnimationFrame(frameID);
        return;
    }

    if (frameID % 20 === 0) {
        clear();
    }

    if (frameID % 10 === 0) {
        draw(positions[iteration]);
        iteration++;
    }

    frameID = requestAnimationFrame(newGeneration);
}

function restart() {
    clearCanvas();

    start();
}

function sendRequest(json, path) {
    xhr.open('POST', `http://localhost:8181${path}`, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(json);
}

function init() {
    iteration       = 0;
    positions       = [];
    frameID         = 0;

    func_name       = 'rastrigin';
    max_iteration   = 150;
    num_particles   = 25;
}

function start() {
    init();

    let data = {
        func_name: func_name,
        num_particles: num_particles,
        max_iteration: max_iteration
    };
    const json = JSON.stringify(data);

    sendRequest(json, '/pso');
}

window.onload = start();
