const db = firebase.database();
const storage = firebase.storage();

document.getElementById("form-produk").addEventListener("submit", e => {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const harga = document.getElementById("harga").value;
  const file = document.getElementById("gambar").files[0];

  if (!file) return alert("Pilih gambar dulu!");

  const storageRef = storage.ref('gambar_produk/' + file.name);
  storageRef.put(file).then(snapshot => {
    return snapshot.ref.getDownloadURL();
  }).then(url => {
    const data = { nama, harga, gambar: url };
    return db.ref("produk").push(data);
  }).then(() => {
    alert("Produk berhasil ditambahkan!");
    document.getElementById("form-produk").reset();
    loadPreview();
  }).catch(err => {
    console.error(err);
    alert("Gagal upload produk");
  });
});

function loadPreview() {
  const container = document.getElementById("preview-grid");
  container.innerHTML = "<p>Loading...</p>";

  db.ref("produk").once("value", snapshot => {
    container.innerHTML = "";
    snapshot.forEach(child => {
      const p = child.val();
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${p.gambar}" alt="${p.nama}">
        <h3>${p.nama}</h3>
        <p>Rp${Number(p.harga).toLocaleString()}</p>
      `;
      container.appendChild(div);
    });
  });
}

loadPreview();
