const products = [
  {
    id: 1,
    name: "Pulsa Telkomsel 20K",
    price: 21000,
    image: "https://via.placeholder.com/150?text=Pulsa+20K",
    category: "pulsa"
  },
  {
    id: 2,
    name: "Diamond ML 86",
    price: 15000,
    image: "https://via.placeholder.com/150?text=ML+Diamond",
    category: "game"
  },
  {
    id: 3,
    name: "Kaos Collent Black",
    price: 69000,
    image: "https://via.placeholder.com/150?text=Kaos+Collent",
    category: "fashion"
  },
  {
    id: 4,
    name: "Headset Bluetooth",
    price: 99000,
    image: "https://via.placeholder.com/150?text=Headset",
    category: "elektronik"
  },
  {
    id: 5,
    name: "Stiker Custom",
    price: 12000,
    image: "https://via.placeholder.com/150?text=Stiker",
    category: "lainnya"
  }
];

window.onload = () => {
  const list = document.getElementById("product-list");
  products.forEach(product => {
    const el = document.createElement("div");
    el.className = "product-card";
    el.dataset.category = product.category;
    el.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Rp${product.price.toLocaleString()}</p>
      <button onclick="addToCart('${product.name}', ${product.price})">Tambah</button>
    `;
    list.appendChild(el);
  });
};
