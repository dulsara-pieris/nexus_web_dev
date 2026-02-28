// OS detection for print at the boot screen just bit fancy thing
function getOS() {
        const platform = navigator.platform.toLowerCase();
        const userAgent = navigator.userAgent.toLowerCase();


        if (platform.includes("linux")) return "linux";
        if (/android/.test(userAgent)) return "android";
        
         if (/iphone|ipad|ipod/.test(userAgent)) return "ios";

        if (platform.includes("mac")) return "macos";
        if (platform.includes("win")) return "windows";

        return "unknown";
}
