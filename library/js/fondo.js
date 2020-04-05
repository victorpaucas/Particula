//configuración canvas
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//inicializar cursor
const mouse = { x: null, y: null, radius: (canvas.height/80) * (canvas.width/80) };

//agregar evento mousemove para capturar las coordenadas
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

//crear particulas
let particles = [];

class particle {
    //constructor particula
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    //dibujar particula
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
    }

    //actualizar particula
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }

        if (this.x > canvas.width || this.x < 0) {
            this.directionY = -this.directionY;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size - 200) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }

        //mover particulas
        this.x += this.directionX;
        this.y += this.directionY;

        //dibujar particulas
        this.draw();
    }
};

//inicializar pantalla con particula
function init() {
    particles = [];
    let quantityParticles = (canvas.height * canvas.width) / 9000;

    for (let index = 0; index < quantityParticles; index++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = 'white';
        particles.push(new particle(x, y, directionX, directionY, size, color));
    }
};

//conectar particulas
function connect() {
    let opacity = 100;

    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let distance = (
                (particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)
            ) + (
                    (particles[a].y - particles[b].y) * (particles[a].y - particles[b].y)
                );
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacity = 1 - (distance / 20000);
                context.strokeStyle = 'rgba(255, 255, 255, '+ opacity + ')';
                context.lineWidth = 1;
                context.beginPath();
                context.moveTo(particles[a].x, particles[a].y);
                context.lineTo(particles[b].x, particles[b].y);
                context.stroke();
            }
        }
    }
};

//animar particulas
function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);

    for (let index = 0; index < particles.length; index++) {
        particles[index].update();
    }

    connect();
};

//ajustar tamaño del fondo
window.addEventListener('resize', function () {
    canvas.width = this.innerWidth;
    canvas.height = this.innerHeight;
    mouse.radius = ((canvas.width / 80) * (canvas.height / 80));
    init();
});

//formatear posición del cursor
window.addEventListener('mouseout', function (event) {
    mouse.x = undefined;
    mouse.y = undefined;
});

//inicializar particulas
init();
animate();