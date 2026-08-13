// Template catalog. To add a real design: drop a clean (unwatermarked)
// image into /assets/templates/ and add an entry here.
// price defaults to $15 if omitted. noWatermark skips the sample watermark
// (for non-design offer cards). skipCustomizationFee means the price already
// covers customization, so the flat $10 fee doesn't stack on top.
const TEMPLATES = [
  { id: 'tpl-38', name: 'Coldby', src: 'assets/templates/tpl-coldby.jpg' },
  { id: 'tpl-33', name: 'AXO 99&cent;', src: 'assets/templates/tpl-bucknell-axo.jpg' },
  { id: 'tpl-34', name: 'Bucknell-opoly', src: 'assets/templates/tpl-bucknell-opoly.jpg' },
  { id: 'tpl-35', name: 'Lewisburg Matchbook', src: 'assets/templates/tpl-bucknell-matches.jpg' },
  { id: 'tpl-36', name: 'In the Middle of Nowhere', src: 'assets/templates/tpl-bucknell-nowhere.jpg' },
  { id: 'tpl-37', name: 'Watch This, Classic', src: 'assets/templates/tpl-bucknell-classic-collage.jpg' },
  { id: 'tpl-27', name: 'Happy to Be', src: 'assets/templates/tpl-happy-to-be.jpg' },
  { id: 'tpl-28', name: 'Colgate Cowboy', src: 'assets/templates/tpl-colgate-cowboy.jpg' },
  { id: 'tpl-29', name: 'Go Gate Water Ski', src: 'assets/templates/tpl-gate-water-ski.jpg' },
  { id: 'tpl-30', name: 'Go Bison Water Ski', src: 'assets/templates/tpl-bison-water-ski.jpg' },
  { id: 'tpl-31', name: 'Greatest Kept Secret', src: 'assets/templates/tpl-bucknell-magazine.jpg' },
  { id: 'tpl-32', name: "It'll Always Be Go Gate", src: 'assets/templates/tpl-gate-surf.jpg' },
  { id: 'tpl-20', name: 'Button Board', src: 'assets/templates/tpl-vintage-button-board.jpg' },
  { id: 'tpl-21', name: 'Wolf of Broad Street', src: 'assets/templates/tpl-wolf-of-broad-street.jpg' },
  { id: 'tpl-22', name: 'The Reveal', src: 'assets/templates/tpl-the-reveal.jpg' },
  { id: 'tpl-23', name: 'All About That Gate', src: 'assets/templates/tpl-all-about-that-gate.jpg' },
  { id: 'tpl-26', name: 'No Place Like This', src: 'assets/templates/tpl-colgate-magazine.jpg' },
  { id: 'tpl-01', name: 'I Left My Heart in Hamilton', src: 'assets/templates/tpl-heart-hamilton-postcard-front.jpg' },
  { id: 'tpl-02', name: 'With Love From Hamilton', src: 'assets/templates/tpl-love-from-hamilton-postcard-back.jpg' },
  { id: 'tpl-03', name: 'Coldgate', src: 'assets/templates/tpl-coldgate-ski-goggles.jpg' },
  { id: 'tpl-04', name: 'I [heart] Colgate', src: 'assets/templates/tpl-i-colgate-things-people.png' },
  { id: 'tpl-05', name: 'Lucky', src: 'assets/templates/tpl-lucky-13-red.jpg' },
  { id: 'tpl-06', name: 'OG Colgate Matchbook', src: 'assets/templates/tpl-matchbooks-bars-shops.jpg' },
  { id: 'tpl-07', name: 'Middle of No Where', src: 'assets/templates/tpl-new-york-hamilton-cocktails.jpg' },
  { id: 'tpl-08', name: 'Clinton, New York', src: 'assets/templates/tpl-clinton-new-york-letters.jpg' },
  { id: 'tpl-09', name: 'Pink Matchbook', src: 'assets/templates/tpl-hamilton-eatery-matchbooks.jpg' },
  { id: 'tpl-10', name: 'Good Morning', src: 'assets/templates/tpl-good-morning-colgate.jpg' },
  { id: 'tpl-11', name: 'Hamilton Matchbook', src: 'assets/templates/tpl-matchbooks-deli-pub.jpg' },
  { id: 'tpl-12', name: 'I Love Tri Delt', src: 'assets/templates/tpl-i-love-tri-delt.png' },
  { id: 'tpl-13', name: 'Hamilton (Bold Blue)', src: 'assets/templates/tpl-hamilton-blue-bold.jpg' },
  { id: 'tpl-14', name: 'Vintage Collage: Good Luck', src: 'assets/templates/tpl-vintage-collage-luck.jpg' },
  { id: 'tpl-15', name: 'Go Gate', src: 'assets/templates/tpl-go-gate-bear.jpg' },
  { id: 'tpl-16', name: 'Hamilton, New York', src: 'assets/templates/tpl-new-york-bubble-letters.jpg' },
  { id: 'tpl-17', name: 'With Love, From Villanova', src: 'assets/templates/tpl-with-love-from-villanova.jpg' },
  { id: 'tpl-18', name: 'Matchbooks!', src: 'assets/templates/tpl-hamilton-matchbooks-collage.jpg' },
  { id: 'tpl-19', name: 'Somewhere', src: 'assets/templates/tpl-hamilton-somewhere.jpg' },
  { id: 'tpl-24', name: 'Colgate Crew', src: 'assets/templates/tpl-colgate-crew.jpg' },
  { id: 'tpl-25', name: 'Colgate Swim', src: 'assets/templates/tpl-colgate-swim.jpg' },
  {
    id: 'tpl-custom',
    name: '100% Custom',
    src: 'assets/templates/tpl-100-custom.jpg',
    price: 25,
    noWatermark: true,
    skipCustomizationFee: true,
    placeholder: 'tell me what you are looking for!',
    questionLabel: 'Describe your vision / vibe:',
    hideHint: true,
  },
];

