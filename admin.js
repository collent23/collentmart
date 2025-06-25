// admin.js

document.addEventListener("DOMContentLoaded", () => {
  ambilProduk();
});

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const harga = parseInt(document.getElementById("harga").value);
  const gambarFile = document.getElementById("gambar").files[0];

  const status = document.getElementById("status");
  status.textContent = "Mengunggah...";

  try {
    // Upload gambar ke Supabase Storage
    const fileExt = gambarFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('produk')
      .upload(fileName, gambarFile);

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from('produk')
      .getPublicUrl(fileName);

    // Simpan data produk ke database
    const { error: insertError } = await supabase
      .from('produk')
      .insert([{ nama, harga, gambar: urlData.publicUrl }]);

    if (insertError) throw insertError;

    status.textContent = "✅ Produk berhasil diupload!";
    document.getElementById("uploadForm").reset();
    ambilProduk();
  } catch (err) {
    console.error(err);
    status.textContent = "❌ Gagal upload produk.";
  }
});

// Menampilkan produk dari Supabase
async function ambilProduk() {
  const container = document.getElementById("produk-container");
  container.innerHTML = "<p>Memuat produk...</p>";

  const { data: produkList, error } = await supabase
    .from("produk")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    container.innerHTML = "<p>Gagal mengambil data produk.</p>";
    return;
  }

  if (produkList.length === 0) {
    container.innerHTML = "<p>Belum ada produk.</p>";
    return;
  }

  container.innerHTML = "";
  produkList.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.gambar}" alt="${p.nama}" />
      <h3>${p.nama}</h3>
      <p>Rp ${Number(p.harga).toLocaleString()}</p>
    `;
    container.appendChild(card);
  });
}
