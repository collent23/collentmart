// v3/products.js

const firebaseConfig = {
  apiKey: "AIzaSyCL-26dKIBz3-npBhWnkFV_uQVjNBMonIw",
  authDomain: "collentmart.firebaseapp.com",
  databaseURL: "https://collentmart-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "collentmart",
  storageBucket: "collentmart.appspot.com",
  messagingSenderId: "393900515991",
  appId: "1:393900515991:web:972f3a34463d6354d3bfd2"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function loadProducts() {
  const container = document.getElementById("product-list");
  container.innerHTML = "<p>Memuat produk...</p>";

  db.ref("produk").once("value", snapshot => {
    container.innerHTML = "";
    snapshot.forEach(child => {
      const p = child.val();
      const div = document.createElement("div");
      div.className = "product-card";
      div.dataset.category = p.kategori || "umum";
      div.innerHTML = `
        <img src="${p.gambar}" alt="${p.nama}">
        <h3>${p.nama}</h3>
        <p>Rp${Number(p.harga).toLocaleString()}</p>
        <button onclick="addToCart('${p.nama}', ${p.harga})" class="blue-button">Tambah ke Keranjang</button>
      `;
      container.appendChild(div);
    });
  });
}
