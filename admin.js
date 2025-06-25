const form = document.getElementById("product-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const nama = document.getElementById("nama").value;
  const harga = document.getElementById("harga").value;
  const file = document.getElementById("gambar").files[0];

  const storageRef = firebase.storage().ref("produk/" + file.name);
  const uploadTask = storageRef.put(file);

  uploadTask.on("state_changed", 
    null,
    (error) => alert("Gagal upload: " + error),
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        firebase.database().ref("produk").push({
          nama: nama,
          harga: harga,
          gambar: url
        });
        alert("✅ Produk berhasil ditambahkan!");
        form.reset();
      });
    }
  );
});
