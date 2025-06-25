// panel.js

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

document.addEventListener("DOMContentLoaded", tampilkanProduk);

document.getElementById("uploadForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const harga = document.getElementById("harga").value;
  const gambar = document.getElementById("gambar").files[0];

  if (!nama || !harga || !gambar) {
    alert("Lengkapi semua kolom!");
    return;
  }

  const storageRef = firebase.storage().ref('produk/' + gambar.name);
  storageRef.put(gambar).then(snapshot => {
    snapshot.ref.getDownloadURL().then(url => {
      const produkBaru = {
        nama: nama,
        harga: harga,
        gambar: url
      };
      db.ref("produk").push(produkBaru).then(() => {
        alert("Produk berhasil ditambahkan!");
        document.getElementById("uploadForm").reset();
        tampilkanProduk();
      });
    });
  }).catch(err => {
    console.error("Gagal upload gambar:", err);
    alert("Gagal upload gambar.");
  });
});
