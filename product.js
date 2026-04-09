/* ================================================
       PRODUCT DATA
    ================================================ */
const kitchenProducts = [
  {
    image: "images/taps.png",
    badge: { text: "Hot", type: "hot" },
    category: "Taps",
    name: "Faucet Tap",
    price: 3500,
    whatsapp: "254727935046",
  },
  {
    image: "images/farmhouse.png",
    badge: { text: "Offer", type: "offer" },
    category: "Sinks",
    name: "Farmhouse Workstation Sink",
    price: 42000,
    whatsapp: "254727935046",
  },
  {
    image: "images/faucet.png",
    badge: null,
    category: "Shower",
    name: "Best Sink Tap",
    price: 12500,
    whatsapp: "254727935046",
  },
  {
    image: "images/filter-system.jfif",
    badge: { text: "New", type: "default" },
    category: "Filtration",
    name: "Under-Sink RO Purifier",
    price: 35000,
    whatsapp: "254727935046",
  },
  {
    image: "images/double-sink.jfif",
    badge: null,
    category: "Sinks",
    name: "Double Bowl Steel Sink",
    price: 28000,
    whatsapp: "254727935046",
  },
  {
    image: "images/boiling%20tap.png",
    badge: { text: "Premium", type: "default" },
    category: "Mixers",
    name: "Instant Boiling Tap",
    price: 55000,
    whatsapp: "254727935046",
  },
  {
    image: "images/industrial%20spray-tap.jfif",
    badge: null,
    category: "Faucets",
    name: "Industrial Pull-Out Spray",
    price: 16500,
    whatsapp: "254727935046",
  },
  {
    image: "images/island-sink.jfif",
    badge: { text: "New", type: "default" },
    category: "Sinks",
    name: "Kitchen Island Prep Sink",
    price: 14500,
    whatsapp: "254727935046",
  },
  {
    image: "images/pot-filler.jfif",
    badge: { text: "Pro Choice", type: "hot" },
    category: "Specialty",
    name: "Folding Pot Filler",
    price: 19500,
    whatsapp: "254727935046",
  },
  {
    image: "images/granite-sink.jfif",
    badge: null,
    category: "Sinks",
    name: "Granite Composite Double",
    price: 48000,
    whatsapp: "254727935046",
  },
  {
    image: "images/sensor-tap.jfif",
    badge: { text: "Premium", type: "default" },
    category: "Faucets",
    name: "Touchless Motion Sensor Tap",
    price: 29000,
    whatsapp: "254727935046",
  },
  {
    image: "images/bin-system.jfif",
    badge: null,
    category: "Waste Mgmt",
    name: "Under-Sink Dual Waste Bin",
    price: 9500,
    whatsapp: "254727935046",
  },
  {
    image: "images/glass-rinser.jfif",
    badge: { text: "25% Off", type: "offer" },
    category: "Accessories",
    name: "High-Pressure Glass Rinser",
    price: 4500,
    oldPrice: 6000,
    whatsapp: "254727935046",
  },
];

