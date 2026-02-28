const font = new FontFace(
        "alvera-bold",
        "url(../assests/fonts/alvera/AlveraDEMO-BoldCircle.ttf)"
);

// Check local storage for username
let name = localStorage.getItem("musium-name") || "guest";

// Sound effect for errors
const error = new Audio(
        "../assests/sounds/freesound_community-windows-error-sound-effect-35894.mp3"
);

// Load font
font.load().then((loadedFont) => {
        document.fonts.add(loadedFont);

        // Initialize terminal
        const term = new Terminal({
                fontFamily: '"alvera-bold", monospace',
                fontSize: 24,
                theme: {
                        background: "#00000000",
                        foreground: "#00ffcc",
                        cursor: "#ff4704",
                },
                cursorBlink: true,
        });

        // Fit addon to auto-resize
        const fitAddon = new FitAddon.FitAddon();
        term.loadAddon(fitAddon);

        term.open(document.getElementById("terminal"));
        fitAddon.fit();

        // Prompt function
        function showPrompt() {
                term.write(`${name}@musium:~$ `);
        }

        term.writeln("run help to get commands");
        showPrompt();

        // Commands
        const commands = {
                help: "\r\nAvailable commands:\r\n help - get help\r\n date - get time and date\r\n clear - clear the screen\r\n setname <name> - change name\r\n sendemail <subject> <message> - send email to admin\r\n clearname - delete saved username\r\n",
                date: () => new Date().toString(),
                clear: () => {
                        term.clear();
                        return "";
                },
                clearname: () => {
                        localStorage.removeItem("musium-name");
                        name = "guest";
                        return "Username deleted. Using guest.";
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
                                        localStorage.setItem("musium-name", name);
                                        term.writeln(`Username set to ${name}`);
                                } else {
                                        term.writeln("Usage: setname <name>");
                                }
                        } else if (command === "sendemail") {
                                const myEmail = "dulsara.synapsnex@gmail.com"; // your email
                                const subject = args[1] || "No subject";
                                const bodyMessage = args.slice(2).join(" ") || "No message";

                                // Include username in email
                                const fullBody = `From: ${name}\n\n${bodyMessage}`;

                                const mailtoLink = `mailto:${myEmail}?subject=${encodeURIComponent(
                                        subject
                                )}&body=${encodeURIComponent(fullBody)}`;

                                window.open(mailtoLink, "_blank");
                                term.writeln(`Opened email client to send to ${myEmail}`);
                        } else if (commands[command]) {
                                const out =
                                        typeof commands[command] === "function"
                                                ? commands[command]()
                                                : commands[command];

                                if (out) term.writeln(out);
                        } else if (input.length > 0) {
                                term.writeln(`zsh: command not found: ${input}`);
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