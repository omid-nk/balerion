const CART_KEY = "balerion-cart";
const CART_CHANGE_EVENT = "balerion-cart-change";

const normalizeCartId = (id) => String(id);

function notifyCartChange() {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
}

export function subscribeToCartChanges(callback) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", callback);
  window.addEventListener(CART_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CART_CHANGE_EVENT, callback);
  };
}

export function getCart() {
  if (typeof window === "undefined") return [];

  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

    return Array.isArray(cart) ? cart.map(normalizeCartId) : [];
  } catch {
    return [];
  }
}

export function addToCart(courseId) {
  const normalizedCourseId = normalizeCartId(courseId);
  const cart = getCart();

  if (!cart.includes(normalizedCourseId)) {
    cart.push(normalizedCourseId);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    notifyCartChange();
  }

  return cart;
}

export function removeFromCart(courseId) {
  const normalizedCourseId = normalizeCartId(courseId);
  const cart = getCart().filter((id) => id !== normalizedCourseId);

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  notifyCartChange();

  return cart;
}

export function isInCart(courseId) {
  return getCart().includes(normalizeCartId(courseId));
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  notifyCartChange();
}
