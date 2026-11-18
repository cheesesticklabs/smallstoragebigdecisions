(() => {
  const oz = document.getElementById('oz-mascot');
  if (!oz) return;
  const clips = ['assets/oz-bark1.wav', 'assets/oz-bark4.wav', 'assets/oz-bark6.wav'];
  let clicks = 0;
  let playing;
  oz.addEventListener('click', () => {
    if (clicks >= 9) return;
    clicks += 1;
    oz.dataset.ozClicks = String(clicks);
    if (clicks % 3 !== 0) return;
    if (playing) {
      playing.pause();
      playing.currentTime = 0;
    }
    playing = new Audio(new URL(clips[clicks / 3 - 1], document.baseURI).href);
    playing.play().catch(() => {});
    if (clicks === 9) oz.dataset.ozFinished = 'true';
  });
})();
