//got sound of retro mouse click on a link tags
document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function (e) {
        e.preventDefault();

        const url = this.href;
        const sound = new Audio("assests/sounds/click.mp3");

        sound.play();

        setTimeout(() => {
                sound.pause(); 
                sound.currentTime = 0;
                window.location.href = url;
        }, 350);//put delay because url changing so forced to stop
        });
});