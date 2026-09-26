const vid = document.getElementById("videoBounce");

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