function isTouching(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return !(
        aRect.top + aRect.height < bRect.top ||
        aRect.top > bRect.top + bRect.height ||
        aRect.left + aRect.width < bRect.left ||
        aRect.left > bRect.left + bRect.width
    );
}

const player = document.querySelector('#player');
const coin = document.querySelector('#coin');
const score = document.querySelector('.score');
const boxElem = document.querySelector('#box');

//mouse watching

window.onload = () => {
    function onMouseMove(event) {
        const mouseX = event.pageX;
        const mouseY = event.pageY;
        const crd = boxElem.getBoundingClientRect();
        const activePointer = crd.left <= mouseX && mouseX <= crd.right - 150 && crd.top <= mouseY && mouseY <= crd.bottom - 150;
        requestAnimationFrame(function movePointer() {
            if (activePointer) {
                player.classList.remove('hidden');
                player.style.left = Math.floor(mouseX) + 'px';
                player.style.top = Math.floor(mouseY) + 'px';
            } else {
                player.classList.add('hidden');
            }
            if (isTouching(player, coin)) {
                coinPos();
                counter();
            };
        });
    }

    function disablePointer() {
        requestAnimationFrame(function hidePointer() {
            player.classList.add('hidden');
        });
    }

    boxElem.addEventListener('mousemove', onMouseMove, false);
    boxElem.addEventListener('mouseleave', disablePointer, false);

    const extractPos = (pos) => {
        if (!pos) return 10;
        return parseInt(pos.slice(0, -2));
    }

    const coinPos = () => {
        const width = Math.floor(Math.random() * (window.innerWidth - 100));
        const height = Math.floor(Math.random() * (window.innerHeight - 100));
        coin.style.top = `${height}px`;
        coin.style.left = `${width}px`;
    }

    function counter() {
        let num = parseInt(score.textContent);
        num += 1;
        score.textContent = num;
    }

    coinPos();
}
