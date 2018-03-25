
const xhr = new XMLHttpRequest();

const c             = document.getElementById("myCanvas");
const ctx           = c.getContext("2d");
let iteration      = 0;
let max_iteration  = 10;
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
        drawParticle(index+1, pos[0][0], pos[0][1]);
        drawStats(pos[1]);
    });
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

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0100ff";
    ctx.stroke();

    ctx.beginPath();
    ctx.font="14px Roboto";
    ctx.strokeStyle = "#16ff00";
    ctx.strokeText(id, x, y-4);
}

function drawStats(gbest) {
    ctx.beginPath();
    ctx.clearRect(0, 402, 403, 442);

    gbest = gbest.toFixed(2);

    ctx.lineWidth = 3;
    ctx.font="18px Roboto";
    ctx.strokeStyle = "#000";
    ctx.fillText("Iteration: " + (iteration + 1), 20, 430);
    ctx.fillText("gbest: " + gbest, 260, 430);
}

function clear() {
    ctx.beginPath();
    ctx.clearRect(0, 0, 403, 402);
}

function newGeneration() {
    if (iteration >= max_iteration) {
        cancelAnimationFrame(frameID);
        return;
    }

    if (frameID % 50 === 0) {
        clear();
    }

    if (frameID % 25 === 0) {
        draw(positions[iteration]);
        iteration++;
    }

    frameID = requestAnimationFrame(newGeneration);
}

xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        let data = this.responseText;

        data = JSON.parse(data);

        max_iteration  = data.iterations;
        positions      = data.positions;

        frameID = requestAnimationFrame(newGeneration);
    }
};

function start() {
    sendRequest('/pso');
}

window.onload = start();
