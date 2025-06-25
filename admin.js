// admin.js
document.getElementById("uploadForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const harga = document.getElementById("harga").value;
  const gambar = document.getElementById("gambar").files[0];

  if (!nama || !harga || !gambar) return alert("Lengkapi semua kolom!");

  const storageRef = firebase.storage().ref("produk/" + gambar.name);
  const uploadTask = storageRef.put(gambar);

  uploadTask.on("state_changed", 
    () => {},
    (error) => alert("Upload gagal: " + error),
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        const produkRef = firebase.database().ref("produk");
        const newProduk = produkRef.push();
        newProduk.set({ nama, harga, gambar: url });

        alert("Produk berhasil diunggah!");
        document.getElementById("uploadForm").reset();
      });
    }
  );
});
