const cartItemsEl = document.getElementById('cartItems');
const sumTemplateCount = document.getElementById('sumTemplateCount');
const sumCustomization = document.getElementById('sumCustomization');
const sumShipping = document.getElementById('sumShipping');
const sumTotal = document.getElementById('sumTotal');
const contactForm = document.getElementById('contactForm');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const formStatus = document.getElementById('formStatus');
const payOptions = document.getElementById('payOptions');
let selectedPaymentMethod = '';

payOptions.addEventListener('click', (e) => {
  const btn = e.target.closest('.pay-option');
  if (!btn) return;
  selectedPaymentMethod = btn.dataset.method;
  payOptions.querySelectorAll('.pay-option').forEach(el => el.classList.remove('selected'));
  btn.classList.add('selected');
  formStatus.textContent = '';
});

function renderCart() {
  const items = Cart.get();

  if (items.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty.</p>
        <a href="shop.html" class="btn btn-outline">Print Shop</a>
      </div>`;
  } else {
    cartItemsEl.innerHTML = items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.thumbnail}" alt="" class="cart-item-thumb">
        <div class="cart-item-body">
          <h3>${item.templateName}</h3>
          <p class="cart-item-price">$${item.price || 15} base</p>
          ${item.skipCustomizationFee ? '' : `
          <label class="as-is-check">
            <input type="checkbox" class="cart-item-asis" ${item.asIs ? 'checked' : ''}>
            <span>As is, no changes &mdash; skip the customization fee</span>
          </label>`}
          <label class="cart-item-label">Requested changes</label>
          <textarea class="cart-item-note" rows="3" placeholder="Describe what you'd like changed..." ${item.asIs ? 'disabled' : ''}>${item.customization}</textarea>
        </div>
        <button class="cart-item-remove" aria-label="Remove item">&times;</button>
      </div>
    `).join('');
  }

  updateSummary(items);
}

function updateSummary(items) {
  const templateCount = items.length;
  const templatesTotal = items.reduce((sum, i) => sum + (i.price || 15), 0);
  const customizedCount = items.filter(i => !i.asIs && !i.skipCustomizationFee && (i.customization || '').trim().length > 0).length;
  const shipping = templateCount ? 7 : 0;
  const total = Cart.baseEstimate(items);

  sumTemplateCount.textContent = `${templateCount} item${templateCount === 1 ? '' : 's'} · $${templatesTotal}`;
  sumCustomization.textContent = customizedCount ? `${customizedCount} item${customizedCount === 1 ? '' : 's'} · $${customizedCount * 10}` : '—';
  sumShipping.textContent = `$${shipping}`;
  sumTotal.textContent = `$${total}`;

  placeOrderBtn.disabled = templateCount === 0;
}

cartItemsEl.addEventListener('click', (e) => {
  const removeBtn = e.target.closest('.cart-item-remove');
  if (!removeBtn) return;
  const id = removeBtn.closest('.cart-item').dataset.id;
  Cart.remove(id);
  renderCart();
});

cartItemsEl.addEventListener('input', (e) => {
  if (!e.target.classList.contains('cart-item-note')) return;
  const id = e.target.closest('.cart-item').dataset.id;
  Cart.updateCustomization(id, e.target.value);
  updateSummary(Cart.get());
});

cartItemsEl.addEventListener('change', (e) => {
  if (!e.target.classList.contains('cart-item-asis')) return;
  const id = e.target.closest('.cart-item').dataset.id;
  Cart.updateAsIs(id, e.target.checked);
  renderCart();
});

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const items = Cart.get();
  if (items.length === 0) return;

  if (!selectedPaymentMethod) {
    formStatus.textContent = 'Please choose a payment method (Venmo, CashApp, or Zelle) before submitting.';
    return;
  }

  const payload = {
    name: document.getElementById('custName').value.trim(),
    email: document.getElementById('custEmail').value.trim(),
    phone: document.getElementById('custPhone').value.trim(),
    paymentMethod: selectedPaymentMethod,
    items: items.map(i => ({
      template: i.templateName,
      customization: i.customization || '(no changes requested)',
    })),
    estimatedBase: Cart.baseEstimate(items),
  };

  placeOrderBtn.disabled = true;
  placeOrderBtn.textContent = 'Sending…';
  formStatus.textContent = '';

  try {
    const res = await fetch('/api/send-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Request failed');

    Cart.clear();
    window.location.href = 'thank-you.html';
  } catch (err) {
    console.error(err);
    formStatus.textContent = "Something went wrong sending your request — please try again, or reach out to me directly.";
    placeOrderBtn.disabled = false;
    placeOrderBtn.textContent = 'Place order request';
  }
});

renderCart();
