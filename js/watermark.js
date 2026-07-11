// Applies a repeating diagonal tiled watermark to a clean template image,
// entirely client-side. Upload clean, un-watermarked template files to
// /assets/templates/ — the watermark is always drawn on top at render time,
// so there is no risk of accidentally publishing an unwatermarked file.

const WATERMARK_TEXT = 'COLLAGED PRINTS SAMPLE';

function drawWatermarkedImage(canvas, imageSrc, callback) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function () {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0);
    applyDiagonalTile(ctx, canvas.width, canvas.height);

    if (callback) callback();
  };
  img.onerror = function () {
    console.error('Could not load template image:', imageSrc);
  };
  img.src = imageSrc;
}

// For products that aren't a premade design being protected (e.g. the
// "100% Custom" explainer card) — draws the image plain, no watermark.
function drawPlainImage(canvas, imageSrc, callback) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function () {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    if (callback) callback();
  };
  img.onerror = function () {
    console.error('Could not load image:', imageSrc);
  };
  img.src = imageSrc;
}

function applyDiagonalTile(ctx, width, height) {
  ctx.save();

  // Small, dense, embossed-looking watermark: a fine grid of small text,
  // each drawn with a light highlight offset above a darker shadow offset
  // (like a subtle emboss/stamp), tiled tightly across the whole image.
  const fontSize = Math.max(9, Math.round(width * 0.016));
  ctx.font = `600 ${fontSize}px Arial, sans-serif`;
  ctx.textBaseline = 'middle';

  ctx.translate(width / 2, height / 2);
  ctx.rotate(-Math.PI / 8); // gentle diagonal, less aggressive than before

  const textWidth = ctx.measureText(WATERMARK_TEXT).width;
  const stepX = textWidth + fontSize * 1.1;
  const stepY = fontSize * 1.9;

  const span = Math.sqrt(width * width + height * height);

  for (let y = -span; y < span; y += stepY) {
    for (let x = -span; x < span; x += stepX) {
      // Emboss effect: dark shadow offset down-right, light highlight offset up-left
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillText(WATERMARK_TEXT, x + 0.6, y + 0.6);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillText(WATERMARK_TEXT, x - 0.6, y - 0.6);
      ctx.fillStyle = 'rgba(120, 120, 120, 0.11)';
      ctx.fillText(WATERMARK_TEXT, x, y);
    }
  }

  ctx.restore();
}
