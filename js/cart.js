// Shared cart logic — used by shop.html, cart.html, and the nav badge
// on every page. Cart lives in localStorage so it survives navigation
// between pages (this is a real deployed site, not a sandboxed preview,
// so localStorage is the right tool here).

const CART_KEY = 'collagedprints_cart_v1';
const TEMPLATE_PRICE = 15;
const CUSTOMIZATION_FEE = 10; // flat fee, per item, if any changes are requested
const SHIPPING = 7;

const Cart = {
  get() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Cart read error', e);
      return [];
    }
  },

  save(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    Cart.updateBadge();
  },

  add(item) {
    const items = Cart.get();
    items.push({
      id: 'item_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      templateId: item.templateId,
      templateName: item.templateName,
      thumbnail: item.thumbnail,
      customization: item.customization || '',
      asIs: !!item.asIs,
    });
    Cart.save(items);
  },

  remove(itemId) {
    const items = Cart.get().filter(i => i.id !== itemId);
    Cart.save(items);
  },

  updateCustomization(itemId, text) {
    const items = Cart.get().map(i => i.id === itemId ? { ...i, customization: text } : i);
    Cart.save(items);
  },

  updateAsIs(itemId, asIs) {
    const items = Cart.get().map(i => i.id === itemId ? { ...i, asIs } : i);
    Cart.save(items);
  },

  clear() {
    localStorage.removeItem(CART_KEY);
    Cart.updateBadge();
  },

  baseEstimate(items) {
    const templatesTotal = items.length * TEMPLATE_PRICE;
    const customizationTotal = items.filter(i => !i.asIs && (i.customization || '').trim().length > 0).length * CUSTOMIZATION_FEE;
    const shipping = items.length ? SHIPPING : 0;
    return templatesTotal + customizationTotal + shipping;
  },

  updateBadge() {
    const count = Cart.get().length;
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
    });
  }
};

document.addEventListener('DOMContentLoaded', Cart.updateBadge);
