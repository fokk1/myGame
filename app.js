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

window.addEventListener('keydown', function(key) {
  if (key.key === 'ArrowUp') {
    const currVertical = extractPos(player.style.top);
    player.style.top = `${currVertical - 50}px`;
  }
  else if (key.key === 'ArrowDown') {
    const currVertical = extractPos(player.style.top);
    player.style.top = `${currVertical + 50}px`;
  }

  else if (key.key === 'ArrowLeft') {
    const currHorizontal = extractPos(player.style.left);
    player.style.transform = 'scale(-1,1)';
    player.style.left = `${currHorizontal - 50}px`;
  }
  else if (key.key === 'ArrowRight') {
    const currHorizontal = extractPos(player.style.left);
    player.style.transform = 'scale(1,1)';
    player.style.left = `${currHorizontal + 50}px`;
  }

  if(isTouching(player, coin)) {
    coinPos();
    counter();
  };
});

const extractPos = (pos) => {
  if(!pos) return 10;
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
