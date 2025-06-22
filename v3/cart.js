const cart = [];

function addToCart(name, price) {
  const item = cart.find(p => p.name === name);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerText = "Belum ada produk.";
    totalEl.innerText = "";
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const el = document.createElement("div");
    el.innerText = `${item.name} (${item.qty}) - Rp${(item.price * item.qty).toLocaleString()}`;
    container.appendChild(el);
    total += item.price * item.qty;
  });

  totalEl.innerText = `Total: Rp${total.toLocaleString()}`;
}

function pesanViaWA() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let pesan = "Halo Admin, saya mau pesan:\n";
  let total = 0;

  cart.forEach(item => {
    pesan += `- ${item.name} (${item.qty})\n`;
    total += item.price * item.qty;
  });

  pesan += `\n🧾 Total: Rp${total.toLocaleString()}\n\nDikirim dari CollentMart`;
  const nomor = "6283891827793";
  const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");
}
