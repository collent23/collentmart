let cart = [];

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.qty})`;
    list.appendChild(li);
    total += item.price * item.qty;
  });
  document.getElementById("total").textContent = `Total: Rp${total.toLocaleString()}`;
}

function pesanViaWA() {
  const nomor = "6283891827793";
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let pesan = "Halo Admin, saya mau pesan:%0A";
  cart.forEach(item => {
    pesan += `- ${item.name} (${item.qty})%0A`;
  });
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  pesan += `%0A🧾 Total: Rp${total.toLocaleString()}%0A%0ADikirim dari CollentMart`;

  window.location.href = `https://wa.me/${nomor}?text=${pesan}`;
}
