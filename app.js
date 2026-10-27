const products = [
  { id: 1, name: "Smartphone", price: 18999, image: "images/smartphone.png" },
  { id: 2, name: "Earbuds", price: 2499, image: "images/earbuds.jpg" },
  { id: 3, name: "Shoes", price: 1599, image: "images/running-shoes.jpg" },
  { id: 4, name: "Shirt", price: 899, image: "images/cotton-shirt.jpg" }
];
let cart = [];
function showProducts() {
  document.getElementById("catalogueGrid").innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.image}" class="card-icon">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}
function addCart(id) {
  let item = cart.find(p => p.id === id);
  if (item) item.qty++;
  else cart.push({ ...products.find(p => p.id === id), qty: 1 });
  showCart();
}
function showCart() {
  let total = 0;
  document.getElementById("cartItemsList").innerHTML = cart.map(p => {
    total += p.price * p.qty;
    return `
      <div class="cart-item-row">
        <img src="${p.image}" class="cart-image">
        ${p.name} - ₹${p.price * p.qty}
        <button onclick="changeQty(${p.id}, -1)">-</button>
        ${p.qty}
        <button onclick="changeQty(${p.id}, 1)">+</button>
        <button onclick="removeCart(${p.id})">Remove</button>
      </div>
    `;
  }).join("");
  document.getElementById("cartSummaryFinal").innerText = "₹" + total;
}
function changeQty(id, value) {
  let item = cart.find(p => p.id === id);
  item.qty += value;
  if (item.qty <= 0) removeCart(id);
  else showCart();
}
function removeCart(id) {
  cart = cart.filter(p => p.id !== id);
  showCart();
}
showProducts();
showCart();
