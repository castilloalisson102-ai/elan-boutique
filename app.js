const products = [
  {
    id: 1,
    name: "Blazer de lino",
    category: "women",
    price: 189,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    badge: "New",
    rating: 4.9,
    description:
      "Blazer estructurado con corte sobrio y sofisticado, ideal para looks office con un toque premium.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Chaqueta de lana",
    category: "men",
    price: 219,
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
    badge: "Best seller",
    rating: 4.8,
    description:
      "Chaqueta cálida y elegante con líneas limpias, pensada para días fríos con estilo impecable.",
    sizes: ["M", "L", "XL"],
  },
  {
    id: 3,
    name: "Vestido midi satin",
    category: "women",
    price: 169,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    badge: "Trend",
    rating: 4.9,
    description:
      "Vestido midi con caída elegante y acabado satinado que realza la silueta con un aire refinado.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 4,
    name: "Camisa premium",
    category: "men",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    badge: "Top",
    rating: 4.7,
    description:
      "Camisa con textura premium, ajuste moderno y detalle sofisticado para uso diario o eventos formales.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Falda estructurada",
    category: "women",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    badge: "Limited",
    rating: 4.8,
    description:
      "Falda minimalista con corte elegante y un ajuste impecable que funciona para looks formales y casuales.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 6,
    name: "Pantalón urbano",
    category: "men",
    price: 139,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    badge: "Popular",
    rating: 4.9,
    description:
      "Pantalón premium con comodidad, caída moderna y detalles de corte que combinan funcionalidad y estilo.",
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: 7,
    name: "Abrigo oversize",
    category: "women",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    badge: "Editorial",
    rating: 5.0,
    description:
      "Abrigo oversized con textura cálida y corte relajado ideal para complementar looks sofisticados.",
    sizes: ["S", "M", "L"],
  },
  {
    id: 8,
    name: "Set de punto",
    category: "men",
    price: 179,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    badge: "Premium",
    rating: 4.8,
    description:
      "Conjunto de punto premium con silueta moderna y máxima comodidad para un look casual refinado.",
    sizes: ["M", "L", "XL"],
  },
];

const productGrid = document.getElementById("productGrid");
const filterSelect = document.getElementById("filterSelect");
const searchInput = document.getElementById("searchInput");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartBadge = document.getElementById("cartBadge");
const cartTotal = document.getElementById("cartTotal");
const productModal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalSizes = document.getElementById("modalSizes");
const modalAddToCart = document.getElementById("modalAddToCart");

let cart = [];
let selectedModalProduct = null;
let selectedSize = "M";

const formatPrice = (value) => `$${value.toLocaleString("es-MX")}`;

function renderProducts() {
  const filter = filterSelect.value;
  const query = searchInput.value.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesFilter = filter === "all" || product.category === filter;
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  if (!filteredProducts.length) {
    productGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; padding: 2rem; text-align: center; background: rgba(255,255,255,0.5); border: 1px solid var(--line); border-radius: 22px; color: var(--muted);">
        No encontramos prendas con ese criterio.
      </div>
    `;
    return;
  }

  productGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-media">
            <img src="${product.image}" alt="${product.name}" />
            <span class="product-badge">${product.badge}</span>
          </div>
          <div class="product-content">
            <div class="product-topline">
              <span class="eyebrow" style="margin: 0; letter-spacing: 0.08em;">${
                product.category === "women" ? "Mujer" : "Hombre"
              }</span>
              <span class="product-rating">★ ${product.rating}</span>
            </div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-meta">
              <span class="price">${formatPrice(product.price)}</span>
              <button class="add-btn" data-id="${product.id}">Añadir</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".add-btn").forEach((button) => {
    button.addEventListener("click", () => addToCart(Number(button.dataset.id)));
  });

  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("dblclick", () => openProductModal(card));
  });
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío.</p>';
    cartBadge.textContent = "0";
    cartTotal.textContent = "$0";
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <h4>${item.name}</h4>
            <p>${item.category === "women" ? "Mujer" : "Hombre"}</p>
            <div class="quantity-controls">
              <button data-action="decrease" data-id="${item.id}">−</button>
              <span>${item.quantity}</span>
              <button data-action="increase" data-id="${item.id}">+</button>
            </div>
          </div>
          <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
        </div>
      `
    )
    .join("");

  cartBadge.textContent = String(cart.reduce((sum, item) => sum + item.quantity, 0));
  cartTotal.textContent = formatPrice(
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => updateCartQuantity(Number(button.dataset.id), button.dataset.action));
  });
}

function updateCartQuantity(productId, action) {
  const item = cart.find((product) => product.id === productId);
  if (!item) return;

  if (action === "increase") {
    item.quantity += 1;
  } else {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart = cart.filter((product) => product.id !== productId);
    }
  }

  renderCart();
}

function openProductModal(cardElement) {
  const productCard = cardElement.closest(".product-card");
  if (!productCard) return;

  const productTitle = productCard.querySelector(".product-title")?.textContent;
  const product = products.find((item) => item.name === productTitle);
  if (!product) return;

  selectedModalProduct = product;
  selectedSize = product.sizes[0];

  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalCategory.textContent = product.category === "women" ? "Mujer" : "Hombre";
  modalTitle.textContent = product.name;
  modalPrice.textContent = formatPrice(product.price);
  modalDescription.textContent = product.description;
  modalSizes.innerHTML = product.sizes
    .map(
      (size, index) => `
        <button class="size-pill ${index === 0 ? "selected" : ""}" data-size="${size}">${size}</button>
      `
    )
    .join("");

  document.querySelectorAll(".size-pill").forEach((button) => {
    button.addEventListener("click", () => {
      selectedSize = button.dataset.size;
      document.querySelectorAll(".size-pill").forEach((pill) => pill.classList.remove("selected"));
      button.classList.add("selected");
    });
  });

  productModal.classList.remove("hidden");
}

function closeProductModal() {
  productModal.classList.add("hidden");
}

modalAddToCart.addEventListener("click", () => {
  if (!selectedModalProduct) return;
  addToCart(selectedModalProduct.id);
  closeProductModal();
});

document.querySelector(".cart-toggle").addEventListener("click", () => {
  cartPanel.classList.toggle("open");
});

document.querySelector(".close-cart").addEventListener("click", () => {
  cartPanel.classList.remove("open");
});

document.querySelector(".modal-close").addEventListener("click", () => {
  closeProductModal();
});

productModal.addEventListener("click", (event) => {
  if (event.target === productModal) closeProductModal();
});

filterSelect.addEventListener("change", renderProducts);
searchInput.addEventListener("input", renderProducts);
document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", () => {
    const category = card.dataset.category;
    if (!category) return;
    filterSelect.value = category;
    renderProducts();
    document.getElementById("coleccion").scrollIntoView({ behavior: "smooth" });
  });
});

renderProducts();
renderCart();
