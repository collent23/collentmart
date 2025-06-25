// admin.js - versi Supabase

// Upload Produk
async function uploadProduk() {
  const nama = document.getElementById("nama").value;
  const harga = parseFloat(document.getElementById("harga").value);
  const gambarInput = document.getElementById("gambar");
  const status = document.getElementById("status");

  if (!nama || !harga || !gambarInput.files.length) {
    status.innerText = "Lengkapi semua data!";
    return;
  }

  const gambar = URL.createObjectURL(gambarInput.files[0]);

  const { error } = await db.from("produk").insert([{ nama, harga, gambar }]);
  status.innerText = error ? "Gagal upload: " + error.message : "Berhasil upload!";
  if (!error) tampilkanProduk();
}

// Tampilkan Produk
async function tampilkanProduk() {
  const container = document.getElementById("produk-container");
  container.innerHTML = "<p>Memuat produk...</p>";

  const { data, error } = await db.from("produk").select("*").order("created_at", { ascending: false });

  if (error) {
    container.innerHTML = "<p>Gagal memuat produk</p>";
    return;
  }

  container.innerHTML = "";
  data.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.gambar}" alt="${p.nama}">
      <h3>${p.nama}</h3>
      <p>Rp${Number(p.harga).toLocaleString()}</p>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", tampilkanProduk);
