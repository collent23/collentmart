let cart = [];

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  const countElem = document.getElementById("cart-count");
  if (countElem) {
    const totalItem = cart.reduce((sum, item) => sum + item.qty, 0);
    countElem.textContent = totalItem;
  }

  renderCart();
}

function renderCart() {
  const list = document.getElementById("cart-list");
  const totalElem = document.getElementById("cart-total");
  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `🛒 ${item.name} (${item.qty}) - Rp${(item.price * item.qty).toLocaleString()}`;
    list.appendChild(li);
    total += item.price * item.qty;
  });

  if (totalElem) {
    totalElem.textContent = `Total: Rp${total.toLocaleString()}`;
  }
}

function pesanViaWA() {
  const nomor = "6283891827793";
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let pesan = "Halo Admin, saya mau pesan:\n";
  let total = 0;

  cart.forEach(item => {
    pesan += `- ${item.name} (${item.qty})\n`;
    total += item.price * item.qty;
  });

  pesan += `\n🧾 Total: Rp${total.toLocaleString()}\n\nDikirim dari CollentMart`;
  const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
  window.location.href = url;
}
