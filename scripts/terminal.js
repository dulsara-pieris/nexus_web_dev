const font = new FontFace(
        "alvera-bold",
        "url(../assests/fonts/alvera/AlveraDEMO-BoldCircle.ttf)",
);

//checking for name is local storage if not equals to guest
let name = localStorage.getItem("musium-name") || "guest";

//sound effects
const error = new Audio(
        "../assests/sounds/freesound_community-windows-error-sound-effect-35894.mp3",
);

//loads the font
font.load().then((loadedFont) => {
        document.fonts.add(loadedFont);

        //init terminal
        const term = new Terminal({
                fontFamily: '"alvera-bold", monospace',
                fontSize: 21,
                theme: {
                        background: "#00000000", //allready have better background
                        foreground: "#00ffcc",
                        cursor: "#ff4704",
                },
                cursorBlink: true,
        });
        //fit addon for resize stuff
        const fitAddon = new FitAddon.FitAddon();
        term.loadAddon(fitAddon);

        term.open(document.getElementById("terminal"));
        fitAddon.fit();

        function showPrompt() {
                term.write(`${name}@musium:~$ `); //the thing with username and stuff
        }

        term.writeln("run help to get commands");
        showPrompt();

        const commands = {
                help: "Available commands:\r\n help - get help\r\n date - get time and date\r\n clear - clear the screen\r\n setname <name> - change name",

                date: () => new Date().toString(),
                clear: () => {
                        term.clear();
                        return "";
                },
        };

        let currentInput = "";

        term.onKey((e) => {
                const char = e.key;

                if (char === "\r") {
                        term.write("\r\n");

                        const input = currentInput.trim();
                        const args = input.split(" ");
                        const command = args[0];

                        if (command === "setname") {
                                if (args[1]) {
                                        name = args[1].replace(/\s+/g, "");
                                        localStorage.setItem(
                                                "musium-name",
                                                name,
                                        );
                                        term.writeln(`Username set to ${name}`);
                                } else {
                                        term.writeln("Usage: setname <name>");
                                }
                        } else if (commands[command]) {
                                // run valid commands
                                const out =
                                        typeof commands[command] === "function"
                                                ? commands[command]()
                                                : commands[command];

                                if (out) term.writeln(out);
                        } else if (input.length > 0) {
                                term.writeln(
                                        `zsh: command not found: ${input}`,
                                );
                                error.currentTime = 0;
                                error.play().catch((e) => {});
                        }

                        currentInput = "";
                        showPrompt();
                } else if (char === "\u007F") {
                        if (currentInput.length > 0) {
                                currentInput = currentInput.slice(0, -1);
                                term.write("\b \b");
                        }
                } else {
                        currentInput += char;
                        term.write(char);
                }
        });

        window.addEventListener("resize", () => fitAddon.fit());
});
