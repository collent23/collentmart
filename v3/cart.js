let cart = [];

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  alert(`${name} ditambahkan ke keranjang!`);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (cart.length === 0) {
    cartItems.innerHTML = "Belum ada produk.";
    cartTotal.textContent = "";
    return;
  }

  cartItems.innerHTML = cart.map(item =>
    `<div>• ${item.name} (${item.qty}) - Rp${(item.price * item.qty).toLocaleString()}</div>`
  ).join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotal.textContent = `Total: Rp${total.toLocaleString()}`;
}

function pesanViaWA() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let pesan = "Halo Admin, saya mau pesan:%0A";
  let total = 0;

  cart.forEach(item => {
    pesan += `- ${item.name} (${item.qty})%0A`;
    total += item.price * item.qty;
  });

  pesan += `%0A🧾 Total: Rp${total.toLocaleString()}%0A`;
  pesan += `%0ADikirim dari CollentMart`;

  const no = "6283891827793"; // <- Ganti kalau perlu
  window.location.href = `https://wa.me/${no}?text=${encodeURIComponent(pesan)}`;
}
