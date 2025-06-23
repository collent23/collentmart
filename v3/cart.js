let cart = [];

function updateCart() {
  const countElem = document.getElementById("cart-count");
  if (countElem) {
    const totalItem = cart.reduce((sum, item) => sum + item.qty, 0);
    countElem.textContent = totalItem;
  }

  renderCart();
}

function updateCartDisplay() {
  const cartList = document.getElementById("cart-list");
  const totalHarga = document.getElementById("total-harga");
  cartList.innerHTML = "";

  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - Rp${item.price.toLocaleString()}`;
    cartList.appendChild(li);
    total += item.price;
  });

  totalHarga.textContent = `Total: Rp${total.toLocaleString()}`;
}

function pesanViaWA() {
  const nomor = "6283891827793";
  if (cart.length === 0) {
    alert("Keranjang masih kosong, pilih produk dulu ya!");
    return;
  }

  let pesan = "Halo Admin, saya mau pesan:\n";
  cart.forEach(item => {
    pesan += `- ${item.name} (1)\n`;
  });

  let total = cart.reduce((sum, item) => sum + item.price, 0);
  pesan += `\n🧾 Total: Rp${total.toLocaleString()}\n\nDikirim dari CollentMart`;

  const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
  window.location.href = url;
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
