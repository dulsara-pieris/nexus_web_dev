//added some vaiables to control the typewriter easilty
const cursor_delay = 30;
const line_delay = 400;

//added os detection and cpu core and display size detection to displayed in boot screan
window.addEventListener("load", () => {
        const osName = getOS();
        const cores = navigator.hardwareConcurrency;
        const screenRes = `${screen.width}x${screen.height}`;
        const bootScreen = document.getElementById("boot-screen");

        //priniting boot thing at start using typewriter js
        const typewriter = new Typewriter("#typewriter", {
                delay: cursor_delay,
                cursor: "█",
        });

        typewriter
                .typeString(`root@${osName}:~# ./retrocore --init`)
                 .pauseFor(line_delay)
                .typeString(`<br> OS: ${osName}`)
                .typeString(`<br> CPU Cores: ${cores}`)
                .typeString(`<br> Resolution: ${screenRes}`)
                .pauseFor(line_delay)
                .typeString("<br><br> Loading to memory...")
                .pauseFor(line_delay + 300)
                //boot stuff ram function
                 .callFunction(() => runProgress())
 
                .typeString("<br><br> Loading museum database...")
                . pauseFor(line_delay)
                .typeString(
                        `<br> Establishing secure connection with ${osName}OS`
                )
                .pauseFor(line_delay)
                  .typeString("<br> Access Granted")
                .pauseFor(300)
                  .pauseFor(300)
                .callFunction(() => {
                        bootScreen.style.opacity = "0";
                        setTimeout(() => {
                                bootScreen.style.display = "none";
                        }, 2000);
                })
                .start();


//the progress bar for loading ram like arch linux installation
   function runProgress() {
         const container = document.getElementById("typewriter");
         let percent = 0;

         const interval = setInterval(() => {
                  percent += 10;
                   const blocks = "█".repeat(percent / 10);
                    const dashes = "-".repeat(10 - percent / 10);
                  
                  container.textContent = `     ${blocks}${dashes}  ${percent}%`;

                   if (percent >= 100) clearInterval(interval);
         }, 200);
   }

});