
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
}

function clear() {
    ctx.beginPath();
    ctx.clearRect(0, 0, 420, 420);
}

function draw(particles) {
    drawContour();

    particles.forEach((pos, index, particles) => {
        drawParticle(index+1, pos[0][0], pos[0][1]);
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

function newGeneration() {
    if (iteration >= max_iteration) {
        cancelAnimationFrame(frameID);
        return;
    }

    if (frameID % 20 === 0) {
        clear();
    }

    if (iteration <= max_iteration) {
        let resultBox   = document.getElementById('result');
        let gbest       = positions[iteration][num_particles-1][1];

        resultBox.innerHTML = `Iteration: ${iteration+1}<br>Global Best: ${gbest.solution}`;
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
    positions       = [];
    iteration       = 0;
    frameID         = 0;

    func_name       = 'rastrigin';
    max_iteration   = 100;
    num_particles   = 30;
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
