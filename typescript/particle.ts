// @ts-ignore
const canvas: HTMLCanvasElement = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const m = canvas.getContext('2d')

type AtomReturn = number | (() => number)
interface Atom {
    "x": AtomReturn | undefined;
    "y": AtomReturn | undefined;
    "vx": number;
    "vy": number;
    "color": string | undefined
}

const draw = (x?: number, y?: number, c?: string, s?: number) => {
    // @ts-ignore
    m.fillStyle = c;
    // @ts-ignore
    m.fillRect(x, y, s, s)
}
let atoms: Atom[] = []
const atom = (x?: AtomReturn, y?: AtomReturn, c?: string): Atom => {
    return {
        "x": x,
        "y": y,
        "vx": 0,
        "vy": 0,
        "color": c
    }
}
const randomX = (): number => Math.random() * (canvas.width)
const randomY = (): number => Math.random() * (canvas.height)
const create = (number: number, color: string) => {
    let group = []
    for (let i = 0; i < number; i++) {
        // @ts-ignore
        group.push(atom(randomX(), randomY(), color))
        atoms.push(group[i])
    }
    return group
}
const rule = (atoms1: Atom[], atoms2, g) => {
    let a;
    for (let i = 0; i < atoms1.length; i++) {
        let fx = 0
        let fy = 0
        for (let j = 0; j < atoms2.length; j++) {
            a = atoms1[i]
            let b = atoms2[j]
            let dx = a.x - b.x
            let dy = a.y - b.y
            let d = Math.sqrt(dx * dx + dy * dy)
            if (d > 0 && d < 80) {
                let F = -g * 1 / d;
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
let yellow = create(numOfParticles, "yellow")
let red = create(numOfParticles, "red")
let green = create(numOfParticles, "green")

const updateSliders = () => {
    // @ts-ignore
    document.getElementById("sliderRR").value = rr * 100;
    // @ts-ignore
    document.getElementById("sliderRG").value = rg * 100;
    // @ts-ignore
    document.getElementById("sliderRY").value = ry * 100;
    // @ts-ignore
    document.getElementById("sliderGR").value = gr * 100;
    // @ts-ignore
    document.getElementById("sliderGG").value = gg * 100;
    // @ts-ignore
    document.getElementById("sliderGY").value = gy * 100;
    // @ts-ignore
    document.getElementById("sliderYR").value = yr * 100;
    // @ts-ignore
    document.getElementById("sliderYG").value = yg * 100;
    // @ts-ignore
    document.getElementById("sliderYY").value = yy * 100;
}
const shuffle = (array: Atom[]) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

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

const updateValues = () => {
    // @ts-ignore
    rr = document.getElementById("sliderRR").value / 100;
    // @ts-ignore
    rg = document.getElementById("sliderRG").value / 100; 
    // @ts-ignore
    ry = document.getElementById("sliderRY").value / 100; 
    // @ts-ignore
    gr = document.getElementById("sliderGR").value / 100;
    // @ts-ignore 
    gg = document.getElementById("sliderGG").value / 100;
    // @ts-ignore
    gy = document.getElementById("sliderGY").value / 100;
    // @ts-ignore
    yr = document.getElementById("sliderYR").value / 100;
    // @ts-ignore
    yg = document.getElementById("sliderYG").value / 100;
    // @ts-ignore
    yy = document.getElementById("sliderYY").value / 100;
}



let update = () => {
    updateValues();
    rule(green, red, gr)
    rule(green, green, gg)
    rule(green, yellow, gy)
    rule(red, red, rr)
    rule(red, green, rg)
    rule(red, yellow, ry)
    rule(yellow, red, yr)
    rule(yellow, green, yg)
    rule(yellow, yellow, yy)
// @ts-ignore
    m.clearRect(0, 0, canvas.width, canvas.height)
    draw(0, 0, "black", Math.max(canvas.width,canvas.height))
    for (let i = 0; i < atoms.length; i++) {
        // @ts-ignore
        draw(atoms[i].x, atoms[i].y, atoms[i].color, 5)
    }
    shuffle(atoms);
    var first = atoms.shift();
    // @ts-ignore
    first.x = randomX();
    // @ts-ignore
    first.y = randomY();
    // @ts-ignore
    atoms.push(first);
    requestAnimationFrame(update)
}
update();



//presets
const presetRandom = () => {
    gr = Math.random() * 2 - 1;
    gg = Math.random() * 2 - 1;
    gy = Math.random() * 2 - 1;
    rr = Math.random() * 2 - 1;
    rg = Math.random() * 2 - 1;
    ry = Math.random() * 2 - 1;
    yr = Math.random() * 2 - 1;
    yg = Math.random() * 2 - 1;
    yy = Math.random() * 2 - 1;
    updateSliders();
}

const presetHunters = () => {
     gr = 0.17;
     gg = 0.32;
     gy = -0.34
     rr = 0.1;
     rg = 0.34;
     ry = 0;
     yr = 0;
     yg = 0.2
    yy = -0.15;
    updateSliders();
}
const presetWorms = () => {
    gr = 0.17;
    gg = -0.2;
    gy = -0.34
    rr = 0.1;
    rg = 0.34;
    ry = 0;
    yr = 0;
    yg = 0.2
    yy = -0.15;
    updateSliders();
}
const presetBlackHole = () => {
    rr = -0.9;
    rg = 0.8;
    ry = 0.6;
    gr = 1;
    gg = 0.7;
    gy = -0.44;
    yr = -0.07;
    yg = -0.09;
    yy = -1.5;
    updateSliders();
}
const presetCells = () => {
    rr = -0.3;
    rg = -0.2;
    ry = -0.5;
    gr = -0.5;
    gg = 0.3;
    gy = 0;
    yr = 0.3;
    yg = -0.3;
    yy = -0.4;
    updateSliders();
}
const presetChasing = () => {
    rr = 0;
    rg = 1;
    ry = -1;
    gr = -1;
    gg = 0;
    gy = 1;
    yr = 1;
    yg = -1;
    yy = 0;
    updateSliders();
}
const presetSplitters = () => {
    rr = -0.3;
    rg = 0.81;
    ry = -0.9;
    gr = -0.84;
    gg = 0.91;
    gy = 0.06;
    yr = 0.63;
    yg = -0.68;
    yy = -0.4;
    updateSliders();

}
//actions
const resetParticles = () => {
    atoms = [];
    var numOfParticles = (canvas.width + canvas.height) * 0.2;
    yellow = create(numOfParticles, "yellow")
    red = create(numOfParticles, "red")
    green = create(numOfParticles, "green")
}
const resetSliders = () => {
    gr = 0;
    gg = 0;
    gy = 0;
    rr = 0;
    rg = 0;
    ry = 0;
    yr = 0;
    yg = 0;
    yy = 0;
    updateSliders();
}
