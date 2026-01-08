/* ================= Audio Handling ================= */
document.addEventListener('click', function playMusicOnce() {
    const audio = document.getElementById('youare-audio');
    const micon = document.getElementById('youare-micon');

    if (!audio || !micon) return;

    if (audio.paused) {
        audio.play();
        micon.src = "images/speaker.png";
    } else {
        audio.pause();
        audio.currentTime = 0;
        micon.src = "images/speakerm.png";
    }

    document.removeEventListener('click', playMusicOnce);
}, { once: true });

const faudio = new Audio('media/youare.mp3');
faudio.addEventListener('timeupdate', function () {
    if (this.currentTime > this.duration - 0.45) {
        this.currentTime = 0;
        this.play();
    }
});

/* ================= Bookmark (IE) ================= */
function bookmark() {
    if (navigator.appName === "Microsoft Internet Explorer" && parseInt(navigator.appVersion) >= 4) {
        window.external.AddFavorite("lol.html", "‎‎Idiot!");
    }
}

/* ================= Popup Tracking ================= */
const openWindows = [];
let orbitMode = false;
let mouseX = 0;
let mouseY = 0;
let orbitAngle = 0;

/* Track mouse position */
document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

/* ========= 3D DEPTH ORBIT MODE ========= */
function orbitLoop() {
    if (!orbitMode) return;

    orbitAngle += 0.05;

    const baseRadius = 200;
    const depthRange = 120; 
    const maxScale = 1.4;
    const minScale = 0.6;

    openWindows.forEach((w, i) => {
        if (!w || w.closed) return;

        const localAngle = orbitAngle + (i * (Math.PI * 2 / openWindows.length));

        // Depth factor
        const depth = Math.sin(localAngle);

        // Speed based on depth
        const speedBoost = 1 + depth * 0.25;
        const effectiveAngle = orbitAngle * speedBoost + i;

        // Radius changes with depth
        const radius = baseRadius + depth * depthRange;

        const x = mouseX + Math.cos(effectiveAngle) * radius;
        const y = mouseY + Math.sin(effectiveAngle) * radius;

        try {
            w.moveTo(x, y);
        } catch (e) {}

        // Visual scaling + opacity
        const scale = minScale + ((depth + 1) / 2) * (maxScale - minScale);
        const opacity = 0.4 + ((depth + 1) / 2) * 0.6;

        try {
            w.document.body.style.transformOrigin = "center center";
            w.document.body.style.transform = `scale(${scale})`;
            w.document.body.style.opacity = opacity;
        } catch (e) {}
    });

    requestAnimationFrame(orbitLoop);
}

/* ================= Window Controls ================= */
function openWindow(url) {
    const width = 357;
    const height = 330;
    const left = Math.floor((screen.width - width) / 2);
    const top = Math.floor((screen.height - height) / 2);

    const features = `menubar=no,status=no,toolbar=no,resizable=no,
        width=${width},height=${height},left=${left},top=${top},
        noopener,noreferrer`;

    const aWindow = window.open(url, "_blank", features);

    if (aWindow) {
        openWindows.push(aWindow);

        const timer = setInterval(() => {
            for (let i = openWindows.length - 1; i >= 0; i--) {
                if (openWindows[i].closed) openWindows.splice(i, 1);
            }

            if (aWindow.closed) {
                clearInterval(timer);
                const countToOpen = Math.max(1, openWindows.length);
                for (let i = 0; i < countToOpen; i++) {
                    openWindow('lol.html');
                }
            }
        }, 500);
    }
}

function proCreate() {
    for (let i = 0; i < 5; i++) {
        openWindow('lol.html');
    }
}

function closeAllPopups() {
    openWindows.forEach(w => {
        try { w.close(); } catch (e) {}
    });
    openWindows.length = 0;
}

/* ================= Window Movement ================= */
let xOff = 5, yOff = 5;
let xPos = 400, yPos = -100;
let flagRun = 1;

function newXlt() { xOff = Math.ceil(-6 * Math.random()) * 5 - 10; window.focus(); }
function newXrt() { xOff = Math.ceil(7 * Math.random()) * 5 - 10; window.focus(); }
function newYup() { yOff = Math.ceil(-6 * Math.random()) * 5 - 10; window.focus(); }
function newYdn() { yOff = Math.ceil(7 * Math.random()) * 5 - 10; window.focus(); }

function fOff() { flagRun = 0; }

function playBall() {
    if (orbitMode) return; // disable bounce during 3D orbit

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

/* ================= Keyboard Shortcuts ================= */
document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "o") {
        orbitMode = !orbitMode;

        if (orbitMode) {
            orbitLoop();
        } else {
            // Restore styles when leaving orbit mode
            openWindows.forEach(w => {
                try {
                    w.document.body.style.transform = "scale(1)";
                    w.document.body.style.opacity = "1";
                } catch (e) {}
            });
            playBall();
        }
    }

    if (e.key.toLowerCase() === "f") {
        closeAllPopups();
    }
});

/* ================= Window Events ================= */
window.onload = function () {
    flagRun = 1;
    playBall();
    bookmark();
};

window.onmouseout = function () {
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

window.onbeforeunload = function () {
    return " ";
};
