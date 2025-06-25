// supabase.js

const supabaseUrl = 'https://mvamxktuslesmfdzansf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12YW14a3R1c2xlc21mZHphbnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4Njg2MDQsImV4cCI6MjA2NjQ0NDYwNH0.kSU20Ke6agQP6FT5wpe7WgMqtkwMGhtZi_MziVBJUck';

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Upload produk
async function uploadProduk() {
  const nama = document.getElementById("nama").value;
  const harga = document.getElementById("harga").value;
  const gambar = document.getElementById("gambar").value;
  const status = document.getElementById("status");

  if (!nama || !harga || !gambar) {
    status.innerText = "Semua kolom harus diisi!";
    return;
  }

  const { data, error } = await supabase.from("produk").insert([
    { nama, harga, gambar }
  ]);

  if (error) {
    status.innerText = "❌ Gagal upload produk: " + error.message;
  } else {
    status.innerText = "✅ Produk berhasil diupload!";
    tampilkanProduk(); // update tampilan otomatis
  }
}

// Tampilkan semua produk
async function tampilkanProduk() {
  const container = document.getElementById("produk-container");
  container.innerHTML = "Memuat produk...";

  const { data, error } = await supabase.from("produk").select("*");

  if (error) {
    container.innerHTML = "❌ Gagal mengambil data produk.";
    return;
  }

  if (data.length === 0) {
    container.innerHTML = "Belum ada produk.";
    return;
  }

  container.innerHTML = "";
  data.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.gambar}" alt="${p.nama}">
      <h3>${p.nama}</h3>
      <p>Rp ${Number(p.harga).toLocaleString()}</p>
    `;
    container.appendChild(card);
  });
}

// Jalankan saat halaman dibuka
document.addEventListener("DOMContentLoaded", tampilkanProduk);
