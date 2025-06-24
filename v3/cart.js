let cart = [];

// Tambah produk ke keranjang
function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

// Update tampilan keranjang
function updateCart() {
  const list = document.getElementById("cart-list");
  const total = document.getElementById("cart-total");
  list.innerHTML = "";

  let sum = 0;
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - Rp${item.price.toLocaleString()}`;
    list.appendChild(li);
    sum += item.price;
  });

  total.textContent = `Total: Rp${sum.toLocaleString()}`;
}

// Kirim via WhatsApp
function pesanViaWA() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let message = "*Pesanan CollentMart:*\n\n";
  cart.forEach((item, i) => {
    message += `${i + 1}. ${item.name} - Rp${item.price.toLocaleString()}\n`;
  });

  const total = cart.reduce((a, b) => a + b.price, 0);
  message += `\nTotal: Rp${total.toLocaleString()}`;

  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/6283891827793?text=${encoded}`;
  window.open(url, "_blank");
}
