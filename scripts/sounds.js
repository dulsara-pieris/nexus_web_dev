//got sound of retro mouse click on a link tags
document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function (e) {
                //keep normal behavior for new tabs, modified/middle clicks and downloads
                if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                if (link.target && link.target !== "_self") return;
                if (link.hasAttribute("download")) return;

                const href = link.getAttribute("href");
                if (!href || href.startsWith("#")) return;

                const url = new URL(href, window.location.href);
                if (url.origin !== window.location.origin) return; //external, mailto, tel

                e.preventDefault();

                const sound = new Audio("assests/sounds/click.mp3");
                sound.play().catch(() => {});
                setTimeout(() => {
                        window.location.href = url.href;
                }, 350);//delay so the click sound can play before leaving
        });
});
