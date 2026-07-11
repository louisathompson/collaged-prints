// Draggable collage board — click/tap and drag any piece around freely.
// Positions reset on page refresh (purely a playful moodboard interaction,
// not persisted state).
(function () {
  const board = document.getElementById('board');
  if (!board) return;

  const pieces = Array.from(document.querySelectorAll('.drag-piece'));

  // On narrow phone screens, a few pieces' desktop-tuned left positions would
  // push them partly off-screen. Nudge their STARTING position inward here
  // (via inline style, same as dragging does) so nothing overflows on load —
  // this does not lock them in place, dragging still works normally after.
  if (window.innerWidth <= 480) {
    const phoneStartLeft = {
      'piece-dog': '52%',
      'piece-book': '40%',
      'piece-pennant-pink': '20%',
      'piece-yall': '38%',
      'piece-pennant-red': '30%',
    };
    pieces.forEach((piece) => {
      for (const cls in phoneStartLeft) {
        if (piece.classList.contains(cls)) {
          piece.style.left = phoneStartLeft[cls];
        }
      }
    });
  }

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

      // Keep within board bounds — tighter tolerance on narrow phone screens
      // so pieces can't be dragged off the edge of a small viewport.
      const isNarrow = window.innerWidth <= 480;
      const sideTolerance = isNarrow ? 6 : 40;
      const vertTolerance = isNarrow ? 6 : 20;
      const maxLeft = rect.width - piece.offsetWidth;
      const maxTop = rect.height - piece.offsetHeight;
      newLeft = Math.max(-sideTolerance, Math.min(maxLeft + sideTolerance, newLeft));
      newTop = Math.max(-vertTolerance, Math.min(maxTop + vertTolerance, newTop));

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
