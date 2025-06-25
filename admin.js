// admin.js

// Tampilkan daftar produk
function tampilkanProduk() {
  const container = document.getElementById("produk-container");
  container.innerHTML = "<p>Memuat produk...</p>";

  db.ref("produk").once("value", snapshot => {
    container.innerHTML = "";
    snapshot.forEach(child => {
      const p = child.val();
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.gambar}" alt="${p.nama}">
        <h3>${p.nama}</h3>
        <p>Rp${Number(p.harga).toLocaleString()}</p>
      `;
      container.appendChild(card);
    });
  });
}

// Upload produk baru
document.getElementById("uploadForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const harga = document.getElementById("harga").value.trim();
  const file = document.getElementById("gambar").files[0];

  if (!nama || !harga || !file) {
    alert("Lengkapi semua data!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function() {
    const gambarData = reader.result;

    const id = Date.now();
    db.ref("produk/" + id).set({
      nama: nama,
      harga: harga,
      gambar: gambarData
    }, error => {
      if (error) {
        document.getElementById("status").innerText = "❌ Gagal upload.";
      } else {
        document.getElementById("status").innerText = "✅ Produk berhasil ditambahkan.";
        tampilkanProduk(); // Refresh produk
      }
    });
  };
  reader.readAsDataURL(file); // convert gambar ke base64
});

document.addEventListener("DOMContentLoaded", tampilkanProduk);
