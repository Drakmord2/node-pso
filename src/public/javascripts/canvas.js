
const xhr = new XMLHttpRequest();

const c             = document.getElementById("myCanvas");
const ctx           = c.getContext("2d");
let generation      = 0;
let max_generation  = 10;
let positions       = [];
let frameID         = 0;

function sendRequest(path) {
    xhr.open('GET', `http://localhost:8181${path}`, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

function draw(particles) {
    let func = document.getElementById("sphere");
    ctx.drawImage(func, 0, 0);

    particles.forEach((pos, index, particles) => {
        drawParticle(pos[0], pos[1]);
    });
}

function drawParticle(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+10, y);
    ctx.lineTo(x+10, y+10);
    ctx.lineTo(x, y+10);
    ctx.lineTo(x, y);
    ctx.lineTo(x+10, y+10);
    ctx.moveTo(x+10, y);
    ctx.lineTo(x, y+10);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0100ff";
    ctx.stroke();
}

function clear() {
    ctx.beginPath();
    ctx.clearRect(0, 0, 403, 402);
}

function newGeneration() {
    if (generation >= max_generation) {
        cancelAnimationFrame(frameID);
        return;
    }

    if (frameID % 59 === 0) {
        clear();
    }

    if (frameID % 60 === 0) {
        draw(positions[generation]);
        generation++;
    }

    frameID = requestAnimationFrame(newGeneration);
}

xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        let data = this.responseText;

        data = JSON.parse(data);

        max_generation  = data.generations;
        positions       = data.positions;

        frameID = requestAnimationFrame(newGeneration);
    }
};

function start() {
    sendRequest('/pso');
}

window.onload = start();
