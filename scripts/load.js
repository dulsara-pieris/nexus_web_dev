//load stuff at start gray overlay fades
window.addEventListener("load", () => {
        const sparkstart = document.createElement("div");
        sparkstart.style.position = "fixed";
        sparkstart.style.inset = "0";
        sparkstart.style.background = "#3d3d3d";
        sparkstart.style.opacity = "0.74";
        sparkstart.style.zIndex = "9999";
        sparkstart.style.transition = "opacity 1s ease-out";
        document.body.appendChild(sparkstart);

        setTimeout(() => {
                sparkstart.style.opacity = "0";
                setTimeout(() => sparkstart.remove(), 730);
        }, 50);
});