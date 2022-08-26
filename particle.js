// JavaScript source code
var canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
m = canvas.getContext('2d')

draw = (x, y, c, s) => { m.fillStyle = c; m.fillRect(x, y, s, s) }
atoms = []
atom = (x, y, c) => { return { "x": x, "y": y, "vx": 0, "vy": 0, "color": c } }
randomX = () => { return Math.random() * (canvas.width)}
randomY = () => { return Math.random() * (canvas.height) }
create = (number, color) => {
    group = []
    for (let i = 0; i < number; i++) {
        group.push(atom(randomX(), randomY(), color))
        atoms.push(group[i])
    }
    return group
}
rule = (atoms1, atoms2, g) => {
    for (let i = 0; i < atoms1.length; i++) {
        fx = 0
        fy = 0
        for (let j = 0; j < atoms2.length; j++) {
            a = atoms1[i]
            b = atoms2[j]
            dx = a.x - b.x
            dy = a.y - b.y
            d = Math.sqrt(dx * dx + dy * dy)
            if (d > 0 && d < 80) {
                F = -g * 1 / d
                fx += (F * dx)
                fy += (F * dy)
            }
        }
        a.vx = (a.vx + fx) * 0.5
        a.vy = (a.vy + fy) * 0.5
        a.x += a.vx / 2
        a.y += a.vy / 2
        if (a.x <= 0 || a.x >= canvas.width) { a.vx *= -1 }
        if (a.y <= 0 || a.y >= canvas.height) { a.vy *= -1 }
        if (a.x <= 0) { a.x = 0 }
        if (a.x >= canvas.width) { a.x = canvas.width }
        if (a.y <= 0) { a.y = 0 }
        if (a.y >= canvas.height) { a.y = canvas.height }
    }
}
var numOfParticles = (canvas.width + canvas.height) * 0.2;
yellow = create(numOfParticles, "yellow")
red = create(numOfParticles, "red")
green = create(numOfParticles, "green")


//let gr = -0.17;
//let gg = -0.32;
//let gy = 0.34
//let rr = -0.1;
//let rg = -0.34;
//let ry = 0;
//let yr = 0;
//let yg = -0.2
//let yy = 0.15;
let gr = 0;
let gg = 0;
let gy = 0;
let rr = 0;
let rg = 0;
let ry = 0;
let yr = 0;
let yg = 0;
let yy = 0;




update = () => {
    UpdateValues();
    rule(green, red, gr)
    rule(green, green, gg)
    rule(green, yellow, gy)
    rule(red, red, rr)
    rule(red, green, rg)
    rule(red, yellow, ry)
    rule(yellow, red, yr)
    rule(yellow, green, yg)
    rule(yellow, yellow, yy)

    m.clearRect(0, 0, canvas.width, canvas.height)
    draw(0, 0, "black", Math.max(canvas.width,canvas.height))
    for (i = 0; i < atoms.length; i++) {
        draw(atoms[i].x, atoms[i].y, atoms[i].color, 5)
    }
    requestAnimationFrame(update)
}
update();


function UpdateSliders() {
    document.getElementById("sliderRR").value = rr * 100;
    document.getElementById("sliderRG").value = rg * 100;
    document.getElementById("sliderRY").value = ry * 100;
    document.getElementById("sliderGR").value = gr * 100;
    document.getElementById("sliderGG").value = gg * 100;
    document.getElementById("sliderGY").value = gy * 100;
    document.getElementById("sliderYR").value = yr * 100;
    document.getElementById("sliderYG").value = yg * 100;
    document.getElementById("sliderYY").value = yy * 100;
}
function UpdateValues() {
    rr = document.getElementById("sliderRR").value / 100;
    rg = document.getElementById("sliderRG").value / 100; 
    ry = document.getElementById("sliderRY").value / 100; 
    gr = document.getElementById("sliderGR").value / 100; 
    gg = document.getElementById("sliderGG").value / 100;
    gy = document.getElementById("sliderGY").value / 100;
    yr = document.getElementById("sliderYR").value / 100;
    yg = document.getElementById("sliderYG").value / 100;
    yy = document.getElementById("sliderYY").value / 100;
}

//presets
function PresetRandom() {
    gr = Math.random() * 2 - 1;
    gg = Math.random() * 2 - 1;
    gy = Math.random() * 2 - 1;
    rr = Math.random() * 2 - 1;
    rg = Math.random() * 2 - 1;
    ry = Math.random() * 2 - 1;
    yr = Math.random() * 2 - 1;
    yg = Math.random() * 2 - 1;
    yy = Math.random() * 2 - 1;
    UpdateSliders();
}

function PresetHunters() {
     gr = 0.17;
     gg = 0.32;
     gy = -0.34
     rr = 0.1;
     rg = 0.34;
     ry = 0;
     yr = 0;
     yg = 0.2
    yy = -0.15;
    UpdateSliders();
}
function PresetWorms() {
    gr = 0.17;
    gg = -0.2;
    gy = -0.34
    rr = 0.1;
    rg = 0.34;
    ry = 0;
    yr = 0;
    yg = 0.2
    yy = -0.15;
    UpdateSliders();
}
function PresetBlackHole() {
    rr = -0.9;
    rg = 0.8;
    ry = 0.6;
    gr = 1;
    gg = 0.7;
    gy = -0.44;
    yr = -0.07;
    yg = -0.09;
    yy = -1.5;
    UpdateSliders();
}
function PresetCells() {
    rr = -0.3;
    rg = -0.2;
    ry = -0.5;
    gr = -0.5;
    gg = 0.3;
    gy = 0;
    yr = 0.3;
    yg = -0.3;
    yy = -0.4;
    UpdateSliders();
}
function PresetChasing() {
    rr = 0;
    rg = 1;
    ry = -1;
    gr = -1;
    gg = 0;
    gy = 1;
    yr = 1;
    yg = -1;
    yy = 0;
    UpdateSliders();
}
function PresetSplitters() {
    rr = -0.3;
    rg = 0.81;
    ry = -0.9;
    gr = -0.84;
    gg = 0.91;
    gy = 0.06;
    yr = 0.63;
    yg = -0.68;
    yy = -0.4;
    UpdateSliders();

}
//actions
function ResetParticles() {
    atoms = [];
    var numOfParticles = (canvas.width + canvas.height) * 0.2;
    yellow = create(numOfParticles, "yellow")
    red = create(numOfParticles, "red")
    green = create(numOfParticles, "green")
}
function ResetSliders() {
    gr = 0;
    gg = 0;
    gy = 0;
    rr = 0;
    rg = 0;
    ry = 0;
    yr = 0;
    yg = 0;
    yy = 0;
    UpdateSliders();
}
