fetch("https://api.jsonbin.io/v3/b/685ae0118a456b7966b4eef3/latest", {
  headers: {
    "X-Master-Key": "$2a$10$gJ2hsyhsXcL9CFSSvCU2O.n8jzk1NdscM1GXhJ4I8aeoJz8iuTzyq"
  }
})
.then(res => res.json())
.then(data => {
  const produk = data.record;
  const container = document.getElementById("produk-container");
  produk.forEach(item => {
    container.innerHTML += `
      <div class="produk">
        <img src="${item.gambar}" alt="${item.nama}" style="width:100%; max-height:180px; object-fit:cover;" />
        <h3>${item.nama}</h3>
        <p>Harga: Rp ${item.harga.toLocaleString()}</p>
        <p>Stok: ${item.stok}</p>
      </div>
    `;
  });
});
