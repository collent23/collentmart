let cart = [];

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  saveCart();
  alert("✅ Ditambahkan ke keranjang!");
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const saved = localStorage.getItem("cart");
  cart = saved ? JSON.parse(saved) : [];
}

function showCart() {
  loadCart();
  const modal = document.getElementById("cart-modal");
  const list = document.getElementById("cart-items");
  list.innerHTML = "";

  if (cart.length === 0) {
    list.innerHTML = "<li>Keranjang kosong</li>";
  } else {
    cart.forEach((p, i) => {
      const item = document.createElement("li");
      item.innerText = `${p.name} - Rp ${p.price.toLocaleString()}`;
      list.appendChild(item);
    });
  }

  modal.classList.remove("hidden");
}

function closeCart() {
  document.getElementById("cart-modal").classList.add("hidden");
}

function checkout() {
  const adminWA = "6283891827793";
  const pesan = cart.map(p => `- ${p.name} (Rp ${p.price.toLocaleString()})`).join("%0A");
  const url = `https://wa.me/${adminWA}?text=Halo kak, saya mau pesan:%0A${pesan}`;
  window.open(url, "_blank");
}
