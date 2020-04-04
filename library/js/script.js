//configuración canvas
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//inicializar cursor
const mouse = {x: null, y: null};

//agregar evento mousemove para capturar las coordenadas
window.addEventListener('mousemove', function() {
    mouse.x = event.x;
    mouse.y = event.y;
});

//formatear posición del cursor
setInterval(function cursor() {
    mouse.x = undefined;
    mouse.y = undefined;
}, 200);

//crear particulas
let particles = [];
let quantityParticles = 1000;

class particle {
    //constructor particula
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
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
        this.size -= 0.3;

        if(this.size < 0) {
            this.x = (mouse.x + ((Math.random() * 20) -10));
            this.y = (mouse.y + ((Math.random() * 20) -10));
            this.size = (Math.random() * 10) + 2;
            this.weight = (Math.random() * 2) - 0.5;
        }

        this.y += this.weight;
        this.weight += 0.2;

        if(this.y > canvas.height - this.size) {
            this.weight *= -1;
        }
    }
};

//inicializar pantalla con particula
function init() {
    particles = [];

    for(let index = 0; index < quantityParticles; index++) {
        let x = 0;
        let y = 0;
        let size = 0;
        let color = 'white';
        let weight = 1;
        particles.push(new particle(x, y, size, color, weight));
    }
};

//animar particulas
function animate() {
    context.fillStyle = 'rgba(0,0,0,0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    for(let index = 0; index < particles.length; index++) {
        particles[index].update();
        particles[index].draw();
    }

    requestAnimationFrame(animate);
};

//inicializar particulas
init();
animate();