const bathroomProducts = [
  {
    image: "images/wallhung.png",
    badge: { text: "Modern", type: "default" },
    category: "Toilets",
    name: "Rimless Wall-Hung Toilet",
    price: 32000,
    whatsapp: "254727935046",
  },
  {
    image: "images/thermostaticshower.png",
    badge: { text: "Popular", type: "hot" },
    category: "Showers",
    name: "Thermostatic Rain Shower",
    price: 24500,
    whatsapp: "254727935046",
  },
  {
    image: "images/watefallbasinmixer.png",
    badge: null,
    category: "Faucets",
    name: "Waterfall Basin Mixer",
    price: 8500,
    whatsapp: "254727935046",
  },
  {
    image: "images/tub.png",
    badge: { text: "Luxury", type: "default" },
    category: "Tubs",
    name: "Free-Standing Acrylic Tub",
    price: 85000,
    whatsapp: "254727935046",
  },
  {
    image: "images/Ledmirror.png",
    badge: null,
    category: "Accessories",
    name: "Smart LED Backlit Mirror",
    price: 15000,
    whatsapp: "254727935046",
  },
  {
    image: "images/cistern.png",
    badge: null,
    category: "Toilets",
    name: "Dual-Flush Concealed Cistern",
    price: 12000,
    whatsapp: "254727935046",
  },
  {
    image: "images/vanity.png",
    badge: { text: "Offer", type: "offer" },
    category: "Vanities",
    name: "Floating Oak Vanity Unit",
    price: 45000,
    whatsapp: "254727935046",
  },
  {
    image: "images/tallmixer.png",
    badge: null,
    category: "Faucets",
    name: "Tall Countertop Basin Tap",
    price: 10500,
    whatsapp: "254727935046",
  },
  {
    image: "images/toilet.jpg",
    badge: null,
    category: "Toilets",
    name: "Close Coupled Toilet",
    price: 22000,
    whatsapp: "254727935046",
  },
  {
    image: "images/hand-shower.png",
    badge: null,
    category: "Showers",
    name: "Multi-Function Hand Shower",
    price: 4500,
    whatsapp: "254727935046",
  },
  {
    image: "images/lorenzeti.jfif",
    badge: null,
    category: "Accessories",
    name: "Lorenzetti Shower Heater - Bello Banho",
    price: 3500,
    whatsapp: "254727935046",
  },
  {
    image: "images/towel-rack.png",
    badge: null,
    category: "Accessories",
    name: "Heated Electric Towel Rail",
    price: 18000,
    whatsapp: "254727935046",
  },
  {
    image: "images/bidet.png",
    badge: null,
    category: "Toilets",
    name: "Bidet Smart Toilet Seat",
    price: 22000,
    whatsapp: "254727935046",
  },
  {
    image: "images/bath-mixer.png",
    badge: null,
    category: "Mixers",
    name: "Concealed Bath/Shower Valve",
    price: 14000,
    whatsapp: "254727935046",
  },
  {
    image: "images/bowl-basin.png",
    badge: { text: "New", type: "default" },
    category: "Basins",
    name: "Ceramic Countertop Bowl",
    price: 9500,
    whatsapp: "254727935046",
  },
  {
    image: "images/glass-screen.png",
    badge: null,
    category: "Showers",
    name: "Tempered Glass Shower Screen",
    price: 28000,
    whatsapp: "254727935046",
  },
];

