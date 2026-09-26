const VIDEO_LIST = [
    "../Videos/PolyNormal.mp4",
    "../Videos/PolyLowRes.mp4",
    "../Videos/PolyScout.mp4",
    "../Videos/PolyBaldi.mp4",
    "../Videos/PolyBackrooms.mp4",
    "../Videos/PolyIronMan.mp4"
];

function randInt(low, high) {
    return low + Math.floor((Math.random() * (high - low)));
}

const vid = document.getElementById("videoBounce");
vid.src = VIDEO_LIST[randInt(0, VIDEO_LIST.length)];

            let x = Math.random() * (window.innerWidth - 300);
            let y = Math.random() * (window.innerHeight - 150);
            let xSpeed = 3;
            let ySpeed = 3;

            function moveVideo() {
                const vidWidth = vid.offsetWidth;
                const vidHeight = vid.offsetHeight;

                x += xSpeed;
                y += ySpeed;

                if (x + vidWidth > window.innerWidth || x <= 0) {
                    xSpeed *= -1;
                }
                if (y + vidHeight > window.innerHeight || y <= 0) {
                    ySpeed *= -1;
                }

                vid.style.left = x + "px";
                vid.style.top = y + "px";

                
                requestAnimationFrame(moveVideo);
                
            }

            vid.addEventListener("loadedmetadata", () => {
                moveVideo();
            });