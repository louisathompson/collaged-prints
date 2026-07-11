// Draggable collage board — click/tap and drag any piece around freely.
// Positions reset on page refresh (purely a playful moodboard interaction,
// not persisted state).
(function () {
  const board = document.getElementById('board');
  if (!board) return;

  const pieces = Array.from(document.querySelectorAll('.drag-piece'));

  pieces.forEach((piece) => {
    const rotate = piece.dataset.rotate || 0;
    piece.style.setProperty('--r', rotate + 'deg');

    let startX, startY, origLeft, origTop, dragging = false;

    const boardRect = () => board.getBoundingClientRect();

    function pointerDown(e) {
      dragging = true;
      piece.classList.add('dragging');
      const rect = boardRect();
      const pieceRect = piece.getBoundingClientRect();
      origLeft = pieceRect.left - rect.left;
      origTop = pieceRect.top - rect.top;
      startX = (e.touches ? e.touches[0].clientX : e.clientX);
      startY = (e.touches ? e.touches[0].clientY : e.clientY);

      // Bring to front
      pieces.forEach(p => p.style.zIndex = 10);
      piece.style.zIndex = 20;

      document.addEventListener('mousemove', pointerMove);
      document.addEventListener('mouseup', pointerUp);
      document.addEventListener('touchmove', pointerMove, { passive: false });
      document.addEventListener('touchend', pointerUp);
    }

    function pointerMove(e) {
      if (!dragging) return;
      e.preventDefault();
      const curX = (e.touches ? e.touches[0].clientX : e.clientX);
      const curY = (e.touches ? e.touches[0].clientY : e.clientY);
      const dx = curX - startX;
      const dy = curY - startY;

      const rect = boardRect();
      let newLeft = origLeft + dx;
      let newTop = origTop + dy;

      // Keep within board bounds loosely
      const maxLeft = rect.width - piece.offsetWidth;
      const maxTop = rect.height - piece.offsetHeight;
      newLeft = Math.max(-40, Math.min(maxLeft + 40, newLeft));
      newTop = Math.max(-20, Math.min(maxTop + 20, newTop));

      piece.style.left = newLeft + 'px';
      piece.style.top = newTop + 'px';
    }

    function pointerUp() {
      dragging = false;
      piece.classList.remove('dragging');
      document.removeEventListener('mousemove', pointerMove);
      document.removeEventListener('mouseup', pointerUp);
      document.removeEventListener('touchmove', pointerMove);
      document.removeEventListener('touchend', pointerUp);
    }

    piece.addEventListener('mousedown', pointerDown);
    piece.addEventListener('touchstart', pointerDown, { passive: true });
  });
})();
