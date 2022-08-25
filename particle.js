// JavaScript source code
var canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
m = canvas.getContext('2d')

draw = (x, y, c, s) => { m.fillStyle = c; m.fillRect(x, y, s, s) }
atoms = []
atom = (x, y, c) => { return { "x": x, "y": y, "vx": 0, "vy": 0, "color": c } }
randomX = () => { return Math.random() * (canvas.width - 100) + 50 }
randomY = () => { return Math.random() * (canvas.height - 100) + 50 }
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
                F = g * 1 / d
                fx += (F * dx)
                fy += (F * dy)
            }
        }
        a.vx = (a.vx + fx) * 0.5
        a.vy = (a.vy + fy) * 0.5
        a.x += a.vx
        a.y += a.vy
        if (a.x <= 0 || a.x >= 500) { a.vx *= -1 }
        if (a.y <= 0 || a.y >= 500) { a.vy *= -1 }
    }
}
var numOfParticles = (canvas.width + canvas.height) * 0.1;
yellow = create(numOfParticles, "yellow")
red = create(numOfParticles, "red")
green = create(numOfParticles, "green")
update = () => {
    rule(green, green, -0.32)
    rule(green, red, -0.17)
    rule(green, yellow, 0.34)
    rule(red, red, -0.10)
    rule(red, green, -0.34)
    rule(yellow, yellow, 0.15)
    rule(yellow, green, -0.20)
    m.clearRect(0, 0, canvas.width, canvas.height)
    draw(0, 0, "black", Math.max(canvas.width,canvas.height))
    for (i = 0; i < atoms.length; i++) {
        draw(atoms[i].x, atoms[i].y, atoms[i].color, 5)
    }
    requestAnimationFrame(update)
}
update();
