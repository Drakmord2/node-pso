
const c         = document.getElementById("myCanvas");
const ctx       = c.getContext("2d");
let generation  = 1;
let max_generation = 10;
let frameID     = 0;

function generate_particles(amount) {
    let particles = [];

    let posx = 0;
    let posy = 0;

    while (amount > 0) {
        posx = Math.round(Math.random()*1000)%620;
        posy = Math.round(Math.random()*1000)%380;

        let pos = [posx, posy];
        if (particles.indexOf(pos) !== -1) {
            continue;
        }

        particles.push(pos);

        amount--;
    }

    return particles
}

function draw() {
    let particles = generate_particles(15); // Request position from the server

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

    ctx.strokeStyle = "#0100ff";
    ctx.stroke();
}

function clear() {
    ctx.beginPath();
    ctx.clearRect(0, 0, 640, 400);
}

function newGeneration() {
    if (generation > max_generation) {
        cancelAnimationFrame(frameID);
        return;
    }

    if (frameID % 59 === 0) {
        clear();
    }

    if (frameID % 60 === 0) {
        draw();
        generation++;
    }

    frameID = requestAnimationFrame(newGeneration);
}

function start() {
    frameID = requestAnimationFrame(newGeneration);
}

window.onload = start();