const constructionProducts = [
  {
    image: "images/ppr-pipe.png",
    badge: { text: "PN20", type: "default" },
    category: "Piping",
    name: "PPR Pipe (20mm x 4m)",
    price: 1200,
    whatsapp: "254727935046",
  },
  {
    image: "images/gate-valve.png",
    badge: null,
    category: "Controls",
    name: "Brass Gate Valve (1 Inch)",
    price: 2800,
    whatsapp: "254727935046",
  },
  {
    image: "images/hdpe-roll.png",
    badge: { text: "Heavy Duty", type: "default" },
    category: "Piping",
    name: "HDPE Pipe Roll (32mm)",
    price: 14500,
    whatsapp: "254727935046",
  },
  {
    image: "images/pvc-pipe.png",
    badge: null,
    category: "Drainage",
    name: "uPVC Waste Pipe (4 Inch)",
    price: 3200,
    whatsapp: "254727935046",
  },
  {
    image: "images/manhole.png",
    badge: null,
    category: "Infrastructure",
    name: "Cast Iron Manhole Cover",
    price: 8500,
    whatsapp: "254727935046",
  },
  {
    image: "images/mastergulley.png",
    badge: null,
    category: "Drainage",
    name: "Master Gulley Trap",
    price: 1800,
    whatsapp: "254727935046",
  },
  {
    image: "images/ppr-fittings.png",
    badge: null,
    category: "Fittings",
    name: "PPR Elbow &amp; Tee Pack (Mixed)",
    price: 5000,
    whatsapp: "254727935046",
  },
  {
    image: "images/ball-valve.png",
    badge: null,
    category: "Controls",
    name: "PVC Ball Valve (Stopcock)",
    price: 950,
    whatsapp: "254727935046",
  },
  {
    image: "images/braided-connectors.png",
    badge: null,
    category: "Fittings",
    name: "Braided Flexible Connectors",
    price: 1400,
    whatsapp: "254727935046",
  },
  {
    image: "images/water-meter.png",
    badge: null,
    category: "Measurement",
    name: "Residential Water Meter",
    price: 4200,
    whatsapp: "254727935046",
  },
  {
    image: "images/pressure-pump.png",
    badge: null,
    category: "Pumps",
    name: "Automatic Pressure Pump",
    price: 18500,
    whatsapp: "254727935046",
  },
  {
    image: "images/tank-connector.png",
    badge: null,
    category: "Fittings",
    name: "Tank Connector (Large)",
    price: 1200,
    whatsapp: "254727935046",
  },
  {
    image: "images/solvent.png",
    badge: null,
    category: "Consumables",
    name: "PVC Solvent Cement (500ml)",
    price: 850,
    whatsapp: "254727935046",
  },
  {
    image: "images/thread-tape.jpg",
    badge: null,
    category: "Consumables",
    name: "PTFE Thread Seal Tape (Box)",
    price: 1500,
    whatsapp: "254727935046",
  },
  {
    image: "images/ppr-machine.jpg",
    badge: null,
    category: "Tools",
    name: "PPR Pipe Welding Machine",
    price: 6500,
    whatsapp: "254727935046",
  },
];

/* ================================================
       PRODUCT CARD RENDERER
    ================================================ */
function renderProductCard(product) {
  const badgeHTML = product.badge
    ? `<span class="product-badge ${product.badge.type}">${product.badge.text}</span>`
    : "";

  const oldPriceHTML = product.oldPrice
    ? `<span class="price-old">KSh ${product.oldPrice.toLocaleString()}</span>`
    : "";

  return `
        <div class="product-item-card">
          <div class="product-image-box" style="background-image: url('${product.image}');">
            ${badgeHTML}
          </div>
          <div class="product-details">
            <span class="category-label">${product.category}</span>
            <h3>${product.name}</h3>
            <div class="price-row">
              <span class="price-current">KSh ${product.price.toLocaleString()}</span>
              ${oldPriceHTML}
            </div>
            <a href="https://wa.me/${product.whatsapp}" class="whatsapp-order-btn">
              <i class="fab fa-whatsapp"></i> Order via WhatsApp
            </a>
            <div class="qty-selector">
              <button onclick="this.nextElementSibling.stepDown();this.nextElementSibling.dispatchEvent(new Event('change'))">−</button>
              <input type="number" class="item-quantity" value="1" min="1">
              <button onclick="this.previousElementSibling.stepUp();this.previousElementSibling.dispatchEvent(new Event('change'))">+</button>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(this)">
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
        </div>`;
}

function renderGrid(gridId, products) {
  document.getElementById(gridId).innerHTML = products
    .map(renderProductCard)
    .join("");
}

/* ================================================
       INITIALISE GRIDS ON LOAD
    ================================================ */
document.addEventListener("DOMContentLoaded", function () {
  renderGrid("kitchenGrid", kitchenProducts);
  renderGrid("bathroomGrid", bathroomProducts);
  renderGrid("constGrid", constructionProducts);
});

