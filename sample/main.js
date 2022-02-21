




//고래클릭
const canvas = document.getElementById("canvas");
const whale = document.getElementById("whale");
const eyeOpen = document.getElementById("eye_open");
const eyeClosed = document.getElementById("eye_closed");
const waves = document.querySelectorAll(".wave");
const sea = document.querySelector(".wavy-line");
const ctx = canvas.getContext("2d");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);
let particles = [];
const colors = [
  "#1B1184",
  "#5260AA",
  "#7888BF",
  "#9BB0D4",
  "#C1D6E8",
  "#E5F2F4"
];
const gravity = 0.08;
let isShowerOn = false;

//고래 클릭시 물뿜기
whale.addEventListener("click", (e) => {
    makeShower();
});

const makeShower = () => {
    if (!isShowerOn) {
        //만약 샤워온이 false라면
        isShowerOn = true;
        //true로 변경해주고
        animate();
        //애니메이트를 실행하고
        addClasses();
        //addClasses를 실행하고
        setTimeout(removeClasses, 2000);
        //2초뒤에 removeClasses를 실행해주세요.
    }
};

const removeClasses = () => {
    //shake 클라스를 없애주세요.
    whale.classList.remove("shake");
    //eyeOpen 객체에 is-hidden 클래스를 제거해주세요.
    eyeOpen.classList.remove("is-hidden");
    //sea 선택자 animate-sea를 없애주세요.
    sea.classList.remove("animate-sea");
    //waves 선택자 모두 animate-wave-forwards클래스를 삭제해주세요.
    waves.forEach((wave) => {
        wave.classList.remove("animate-wave-forwards");
    });
};


const addClasses = () => {
    //remove반대로 생각
    whale.classList.add("shake");
    eyeOpen.classList.add("is-hidden");
    sea.classList.add("animate-sea");
    waves.forEach((wave) => {
        wave.classList.add("animate-wave-forwards");
    });
};

const animate = () => {
    //ctx 아래 범위많큼 클리어삭제.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //파티클 길이를 반복문하세요.
    for (var i = 0; i < particles.length; i++) {
        particles[i].update(i);
    }
    //파티클 길이가 0보다 크면 
    if (particles.length > 0) {
        requestAnimationFrame(animate);
    } else {
    //파티클이 없으면
        //isShowerOn를 false로 한다.
        isShowerOn = false;
        //ctx 아래 범위많큼 클리어삭제.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //initParticles 실행한다.
        initParticles();
    }
};

const initParticles = () => {
    for (var i = 0; i < 100; i++) {
        setTimeout(createParticle, 25 * i, i);
    }
}

const createParticle = () => {
    const x = width * 0.5 - 17;
    const y = height * 0.5 - 70;
    const vx = -1.5 + Math.random() * 3;
    const vy = Math.random() * -8;
    const size = 4 + Math.random() * 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const life = 7 + Math.random() * 9;
    const opacity = 0.5 + Math.random() * 0.5;
    const p = new Particle(x, y, vx, vy, size, color, opacity, life);
    particles.push(p);
};


//resize
window.addEventListener("resize", resize);

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}



function Particle(x, y, vx, vy, size, color, opacity, life) {
    this.update = function (i) {
        vy += gravity;
        x += vx;
        y += vy;
        life -= 0.2;
        if (particles[i].remove() === true) {
            particles.splice(i, 1);
        }
        this.draw();
    };

    this.remove = function () {
        return life <= 0;
    };

    this.draw = function () {
        ctx.beginPath();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.arc(x, y, size, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
    };
}


document.addEventListener("DOMContentLoaded", () => {
    initParticles();
});