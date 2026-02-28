// Fake cursor to follow the and the real cursor cannot be seen

const cursor = document.getElementById("cursor");
const TRAIL_TIME = 500;

document.addEventListener("mousemove", e => {
        // Move fake cursor
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

        createTrail(e.pageX, e.pageY);
});

function createTrail(x, y) {
        const dot = document.createElement("div");
        dot.className = "trail";
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        document.body.appendChild(dot);
        setTimeout(() => dot.remove(), TRAIL_TIME);
}