/* ================================================
       MAIN PAGE SCRIPTS
    ================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // --- Typewriter ---
  const text = "Welcome to ";
  const speed = 70;
  let i = 0;
  function typeWriter() {
    const element = document.getElementById("hero-title");
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else {
      setTimeout(() => {
        element.classList.add("fade-out");
      }, 2000);
    }
  }
  typeWriter();

  // --- Counter on scroll ---
  const counterElement = document.getElementById("counter");
  let counterStarted = false;
  if (counterElement) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counterStarted) {
        counterStarted = true;
        let count = 0;
        const interval = setInterval(() => {
          if (count >= 100) {
            clearInterval(interval);
          } else {
            count++;
            counterElement.textContent = count;
          }
        }, 20);
      }
    });
    observer.observe(counterElement);
  }

  // --- Contact form ---
  const contactForm = document.querySelector(".contact-form");
  const modal = document.getElementById("success-modal");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      fetch("https://formspree.io/f/xojpwqgp", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            if (modal) {
              modal.style.display = "flex";
            }
            contactForm.reset();
          } else {
            alert(
              "Something went wrong. Please try again or call us directly.",
            );
          }
        })
        .catch(() => {
          alert("Network error. Please check your connection and try again.");
        });
    });
  }

  // --- Smooth scroll nav links ---
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelectorAll(
    ".main-nav a, .cta-button, .footer-links a",
  );
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId.startsWith("#") && targetId !== "#") {
        e.preventDefault();
        menuToggle.checked = false;
        setTimeout(() => {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }, 450);
      }
    });
  });
});

// Back-to-top scroll listener
window.addEventListener("scroll", function () {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  if (window.scrollY > 400) {
    btn.classList.add("visible");
  } else {
    btn.classList.remove("visible");
  }
});

// --- Modal Close ---
function closeModal() {
  const modal = document.getElementById("success-modal");
  if (modal) {
    modal.style.display = "none";
  }
  const form = document.querySelector(".contact-form");
  if (form) {
    form.reset();
  }
}

// --- Review Modal ---
function openReviewModal() {
  document.getElementById("reviewModal").style.display = "flex";
}

function closeReviewModal() {
  document.getElementById("reviewModal").style.display = "none";
  setTimeout(() => {
    document.getElementById("reviewFormContainer").style.display = "block";
    document.getElementById("reviewSuccessMessage").style.display = "none";
    document.getElementById("reviewForm").reset();
  }, 500);
}

window.onclick = function (event) {
  const modal = document.getElementById("reviewModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function handleReviewSubmit(event) {
  event.preventDefault();
  document.getElementById("reviewFormContainer").style.display = "none";
  document.getElementById("reviewSuccessMessage").style.display = "block";
}

// --- Kitchen Grid Toggle ---
function toggleKitchenGrid() {
  const grid = document.getElementById("kitchen-full-catalog");
  const isOpening = !grid.classList.contains("show-grid");
  if (isOpening) {
    grid.classList.add("show-grid");
    setTimeout(() => {
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  } else {
    const kitchenSection = grid.previousElementSibling;
    window.scrollTo({
      top: kitchenSection.offsetTop - 100,
      behavior: "smooth",
    });
    setTimeout(() => {
      grid.classList.remove("show-grid");
    }, 300);
  }
}

function filterProducts() {
  const input = document.getElementById("productSearch");
  const clearBtn = document.getElementById("clearSearch");
  const filter = input.value.toLowerCase();
  clearBtn.style.display = input.value.length > 0 ? "block" : "none";
  const cards = document.querySelectorAll("#kitchenGrid .product-item-card");
  const noResults = document.getElementById("noResults");
  let visibleCount = 0;
  cards.forEach((card) => {
    const title = card.querySelector("h3").innerText.toLowerCase();
    const category = card
      .querySelector(".category-label")
      .innerText.toLowerCase();
    if (title.includes(filter) || category.includes(filter)) {
      card.style.display = "";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });
  noResults.style.display = visibleCount === 0 ? "block" : "none";
}

function clearProductSearch() {
  const input = document.getElementById("productSearch");
  input.value = "";
  filterProducts();
}

// --- Bathroom Grid Toggle ---
function toggleBathroomGrid() {
  const grid = document.getElementById("bathroom-full-catalog");
  if (!grid.classList.contains("show-grid")) {
    grid.classList.add("show-grid");
    setTimeout(() => {
      grid.scrollIntoView({ behavior: "smooth" });
    }, 100);
  } else {
    const portal = document.querySelector(".bathroom-bg");
    window.scrollTo({ top: portal.offsetTop - 150, behavior: "smooth" });
    setTimeout(() => {
      grid.classList.remove("show-grid");
    }, 400);
  }
}

function filterBathroom() {
  const input = document.getElementById("bathroomSearch");
  const clearBtn = document.getElementById("clearBathSearch");
  const filter = input.value.toLowerCase();
  clearBtn.style.display = input.value.length > 0 ? "block" : "none";
  const cards = document.querySelectorAll("#bathroomGrid .product-item-card");
  let count = 0;
  cards.forEach((card) => {
    const text = card.innerText.toLowerCase();
    if (text.includes(filter)) {
      card.style.display = "";
      count++;
    } else {
      card.style.display = "none";
    }
  });
  document.getElementById("noBathResults").style.display =
    count === 0 ? "block" : "none";
}

function clearBathSearch() {
  document.getElementById("bathroomSearch").value = "";
  filterBathroom();
}

// --- Construction Grid Toggle ---
function toggleConstructionGrid() {
  const grid = document.getElementById("construction-full-catalog");
  const isOpening = !grid.classList.contains("show-grid");
  if (isOpening) {
    grid.classList.add("show-grid");
    setTimeout(() => {
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  } else {
    const portal = document.querySelector(".construction-bg");
    window.scrollTo({ top: portal.offsetTop - 100, behavior: "smooth" });
    setTimeout(() => {
      grid.classList.remove("show-grid");
    }, 400);
  }
}

function filterConst() {
  const input = document.getElementById("constSearch");
  const filter = input.value.toLowerCase();
  const grid = document.getElementById("constGrid");
  const cards = grid.getElementsByClassName("product-item-card");
  const clearBtn = document.getElementById("clearConstSearch");
  const noResults = document.getElementById("noConstResults");
  let visibleCount = 0;
  clearBtn.style.display = filter.length > 0 ? "block" : "none";
  for (let i = 0; i < cards.length; i++) {
    const title = cards[i].querySelector("h3").innerText;
    const category = cards[i].querySelector(".category-label").innerText;
    if (
      title.toLowerCase().indexOf(filter) > -1 ||
      category.toLowerCase().indexOf(filter) > -1
    ) {
      cards[i].style.display = "";
      visibleCount++;
    } else {
      cards[i].style.display = "none";
    }
  }
  noResults.style.display = visibleCount === 0 ? "block" : "none";
}

function clearConstSearch() {
  const input = document.getElementById("constSearch");
  input.value = "";
  filterConst();
  input.focus();
}

// ===== CART SYSTEM =====
let cart = [];

function addToCart(btn) {
  const card = btn.closest(".product-item-card");
  const name = card.querySelector("h3").innerText.trim();
  const priceEl = card.querySelector(".price-current");
  const priceText = priceEl ? priceEl.innerText.trim() : "KSh 0";
  const priceNum = parseInt(priceText.replace(/[^0-9]/g, "")) || 0;
  const qtyInput = card.querySelector(".item-quantity");
  const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
  const existing = cart.find((i) => i.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price: priceNum, priceText, qty });
  }
  btn.classList.add("added");
  btn.innerHTML = '<i class="fas fa-check"></i> Added!';
  setTimeout(() => {
    btn.classList.remove("added");
    btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
  }, 1500);
  updateCartUI();
  openCart();
}
function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById("cartBadge");
  const countEl = document.getElementById("cartCount");
  badge.textContent = totalItems;
  countEl.textContent = totalItems;
  badge.style.display = totalItems > 0 ? "flex" : "none";
  document.getElementById("cartSubtotal").textContent =
    "KSh " + total.toLocaleString();
  const emptyEl = document.getElementById("cartEmpty");
  const waBtn = document.getElementById("cartWhatsapp");
  const emailBtn = document.getElementById("cartEmail");
  const clearBtn = document.getElementById("clearCartBtn");
  emptyEl.style.display = cart.length === 0 ? "block" : "none";
  waBtn.style.display = cart.length > 0 ? "block" : "none";
  emailBtn.style.display = cart.length > 0 ? "block" : "none";
  clearBtn.style.display = cart.length > 0 ? "block" : "none";
  const container = document.getElementById("cartItems");
  container.innerHTML = "";
  cart.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.priceText} each</div>
                <div class="cart-item-controls">
                    <button class="cart-qty-btn" onclick="changeCartQty(${idx}, -1)">−</button>
                    <input class="cart-qty-input" type="number" value="${item.qty}" min="1" onchange="setCartQty(${idx}, this.value)">
                    <button class="cart-qty-btn" onclick="changeCartQty(${idx}, 1)">+</button>
                    <button class="cart-remove-btn" onclick="removeFromCart(${idx})"><i class="fas fa-trash"></i> Remove</button>
                </div>
            </div>
            <div class="cart-item-total">KSh ${(item.price * item.qty).toLocaleString()}</div>`;
    container.appendChild(div);
  });

  if (cart.length > 0) {
    const orderRef = "ORD-" + Date.now().toString().slice(-6);
    const date = new Date().toLocaleDateString("en-KE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // WhatsApp message
    let msg = `*PRIMELINE PLUMBING — NEW ORDER*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📋 Order Ref: ${orderRef}\n`;
    msg += `📅 Date: ${date}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    msg += `*ITEMS ORDERED:*\n\n`;
    cart.forEach((i, idx) => {
      const lineTotal = i.price * i.qty;
      msg += `${idx + 1}. ${i.name}\n`;
      msg += `   Qty: ${i.qty} × KSh ${i.price.toLocaleString()} = KSh ${lineTotal.toLocaleString()}\n\n`;
    });
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*TOTAL: KSh ${total.toLocaleString()}*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    msg += `Please confirm availability and delivery details. Thank you! 🙏`;
    waBtn.href = "https://wa.me/254727935046?text=" + encodeURIComponent(msg);

    // Email message
    const subject = `New Order ${orderRef} — Primeline Plumbing`;
    let body = `PRIMELINE PLUMBING — NEW ORDER\n`;
    body += `================================\n`;
    body += `Order Ref: ${orderRef}\n`;
    body += `Date: ${date}\n`;
    body += `================================\n\n`;
    body += `ITEMS ORDERED:\n\n`;
    cart.forEach((i, idx) => {
      const lineTotal = i.price * i.qty;
      body += `${idx + 1}. ${i.name}\n`;
      body += `   Qty: ${i.qty} x KSh ${i.price.toLocaleString()} = KSh ${lineTotal.toLocaleString()}\n\n`;
    });
    body += `================================\n`;
    body += `TOTAL: KSh ${total.toLocaleString()}\n`;
    body += `================================\n\n`;
    body += `Please confirm availability and delivery details.\n\nThank you!`;

    emailBtn.href = `mailto:primeline98@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}

function changeCartQty(idx, delta) {
  cart[idx].qty = Math.max(1, cart[idx].qty + delta);
  updateCartUI();
}

function setCartQty(idx, val) {
  cart[idx].qty = Math.max(1, parseInt(val) || 1);
  updateCartUI();
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  updateCartUI();
}

function clearCart() {
  cart = [];
  updateCartUI();
}

function openCart() {
  document.getElementById("cartDrawer").style.right = "0";
  document.getElementById("cartOverlay").style.display = "block";
}

function closeCart() {
  document.getElementById("cartDrawer").style.right = "-420px";
  document.getElementById("cartOverlay").style.display = "none";
}
function openLoginModal() {
  if (window._plUserLoggedIn) {
    window.location.href = "dashboard.html";
    return;
  }
  document.getElementById("loginModal").style.display = "flex";
}
function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none";
}
