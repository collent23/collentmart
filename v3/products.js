const products = [
  {
    id: 1,
    name: "Tas Lipat Anti Air",
    price: 45000,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Sepatu Casual Ringan",
    price: 125000,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Dompet Kulit Pria",
    price: 75000,
    image: "https://via.placeholder.com/150"
  }
];

const list = document.getElementById("product-list");
products.forEach(p => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>Rp ${p.price.toLocaleString()}</p>
    <button onclick="addToCart(${p.id})">+ Keranjang</button>
  `;
  list.appendChild(card);
});
