
function saveProduct() {
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const file = document.getElementById('image').files[0];

  const reader = new FileReader();
  reader.onload = function(e) {
    const product = { name, price, img: e.target.result };
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    alert('Produk disimpan!');
    window.location.href = "index.html";
  };
  if (file) reader.readAsDataURL(file);
}

function showProducts() {
  const list = document.getElementById('product-list');
  const products = JSON.parse(localStorage.getItem('products')) || [];
  list.innerHTML = '';
  products.forEach((p) => {
    list.innerHTML += \`
      <div class="product">
        <img src="\${p.img}" alt="\${p.name}" />
        <h3>\${p.name}</h3>
        <p>Harga: Rp \${p.price}</p>
      </div>\`;
  });
}

if (document.getElementById('product-list')) showProducts();
