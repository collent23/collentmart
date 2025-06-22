let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  alert(`${name} ditambahkan ke keranjang!`);
}

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let pesan = "Halo, saya ingin memesan:\n";
  let total = 0;

  cart.forEach(item => {
    pesan += `- ${item.name} (Rp${item.price.toLocaleString()})\n`;
    total += item.price;
  });

  pesan += `\nTotal: Rp${total.toLocaleString()}`;
  const waNumber = "6283891827793"; // Ganti sesuai WA lo
  const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");
}
