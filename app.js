// Minimal E-Commerce Logic for Exam
const PRODUCTS = [
  { id: "1", name: "Smartphone", price: 18999, oldPrice: 24999, icon: "📱" },
  { id: "2", name: "Earbuds", price: 2499, oldPrice: 4999, icon: "🎧" },
  { id: "3", name: "Shoes", price: 1599, oldPrice: 3499, icon: "👟" },
  { id: "4", name: "Shirt", price: 899, oldPrice: 1999, icon: "👔" }
];

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

const get = id => document.getElementById(id);
const money = val => "₹" + val;

function saveAndRender() {
  localStorage.setItem("cart", JSON.stringify(cart));
  if (get("cartBadge")) get("cartBadge").innerText = cart.reduce((s, i) => s + i.qty, 0);
  renderCart();
}

function renderCatalogue() {
  if (!get("catalogueGrid")) return;
  get("catalogueGrid").innerHTML = PRODUCTS.map(p => `
    <div class="product-card">
      <span class="card-icon">${p.icon}</span>
      <h3>${p.name}</h3>
      <div>
        <span class="price-current">${money(p.price)}</span>
        <span class="price-old">${money(p.oldPrice)}</span>
      </div>
      <button class="btn-add-cart" onclick="addToCart('${p.id}')">Add to Cart</button>
    </div>
  `).join("");
}

window.addToCart = (id) => {
  const product = PRODUCTS.find(p => p.id === id);
  const item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else cart.push({ ...product, qty: 1 });
  saveAndRender();
};

window.updateQty = (id, change) => {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += change;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  }
  saveAndRender();
};

window.removeFromCart = (id) => {
  cart = cart.filter(i => i.id !== id);
  saveAndRender();
};

function renderCart() {
  if (!get("cartItemsList")) return;
  let total = 0;
  get("cartItemsList").innerHTML = cart.map(i => {
    total += i.price * i.qty;
    return `
      <div class="cart-item-row">
        <span>${i.icon} ${i.name} (x${i.qty})</span>
        <span>${money(i.price * i.qty)}</span>
        <div>
          <button onclick="updateQty('${i.id}', -1)">-</button>
          <button onclick="updateQty('${i.id}', 1)">+</button>
          <button class="btn-remove" onclick="removeFromCart('${i.id}')">Remove</button>
        </div>
      </div>
    `;
  }).join("");
  if (get("cartSummaryFinal")) get("cartSummaryFinal").innerText = money(total);
}

document.addEventListener("DOMContentLoaded", () => {
  renderCatalogue();
  saveAndRender();
});