// A different kind of product from the standard 12x16 template prints:
// one surprise set, not a specific design being customized. Rendered in
// its own section below the main grid (see #specialtyGrid in shop.html).
const SPECIALTY_PRODUCTS = [
  {
    id: 'mini-4pack',
    name: 'Mini Print Surprise Pack',
    src: 'assets/templates/tpl-mini-prints-sampler.jpg',
    price: 30,
    priceLabel: '$30 &middot; set of 4 mini prints',
    eyebrow: 'Mini Prints',
    questionLabel: "Seen a mini print design on my Instagram you'd love in the mix? Tell me here (no promises — it's a surprise!):",
    placeholder: 'e.g. the "pour decisions" one, the Colgate bear...',
    hint: "You'll get 4 surprise mini prints picked by me — no repeats. Suggestions aren't guaranteed, but I'll try to work your favorites in.",
    skipCustomizationFee: true,
  },
];

const ALL_PRODUCTS = [...TEMPLATES, ...SPECIALTY_PRODUCTS];

const DEFAULT_PLACEHOLDER = "e.g. change the school to Collaged University, make the background pink...";
const DEFAULT_QUESTION_LABEL = "What would you like changed?";
const DEFAULT_EYEBROW = "Print";

const grid = document.getElementById('templateGrid');
const specialtyGrid = document.getElementById('specialtyGrid');

function renderCard(tpl, container) {
  const card = document.createElement('article');
  card.className = 'tpl-card';
  card.id = tpl.id;
  const price = tpl.price || 15;
  const priceLabel = tpl.priceLabel || `$${price} base`;
  card.innerHTML = `
    <div class="tpl-thumb">
      <canvas data-src="${tpl.src}"></canvas>
    </div>
    <div class="tpl-info">
      <h3>${tpl.name}</h3>
      <p class="tpl-price">${priceLabel}</p>
      <button class="btn btn-outline tpl-add" data-id="${tpl.id}">Customize / Add</button>
    </div>
  `;
  container.appendChild(card);

  const canvas = card.querySelector('canvas');
  if (tpl.noWatermark) {
    drawPlainImage(canvas, tpl.src);
  } else {
    drawWatermarkedImage(canvas, tpl.src);
  }
}

TEMPLATES.forEach((tpl) => renderCard(tpl, grid));
SPECIALTY_PRODUCTS.forEach((tpl) => renderCard(tpl, specialtyGrid));

// ---------- Modal ----------
const backdrop = document.getElementById('modalBackdrop');
const modalCanvas = document.getElementById('modalCanvas');
const modalEyebrow = document.getElementById('modalEyebrow');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalAsIsWrapper = document.getElementById('modalAsIsWrapper');
const modalCustomization = document.getElementById('modalCustomization');
const modalQuestionLabel = document.getElementById('modalQuestionLabel');
const modalHint = document.getElementById('modalHint');
const modalAsIs = document.getElementById('modalAsIs');
const modalAddBtn = document.getElementById('modalAddBtn');
const modalClose = document.getElementById('modalClose');

const DEFAULT_HINT = modalHint.textContent;

let activeTemplate = null;

document.body.addEventListener('click', (e) => {
  const btn = e.target.closest('.tpl-add');
  if (!btn) return;
  const tpl = ALL_PRODUCTS.find(t => t.id === btn.dataset.id);
  openModal(tpl);
});

function openModal(tpl) {
  activeTemplate = tpl;
  modalEyebrow.textContent = tpl.eyebrow || DEFAULT_EYEBROW;
  modalTitle.textContent = tpl.name;
  modalCustomization.value = '';
  modalCustomization.placeholder = tpl.placeholder || DEFAULT_PLACEHOLDER;
  modalQuestionLabel.textContent = tpl.questionLabel || DEFAULT_QUESTION_LABEL;
  modalHint.textContent = tpl.hint || DEFAULT_HINT;
  modalHint.style.display = tpl.hideHint ? 'none' : '';
  modalAsIs.checked = false;
  modalCustomization.disabled = false;

  const price = tpl.price || 15;
  modalPrice.innerHTML = tpl.priceLabel
    ? tpl.priceLabel
    : tpl.skipCustomizationFee
      ? `$${price} base`
      : `$${price} base &middot; +$10 to customize`;

  // The "as is" option doesn't make sense for a fully custom order —
  // there's no default design to leave unchanged.
  modalAsIsWrapper.style.display = tpl.skipCustomizationFee ? 'none' : '';

  if (tpl.noWatermark) {
    drawPlainImage(modalCanvas, tpl.src);
  } else {
    drawWatermarkedImage(modalCanvas, tpl.src);
  }

  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
  modalCustomization.focus();
}

modalAsIs.addEventListener('change', () => {
  modalCustomization.disabled = modalAsIs.checked;
  if (modalAsIs.checked) modalCustomization.value = '';
});

function closeModal() {
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
  activeTemplate = null;
}

modalClose.addEventListener('click', closeModal);
backdrop.addEventListener('click', (e) => {
  if (e.target === backdrop) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && backdrop.classList.contains('open')) closeModal();
});

modalAddBtn.addEventListener('click', () => {
  if (!activeTemplate) return;
  Cart.add({
    templateId: activeTemplate.id,
    templateName: activeTemplate.name,
    thumbnail: activeTemplate.src,
    customization: modalCustomization.value.trim(),
    asIs: modalAsIs.checked,
    price: activeTemplate.price || 15,
    skipCustomizationFee: !!activeTemplate.skipCustomizationFee,
  });
  modalAddBtn.textContent = 'Added \u2713';
  setTimeout(() => {
    modalAddBtn.textContent = 'Add to cart';
    closeModal();
  }, 550);
});

// If arriving via a link like shop.html#tpl-custom, open that product's
// modal directly instead of just scrolling to its card.
const linkedId = window.location.hash.replace('#', '');
if (linkedId) {
  const linkedTpl = ALL_PRODUCTS.find(t => t.id === linkedId);
  if (linkedTpl) openModal(linkedTpl);
}
