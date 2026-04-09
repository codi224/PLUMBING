// ══════════════════════════════════════
//  PDF GENERATOR
// ══════════════════════════════════════
const PRIMELINE = {
  name: "PRIMELINE PLUMBING SOLUTIONS",
  tagline: "Precision Plumbing. Lasting Solutions.",
  address: "Kiambu, Kenya",
  phone: "+254 796 016 720",
  email: "info@primelinesolutions.co.ke",
  website: "primelineplumbingsolutions.co.ke",
};

function buildPDF(type, data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210,
    H = 297;
  const blue = [61, 133, 198];
  const navy = [7, 22, 38];
  const gold = [230, 190, 12];
  const white = [255, 255, 255];
  const grey = [143, 168, 196];

  // ── HEADER BACKGROUND ──
  doc.setFillColor(...navy);
  doc.rect(0, 0, W, 48, "F");

  // Gold accent line
  doc.setFillColor(...gold);
  doc.rect(0, 0, W, 2, "F");

  // Blue side accent
  doc.setFillColor(...blue);
  doc.rect(0, 2, 3, 46, "F");

  // Company name
  doc.setTextColor(...gold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(PRIMELINE.name, 14, 16);

  // Tagline
  doc.setTextColor(...grey);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.text(PRIMELINE.tagline, 14, 22);

  // Contact details — right side
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...grey);
  const contactLines = [
    PRIMELINE.address,
    PRIMELINE.phone,
    PRIMELINE.email,
    PRIMELINE.website,
  ];
  contactLines.forEach((line, i) => {
    doc.text(line, W - 14, 12 + i * 6, { align: "right" });
  });

  // ── DOCUMENT TYPE BADGE ──
  const isInvoice = type === "invoice";
  const badgeColor = isInvoice ? gold : blue;
  doc.setFillColor(...badgeColor);
  doc.roundedRect(14, 54, isInvoice ? 28 : 26, 8, 2, 2, "F");
  doc.setTextColor(...navy);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text(isInvoice ? "INVOICE" : "QUOTATION", 18, 59.5);

  // ── DOCUMENT TITLE ──
  doc.setTextColor(...navy);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(data.title || (isInvoice ? "Invoice" : "Quotation"), 14, 74);

  // Divider
  doc.setDrawColor(...blue);
  doc.setLineWidth(0.3);
  doc.line(14, 78, W - 14, 78);

  // ── META INFO BOX ──
  doc.setFillColor(240, 245, 252);
  doc.roundedRect(14, 82, W - 28, 28, 3, 3, "F");

  const metaLeft = [
    {
      label: isInvoice ? "Invoice No." : "Quote Ref.",
      value: data.refNo || "—",
    },
    { label: "Project", value: data.projectName || "—" },
    {
      label: "Date",
      value:
        data.date ||
        new Date().toLocaleDateString("en-KE", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
    },
  ];

  const metaRight = [
    { label: "Client", value: data.clientEmail || "—" },
    {
      label: isInvoice ? "Due Date" : "Valid Until",
      value: data.dueDate || "—",
    },
    { label: "Status", value: (data.status || "—").toUpperCase() },
  ];

  metaLeft.forEach((m, i) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...grey);
    doc.text(m.label.toUpperCase(), 20, 89 + i * 7);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...navy);
    doc.text(m.value, 20, 94 + i * 7);
  });

  metaRight.forEach((m, i) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...grey);
    doc.text(m.label.toUpperCase(), W / 2 + 10, 89 + i * 7);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...navy);
    doc.text(m.value, W / 2 + 10, 94 + i * 7);
  });

  // ── ITEMS TABLE ──
  const items = data.items || [];

  if (items.length > 0) {
    doc.autoTable({
      startY: 116,
      head: [["#", "Description", "Qty", "Unit Price", "Amount"]],
      body: items.map((item, i) => {
        const qty = item.qty || 1;
        const unitPrice = item.price ? item.price / qty : 0;
        return [
          i + 1,
          item.name || "—",
          qty,
          "KSh " + unitPrice.toLocaleString(),
          "KSh " + (item.price || 0).toLocaleString(),
        ];
      }),
      headStyles: {
        fillColor: navy,
        textColor: gold,
        fontStyle: "bold",
        fontSize: 8,
        cellPadding: 4,
      },
      bodyStyles: {
        fontSize: 8.5,
        cellPadding: 4,
        textColor: navy,
      },
      alternateRowStyles: {
        fillColor: [245, 248, 252],
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 80 },
        2: { cellWidth: 15, halign: "center" },
        3: { cellWidth: 35, halign: "right" },
        4: { cellWidth: 35, halign: "right", fontStyle: "bold" },
      },
      margin: { left: 14, right: 14 },
      styles: { lineColor: [220, 230, 240], lineWidth: 0.2 },
    });
  } else if (isInvoice) {
    // Invoice with single amount, no line items
    doc.autoTable({
      startY: 116,
      head: [["Description", "Amount"]],
      body: [
        [data.description || "—", "KSh " + (data.amount || 0).toLocaleString()],
      ],
      headStyles: {
        fillColor: navy,
        textColor: gold,
        fontStyle: "bold",
        fontSize: 8,
        cellPadding: 4,
      },
      bodyStyles: {
        fontSize: 8.5,
        cellPadding: 4,
        textColor: navy,
      },
      margin: { left: 14, right: 14 },
      styles: { lineColor: [220, 230, 240], lineWidth: 0.2 },
    });
  }

  // ── TOTAL BOX ──
  const finalY = doc.lastAutoTable?.finalY || 160;
  const total =
    items.length > 0
      ? items.reduce((s, i) => s + (i.price || 0), 0)
      : data.amount || 0;

  doc.setFillColor(...navy);
  doc.roundedRect(W - 80, finalY + 6, 66, 20, 3, 3, "F");
  doc.setTextColor(...grey);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text("TOTAL AMOUNT", W - 47, finalY + 13, { align: "center" });
  doc.setTextColor(...gold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("KSh " + total.toLocaleString(), W - 47, finalY + 21, {
    align: "center",
  });

  // ── NOTES ──
  if (data.notes) {
    doc.setTextColor(...grey);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.text("Notes: " + data.notes, 14, finalY + 34);
  }

  // ── FOOTER ──
  doc.setFillColor(...navy);
  doc.rect(0, H - 18, W, 18, "F");
  doc.setFillColor(...gold);
  doc.rect(0, H - 18, W, 1, "F");
  doc.setTextColor(...grey);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text(PRIMELINE.tagline, W / 2, H - 10, { align: "center" });
  doc.setTextColor(80, 100, 130);
  doc.setFontSize(7);
  doc.text(PRIMELINE.website, W / 2, H - 5, { align: "center" });

  return doc;
}

window.downloadPDF = function (type, data) {
  try {
    const doc = buildPDF(type, data);
    const filename = `${type === "invoice" ? "Invoice" : "Quote"}_${data.refNo || Date.now()}.pdf`;
    doc.save(filename);
  } catch (e) {
    console.error("PDF generation failed:", e);
    alert("Could not generate PDF. Please try again.");
  }
};
// ══════════════════════════════════════
//  CLOUDINARY UPLOAD HELPER
// ══════════════════════════════════════
const CLOUDINARY_CLOUD = "dz9xhjakt";
const CLOUDINARY_PRESET = "primeline_docs";

async function uploadToCloudinary(file, onProgress) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);
    formData.append("folder", "primeline");

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/auto/upload`,
    );

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        resolve({
          url: res.secure_url,
          publicId: res.public_id,
          format: res.format,
          bytes: res.bytes,
        });
      } else {
        reject(new Error("Cloudinary upload failed: " + xhr.statusText));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(formData);
  });
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  setDoc,
  /* FIX: added setDoc — needed for onboarding save */
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBU0OmqvuaHgFs3h5eul60dfJdnwS8Na9M",
  authDomain: "primeline-plumbing.firebaseapp.com",
  projectId: "primeline-plumbing",
  storageBucket: "primeline-plumbing.firebasestorage.app",
  messagingSenderId: "115563321966",
  appId: "1:115563321966:web:a71fca315dc4572e26a47f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;
let msgUnsubscribe = null;
let projectsUnsubscribe = null;

// ── ONBOARDING STATE ──
let obCurrentStep = 0;
let obClientType = "Residential";
let obContactMethods = ["Call"];
let obGoingBack = false;

// ══════════════════════════════════════
//  AUTH
// ══════════════════════════════════════
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    document.getElementById("authGate").style.display = "none";
    document.getElementById("portalWrap").style.display = "block";
    // ─── Dashboard Light/Dark Theme Toggle ───────────────────
    const dashToggle = document.getElementById("dashThemeToggle");
    const dashIcon = document.getElementById("dashThemeIcon");

    if (localStorage.getItem("dash_theme") === "light") {
      document.body.classList.add("light-theme");
      if (dashIcon) dashIcon.classList.replace("fa-sun", "fa-moon");
      if (dashToggle)
        dashToggle.querySelector("span").textContent = "Dark Mode";
    }

    dashToggle?.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("light-theme");
      dashIcon.classList.toggle("fa-sun", !isLight);
      dashIcon.classList.toggle("fa-moon", isLight);
      dashToggle.querySelector("span").textContent = isLight
        ? "Dark Mode"
        : "Light Mode";
      localStorage.setItem("dash_theme", isLight ? "light" : "dark");
    });
    // ─────────────────────────────────────────────────────────
    const params = new URLSearchParams(window.location.search);
    const intent = params.get("intent");
    if (intent === "book" || intent === "request") {
      showPanel("request", document.getElementById("navRequest"));
    }
    document.getElementById("userInitial").textContent = user.email
      .charAt(0)
      .toUpperCase();
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("welcomeSub").textContent =
      "Logged in as " + user.email;

    try {
      const userSnap = await getDoc(doc(db, "users", user.uid));
      const data = userSnap.exists() ? userSnap.data() : {};

      if (data.clientId) {
        const cid = data.clientId;
        document.getElementById("userClientId").textContent = cid;
        document.getElementById("welcomeSub").textContent = "Client ID: " + cid;
        document.getElementById("clientIdDisplay").textContent = cid;
        document.getElementById("clientIdBadge").style.display = "block";
        document.getElementById("obClientIdDisplay").textContent = cid;
      }

      // Pre-fill onboarding fields
      if (data.displayName)
        document.getElementById("obName").value = data.displayName;
      if (data.phone) document.getElementById("obPhone").value = data.phone;
      if (data.address)
        document.getElementById("obAddress").value = data.address;
      if (data.clientType) selectClientType(data.clientType);
      if (data.contactMethods) {
        obContactMethods = data.contactMethods;
        obSyncPills();
      }

      // Show onboarding only on first login
      if (!data.onboardingComplete) {
        loadObPlumber();
        document.getElementById("onboardingOverlay").style.display = "flex";
      }
    } catch (e) {
      console.warn("User doc fetch failed:", e);
    }

    // FIX: removed direct loadProjects() call here — dashboard's onSnapshot handles it
    loadProjects(user.uid);
    loadPanel("dashboard");
    loadMessages(user.uid);
    startBadgeWatchers(user.uid);
  } else {
    window.location.href = "index.html";
  }
});

// ══════════════════════════════════════
//  ONBOARDING
// ══════════════════════════════════════
async function loadObPlumber() {
  try {
    const snap = await getDoc(doc(db, "plumberProfile", "main"));
    if (!snap.exists()) return;
    const p = snap.data();
    document.getElementById("obPlumberName").textContent =
      p.name || "Your Plumber";
    document.getElementById("obPlumberRole").textContent =
      p.specialisation || "Senior Plumbing Technician";
    document.getElementById("obPlumberBadgeId").textContent = p.badgeId || "—";
    const avEl = document.getElementById("obPlumberAvatar");
    if (p.photoUrl) {
      const img = document.createElement("img");
      img.src = p.photoUrl;
      img.alt = p.name;
      img.onerror = () => {
        avEl.textContent = "🔧";
      };
      avEl.innerHTML = "";
      avEl.appendChild(img);
    }
  } catch (e) {}
}

window.obNext = function () {
  document.getElementById("obError").style.display = "none";
  if (obCurrentStep === 1) {
    if (!document.getElementById("obName").value.trim()) {
      obShowError("Please enter your full name.");
      return;
    }
    if (!document.getElementById("obPhone").value.trim()) {
      obShowError("Please enter your phone number.");
      return;
    }
  }
  if (obCurrentStep === 2) {
    if (!document.getElementById("obAddress").value.trim()) {
      obShowError("Please enter your property address.");
      return;
    }
  }
  obGoingBack = false;
  obCurrentStep++;
  obRenderStep();
};

window.obBack = function () {
  obGoingBack = true;
  obCurrentStep--;
  obRenderStep();
};

function obRenderStep() {
  document
    .querySelectorAll(".ob-step")
    .forEach((s) => s.classList.remove("active", "going-back"));
  const current = document.getElementById("obStep" + obCurrentStep);
  if (obGoingBack) current.classList.add("going-back");
  current.classList.add("active");
  document.querySelectorAll(".ob-step-dot").forEach((dot, i) => {
    dot.classList.remove("active", "done");
    if (i === obCurrentStep) dot.classList.add("active");
    if (i < obCurrentStep) dot.classList.add("done");
  });
  document.getElementById("obStepLabel").textContent =
    `Step ${obCurrentStep + 1} of 5`;
  document.getElementById("obError").style.display = "none";
}

function obShowError(msg) {
  const el = document.getElementById("obError");
  el.textContent = msg;
  el.style.display = "block";
}

window.selectClientType = function (type) {
  obClientType = type;
  document
    .getElementById("obTypeResidential")
    .classList.toggle("selected", type === "Residential");
  document
    .getElementById("obTypeCommercial")
    .classList.toggle("selected", type === "Commercial");
};

window.toggleContactPill = function (method) {
  const idx = obContactMethods.indexOf(method);
  if (idx > -1) {
    if (obContactMethods.length === 1) return;
    obContactMethods.splice(idx, 1);
  } else {
    obContactMethods.push(method);
  }
  obSyncPills();
};

function obSyncPills() {
  ["Call", "WhatsApp", "Email"].forEach((m) => {
    const el = document.getElementById("obPill" + m);
    if (el) el.classList.toggle("selected", obContactMethods.includes(m));
  });
}

window.obFinish = async function () {
  const btn = document.getElementById("obFinishBtn");
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

  const uid = auth.currentUser?.uid;
  if (!uid) {
    obShowError("Session expired. Please refresh and log in again.");
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-th-large"></i> Go to Dashboard';
    return;
  }

  const name = document.getElementById("obName").value.trim();
  const phone = document.getElementById("obPhone").value.trim();
  const address = document.getElementById("obAddress").value.trim();

  try {
    await setDoc(
      doc(db, "users", uid),
      {
        displayName: name,
        phone: phone,
        address: address,
        email: auth.currentUser.email,
        clientType: obClientType,
        contactMethods: obContactMethods,
        onboardingComplete: true,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    // Verify the write actually landed before closing
    const verify = await getDoc(doc(db, "users", uid));
    if (!verify.exists() || !verify.data().onboardingComplete) {
      throw new Error("Write did not persist");
    }

    // Update welcome message
    if (name) {
      const sub = document.getElementById("welcomeSub");
      if (sub) sub.textContent = "Welcome, " + name.split(" ")[0] + " 👋";
    }

    // Smooth close
    const overlay = document.getElementById("onboardingOverlay");
    overlay.style.transition = "opacity 0.45s ease";
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.style.display = "none";
    }, 480);
  } catch (e) {
    console.error("Onboarding save failed:", e);
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-th-large"></i> Go to Dashboard';
    obShowError(
      "Could not save your profile. Check your connection and try again.",
    );
  }
};

// ══════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════
const panelTitles = {
  dashboard: "Dashboard",
  projects: "My Projects",
  quotes: "Quotations",
  purchases: "Purchase History",
  invoices: "Invoices",
  messages: "Messages",
  photos: "Progress Photos",
  documents: "Document Vault",
  plumber: "My Plumber",
  notifications: "Notifications",
  request: "Request a Service",
};

window.showPanel = function (name, el) {
  document
    .querySelectorAll(".panel")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".nav-item")
    .forEach((n) => n.classList.remove("active"));
  document.getElementById("panel-" + name).classList.add("active");
  if (el) el.classList.add("active");
  document.getElementById("pageTitle").textContent = panelTitles[name] || name;
  loadPanel(name);
  if (window.innerWidth <= 768) closeMobileSidebar();
  const badgeMap = {
    quotes: "quoteBadge",
    messages: "msgBadge",
    notifications: "notifBadge",
    invoices: "invoicesBadge",
    projects: "projectsBadge",
    photos: "photosBadge",
    documents: "documentsBadge",
    purchases: "purchasesBadge",
  };
  if (badgeMap[name]) setBadge(badgeMap[name], 0);
};

function loadPanel(name) {
  if (!currentUser) return;
  const uid = currentUser.uid;
  const loaders = {
    dashboard: () => loadDashboard(uid),
    projects: () => renderProjectsPanel(uid),
    quotes: () => loadQuotes(uid),
    purchases: () => loadPurchases(uid),
    invoices: () => loadInvoices(uid),
    messages: () => loadMessages(uid),
    photos: () => loadPhotos(uid),
    documents: () => loadDocuments(uid),
    plumber: () => loadPlumber(uid),
    notifications: () => loadNotifications(uid),
  };
  if (loaders[name]) loaders[name]();
}

function setBadge(id, count) {
  const el = document.getElementById(id);
  if (!el) return;
  if (count > 0) {
    el.style.display = "inline";
    el.textContent = count;
  } else {
    el.style.display = "none";
  }
}

function isActive(panel) {
  return document
    .getElementById("panel-" + panel)
    ?.classList.contains("active");
}

// ══════════════════════════════════════
//  BADGE WATCHERS
// ══════════════════════════════════════
function startBadgeWatchers(uid) {
  onSnapshot(
    query(collection(db, "quotes"), where("uid", "==", uid)),
    (snap) => {
      const count = snap.docs.filter(
        (d) => d.data().status === "awaiting",
      ).length;
      setBadge("quoteBadge", count);
    },
  );
  onSnapshot(
    query(collection(db, "notifications"), where("uid", "==", uid)),
    (snap) => {
      const count = snap.docs.filter((d) => !d.data().read).length;
      if (!isActive("notifications")) setBadge("notifBadge", count);
      else setBadge("notifBadge", 0);
    },
  );
  onSnapshot(
    query(collection(db, "invoices"), where("uid", "==", uid)),
    (snap) => {
      const count = snap.docs.filter(
        (d) => d.data().status === "unpaid",
      ).length;
      if (!isActive("invoices")) setBadge("invoicesBadge", count);
      else setBadge("invoicesBadge", 0);
    },
  );
  onSnapshot(
    query(collection(db, "projects"), where("uid", "==", uid)),
    (snap) => {
      const count = snap.docs.filter(
        (d) => d.data().status === "active",
      ).length;
      if (!isActive("projects")) setBadge("projectsBadge", count);
      else setBadge("projectsBadge", 0);
    },
  );
  onSnapshot(
    query(collection(db, "photos"), where("uid", "==", uid)),
    (snap) => {
      if (!isActive("photos"))
        setBadge("photosBadge", snap.size > 0 ? "NEW" : 0);
      else setBadge("photosBadge", 0);
    },
  );
  onSnapshot(
    query(collection(db, "documents"), where("uid", "==", uid)),
    (snap) => {
      if (!isActive("documents"))
        setBadge("documentsBadge", snap.size > 0 ? "NEW" : 0);
      else setBadge("documentsBadge", 0);
    },
  );
  onSnapshot(
    query(collection(db, "purchases"), where("uid", "==", uid)),
    (snap) => {
      if (!isActive("purchases"))
        setBadge("purchasesBadge", snap.size > 0 ? snap.size : 0);
      else setBadge("purchasesBadge", 0);
    },
  );
}

// ══════════════════════════════════════
//  DASHBOARD
// ══════════════════════════════════════
async function loadDashboard(uid) {
  const [purchases, quotes, notifs, projects] = await Promise.all([
    getDocs(query(collection(db, "purchases"), where("uid", "==", uid))),
    getDocs(query(collection(db, "quotes"), where("uid", "==", uid))),
    getDocs(query(collection(db, "notifications"), where("uid", "==", uid))),
    getDocs(query(collection(db, "projects"), where("uid", "==", uid))),
  ]);

  const pendingQuotes = quotes.docs.filter(
    (d) => d.data().status === "awaiting",
  ).length;
  const unreadNotifs = notifs.docs.filter(
    (d) => d.data().read === false,
  ).length;
  const activeCount = projects.docs.filter(
    (d) => d.data().status === "active",
  ).length;

  document.getElementById("statPurchases").textContent = purchases.size;
  document.getElementById("statQuotes").textContent = pendingQuotes;
  document.getElementById("statNotifs").textContent = unreadNotifs;
  document.getElementById("statProjects").textContent = activeCount;

  // Render projects preview
  const sorted = projects.docs.sort(
    (a, b) =>
      (b.data().createdAt?.seconds || 0) - (a.data().createdAt?.seconds || 0),
  );
  document.getElementById("dashProjects").innerHTML =
    sorted.length === 0
      ? '<div class="empty-state"><i class="fas fa-hard-hat"></i><p>No projects yet. Submit a service request to get started.</p></div>'
      : sorted
          .slice(0, 3)
          .map((d) => projectCardHTML(d.id, d.data(), []))
          .join("");

  // Render notifications
  const sortedNotifs = notifs.docs.sort(
    (a, b) =>
      (b.data().createdAt?.seconds || 0) - (a.data().createdAt?.seconds || 0),
  );
  document.getElementById("dashNotifs").innerHTML =
    sortedNotifs.length === 0
      ? '<div class="empty-state"><i class="fas fa-bell"></i><p>No notifications yet.</p></div>'
      : sortedNotifs
          .slice(0, 4)
          .map((d) => notifHTML(d.id, d.data()))
          .join("");
}

// ══════════════════════════════════════
//  PROJECTS — single real-time listener
//  FIX: feeds both dashboard preview AND projects panel
// ══════════════════════════════════════
function loadProjects(uid) {
  // Don't create duplicate listeners
  if (projectsUnsubscribe) return;

  projectsUnsubscribe = onSnapshot(
    query(collection(db, "projects"), where("uid", "==", uid)),
    (snap) => {
      const sorted = snap.docs.sort(
        (a, b) =>
          (b.data().createdAt?.seconds || 0) -
          (a.data().createdAt?.seconds || 0),
      );
      const activeCount = snap.docs.filter(
        (d) => d.data().status === "active",
      ).length;

      // Update stat + badge
      const statEl = document.getElementById("statProjects");
      if (statEl) statEl.textContent = activeCount;
      setBadge("projectsBadge", activeCount);

      // Update dashboard preview
      const dashP = document.getElementById("dashProjects");
      if (dashP) {
        dashP.innerHTML =
          sorted.length === 0
            ? '<div class="empty-state"><i class="fas fa-hard-hat"></i><p>No projects yet. Submit a service request to get started.</p></div>'
            : sorted
                .slice(0, 3)
                .map((d) => projectCardHTML(d.data()))
                .join("");
      }

      // Update projects panel (only if visible)
      const listEl = document.getElementById("projectsList");
      if (listEl && isActive("projects")) {
        listEl.innerHTML =
          sorted.length === 0
            ? '<div class="empty-state"><i class="fas fa-hard-hat"></i><p>No projects yet.</p></div>'
            : sorted.map((d) => projectCardHTML(d.id, d.data(), [])).join("");
      }
    },
    () => {
      const listEl = document.getElementById("projectsList");
      if (listEl)
        listEl.innerHTML =
          '<div class="empty-state"><i class="fas fa-hard-hat"></i><p>Could not load projects.</p></div>';
    },
  );
}

async function renderProjectsPanel(uid) {
  const listEl = document.getElementById("projectsList");
  listEl.innerHTML = '<div class="spinner"></div>';

  const [projectsSnap, photosSnap] = await Promise.all([
    getDocs(query(collection(db, "projects"), where("uid", "==", uid))),
    getDocs(query(collection(db, "photos"), where("uid", "==", uid))),
  ]);

  const sorted = projectsSnap.docs.sort(
    (a, b) =>
      (b.data().createdAt?.seconds || 0) - (a.data().createdAt?.seconds || 0),
  );

  // Group photos by projectId
  const photosByProject = {};
  photosSnap.docs.forEach((d) => {
    const p = d.data();
    if (p.projectId) {
      if (!photosByProject[p.projectId]) photosByProject[p.projectId] = [];
      photosByProject[p.projectId].push(p);
    }
  });

  if (sorted.length === 0) {
    listEl.innerHTML =
      '<div class="empty-state"><i class="fas fa-hard-hat"></i><p>No projects yet.</p></div>';
    return;
  }

  listEl.innerHTML = sorted
    .map((d) => projectCardHTML(d.id, d.data(), photosByProject[d.id] || []))
    .join("");
}

function projectCardHTML(id, p, photos = []) {
  const prog = p.progress || 0;
  const photosSorted = photos.sort(
    (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
  );

  const photosSection =
    photos.length > 0
      ? `
    <div class="project-photos-section">
      <div class="project-photos-label">
        <i class="fas fa-images"></i> Progress Photos
        <span class="project-photos-count">${photos.length} photo${photos.length !== 1 ? "s" : ""}</span>
      </div>
      <div class="project-photos-grid">
        ${photosSorted
          .map(
            (ph) => `
          <div class="project-photo-thumb" onclick="openPhotoLightbox('${ph.url}', '${(ph.caption || "").replace(/'/g, "\\'")}', '${ph.uploadDate || ""}')">
            <img src="${ph.url}" alt="${ph.caption || ""}" loading="lazy" onerror="this.parentElement.style.display='none'">
            ${ph.caption ? `<div class="project-photo-caption">${ph.caption}</div>` : ""}
          </div>`,
          )
          .join("")}
      </div>
    </div>`
      : "";

  return `<div class="project-card">
    <div class="project-header">
      <div>
        <div class="project-title">${p.title || "Untitled Project"}</div>
        <div class="project-meta">${p.location || ""} ${p.location && p.startDate ? "&bull;" : ""} ${p.startDate ? "Started " + p.startDate : ""}</div>
      </div>
      <span class="badge ${p.status || "pending"}">${(p.status || "pending").toUpperCase()}</span>
    </div>
    <div class="progress-bar"><div class="progress-fill" style="width:${prog}%"></div></div>
    <div class="progress-labels"><span>${p.phase || "In progress"}</span><span>${prog}% complete</span></div>
    ${photosSection}
  </div>`;
}

// ══════════════════════════════════════
//  QUOTES
// ══════════════════════════════════════
async function loadQuotes(uid) {
  try {
    const snap = await getDocs(
      query(collection(db, "quotes"), where("uid", "==", uid)),
    );
    const el = document.getElementById("quotesList");
    if (snap.empty) {
      el.innerHTML =
        '<div class="empty-state"><i class="fas fa-file-invoice"></i><p>No quotations yet. Your plumber will send quotes here.</p></div>';
      return;
    }
    const sorted = snap.docs.sort(
      (a, b) =>
        (b.data().createdAt?.seconds || 0) - (a.data().createdAt?.seconds || 0),
    );
    el.innerHTML = sorted.map((d) => quoteCardHTML(d.id, d.data())).join("");
  } catch (e) {
    document.getElementById("quotesList").innerHTML =
      '<div class="empty-state"><i class="fas fa-file-invoice"></i><p>Could not load quotations. Please refresh.</p></div>';
  }
}

function quoteCardHTML(id, q) {
  const items = q.items || [];
  const total = items.reduce((s, i) => s + (i.price || 0), 0);
  const canAct = q.status === "awaiting";

  const itemRows = items.length
    ? items
        .map(
          (i) => `<tr>
        <td style="color:var(--pure-white);font-weight:500;">${i.name || "—"}</td>
        <td style="text-align:center;">${i.qty || 1}</td>
        <td style="text-align:right;color:var(--accent-yellow);font-weight:600;">KSh ${(i.price || 0).toLocaleString()}</td>
      </tr>`,
        )
        .join("")
    : `<tr><td colspan="3" style="text-align:center;color:rgba(203,213,224,0.3);padding:16px;">No items listed</td></tr>`;

  // Build data object for PDF
  const pdfData = JSON.stringify({
    title: q.title || "Quotation",
    refNo: id.slice(-8).toUpperCase(),
    projectName: q.projectName || "",
    date: q.date || "",
    clientEmail: q.clientEmail || "",
    dueDate: "—",
    status: q.status || "awaiting",
    items: q.items || [],
  }).replace(/'/g, "&apos;");

  return `<div class="quote-card">
    <div class="quote-header">
      <div>
        <div class="quote-title">${q.title || "Quotation"}</div>
        <div class="quote-subtitle">${q.projectName || ""} &bull; ${q.date || ""}</div>
      </div>
      <span class="badge ${q.status || "awaiting"}">${(q.status || "awaiting").toUpperCase()}</span>
    </div>
    <table class="quote-items" style="width:100%;border-collapse:collapse;">
      <thead><tr style="border-bottom:1px solid var(--border);">
        <th style="text-align:left;padding:6px 0;font-size:0.68rem;letter-spacing:1px;text-transform:uppercase;color:rgba(61,133,198,0.6);">Item</th>
        <th style="text-align:center;padding:6px 0;font-size:0.68rem;letter-spacing:1px;text-transform:uppercase;color:rgba(61,133,198,0.6);">Qty</th>
        <th style="text-align:right;padding:6px 0;font-size:0.68rem;letter-spacing:1px;text-transform:uppercase;color:rgba(61,133,198,0.6);">Amount</th>
      </tr></thead>
      <tbody>${itemRows}</tbody>
    </table>
    <div class="quote-total"><span>Total</span><span>KSh ${total.toLocaleString()}</span></div>
    <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap;align-items:center;">
      ${
        canAct
          ? `
        <button class="btn green sm" onclick="updateQuote('${id}','approved')"><i class="fas fa-check"></i> Approve</button>
        <button class="btn red sm"   onclick="updateQuote('${id}','declined')"><i class="fas fa-times"></i> Decline</button>`
          : ""
      }
      <button class="btn outline sm" onclick='downloadPDF("quote", ${pdfData})' style="margin-left:auto;">
        <i class="fas fa-file-pdf"></i> Download PDF
      </button>
      ${
        q.attachmentUrl
          ? `
        <a href="${q.attachmentUrl}" target="_blank" class="btn yellow sm">
          <i class="fas fa-paperclip"></i> Official Copy
        </a>`
          : ""
      }
    </div>
  </div>`;
}
window.updateQuote = async function (id, status) {
  await updateDoc(doc(db, "quotes", id), { status });
  loadQuotes(currentUser.uid);
};
window.openPhotoLightbox = function (url, caption, date) {
  // Create lightbox if it doesn't exist
  let lb = document.getElementById("photoLightbox");
  if (!lb) {
    lb = document.createElement("div");
    lb.id = "photoLightbox";
    lb.style.cssText =
      "display:none;position:fixed;inset:0;background:rgba(4,14,26,0.95);z-index:99999;align-items:center;justify-content:center;flex-direction:column;padding:20px;cursor:zoom-out;";
    lb.innerHTML = `
      <button onclick="closePhotoLightbox()" style="position:absolute;top:20px;right:20px;background:rgba(61,133,198,0.15);border:1px solid rgba(61,133,198,0.25);border-radius:50%;width:40px;height:40px;color:#fff;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">
        <i class="fas fa-times"></i>
      </button>
      <img id="lightboxImg" src="" style="max-width:90vw;max-height:78vh;border-radius:12px;object-fit:contain;box-shadow:0 24px 60px rgba(4,14,26,0.8);">
      <div id="lightboxCaption" style="margin-top:14px;color:#fff;font-weight:600;font-size:0.9rem;text-align:center;"></div>
      <div id="lightboxDate" style="margin-top:4px;color:rgba(143,168,196,0.5);font-size:0.78rem;text-align:center;"></div>`;
    lb.onclick = (e) => {
      if (e.target === lb) closePhotoLightbox();
    };
    document.body.appendChild(lb);
  }
  document.getElementById("lightboxImg").src = url;
  document.getElementById("lightboxCaption").textContent = caption || "";
  document.getElementById("lightboxDate").textContent = date || "";
  lb.style.display = "flex";
  document.body.style.overflow = "hidden";
};

window.closePhotoLightbox = function () {
  const lb = document.getElementById("photoLightbox");
  if (lb) lb.style.display = "none";
  document.body.style.overflow = "";
};

// ══════════════════════════════════════
//  PURCHASES
// ══════════════════════════════════════
async function loadPurchases(uid) {
  try {
    const snap = await getDocs(
      query(collection(db, "purchases"), where("uid", "==", uid)),
    );
    const el = document.getElementById("purchasesList");
    const sorted = snap.docs.sort(
      (a, b) =>
        (b.data().createdAt?.seconds || 0) - (a.data().createdAt?.seconds || 0),
    );
    el.innerHTML =
      sorted.length === 0
        ? '<div class="empty-state"><i class="fas fa-shopping-bag"></i><p>No purchases recorded yet.</p></div>'
        : `<div class="table-wrap"><table class="data-table"><thead><tr><th>Item</th><th>Qty</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead><tbody>
            ${sorted
              .map((d) => {
                const p = d.data();
                return `<tr><td>${p.item || "—"}</td><td>${p.qty || 1}</td><td>KSh ${(p.amount || 0).toLocaleString()}</td><td>${p.date || "—"}</td><td><span class="badge ${p.status || "completed"}">${(p.status || "completed").toUpperCase()}</span></td></tr>`;
              })
              .join("")}
           </tbody></table></div>`;
  } catch (e) {
    document.getElementById("purchasesList").innerHTML =
      '<div class="empty-state"><i class="fas fa-shopping-bag"></i><p>Could not load purchases.</p></div>';
  }
}

// ══════════════════════════════════════
//  INVOICES
// ══════════════════════════════════════
async function loadInvoices(uid) {
  try {
    const snap = await getDocs(
      query(collection(db, "invoices"), where("uid", "==", uid)),
    );
    const el = document.getElementById("invoicesList");
    const sorted = snap.docs.sort(
      (a, b) =>
        (b.data().createdAt?.seconds || 0) - (a.data().createdAt?.seconds || 0),
    );

    el.innerHTML =
      sorted.length === 0
        ? '<div class="empty-state"><i class="fas fa-receipt"></i><p>No invoices yet.</p></div>'
        : `<div class="table-wrap"><table class="data-table">
          <thead><tr>
            <th>Invoice #</th><th>Description</th><th>Amount</th>
            <th>Due Date</th><th>Status</th><th>Download</th>
          </tr></thead>
          <tbody>
            ${sorted
              .map((d) => {
                const i = d.data();
                const pdfData = JSON.stringify({
                  title: "Invoice — " + (i.description || ""),
                  refNo: i.invoiceNo || d.id.slice(-8).toUpperCase(),
                  projectName: i.description || "",
                  date: new Date().toLocaleDateString("en-KE", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }),
                  clientEmail: "",
                  dueDate: i.dueDate || "—",
                  status: i.status || "unpaid",
                  amount: i.amount || 0,
                  description: i.description || "",
                }).replace(/'/g, "&apos;");

                return `<tr>
                <td style="color:var(--accent-yellow);font-weight:700;">${i.invoiceNo || "—"}</td>
                <td>${i.description || "—"}</td>
                <td>KSh ${(i.amount || 0).toLocaleString()}</td>
                <td>${i.dueDate || "—"}</td>
                <td><span class="badge ${i.status === "paid" ? "paid" : "unpaid"}">${(i.status || "unpaid").toUpperCase()}</span></td>
                <td style="display:flex;gap:8px;align-items:center;">
                  <button class="btn outline sm" onclick='downloadPDF("invoice", ${pdfData})'>
                    <i class="fas fa-file-pdf"></i> PDF
                  </button>
                  ${
                    i.attachmentUrl
                      ? `
                    <a href="${i.attachmentUrl}" target="_blank" class="btn yellow sm">
                      <i class="fas fa-paperclip"></i>
                    </a>`
                      : ""
                  }
                </td>
              </tr>`;
              })
              .join("")}
          </tbody>
        </table></div>`;
  } catch (e) {
    document.getElementById("invoicesList").innerHTML =
      '<div class="empty-state"><i class="fas fa-receipt"></i><p>Could not load invoices.</p></div>';
  }
}

// ══════════════════════════════════════
//  MESSAGES
// ══════════════════════════════════════
function loadMessages(uid) {
  const thread = document.getElementById("messageThread");
  // FIX: guard prevents duplicate listener — but still set spinner on first call
  if (msgUnsubscribe) {
    thread.scrollTop = thread.scrollHeight;
    return;
  }
  thread.innerHTML = '<div class="spinner"></div>';

  msgUnsubscribe = onSnapshot(
    query(collection(db, "messages"), where("uid", "==", uid)),
    (snap) => {
      if (snap.empty) {
        thread.innerHTML =
          '<div class="empty-state"><i class="fas fa-comments"></i><p>No messages yet. Start the conversation below.</p></div>';
        return;
      }
      const sorted = snap.docs.sort(
        (a, b) =>
          (a.data().createdAt?.seconds || 0) -
          (b.data().createdAt?.seconds || 0),
      );
      const msgPanel = document.getElementById("panel-messages");

      if (msgPanel.classList.contains("active")) {
        snap.docs.forEach((d) => {
          if (d.data().sender === "plumber" && !d.data().seen) {
            updateDoc(doc(db, "messages", d.id), { seen: true });
          }
        });
      }

      thread.innerHTML = sorted
        .map((d) => {
          const m = d.data();
          const isMe = m.sender === "client";
          const seenTick =
            isMe && m.seen
              ? `<span style="color:#22c55e;font-size:0.68rem;margin-left:4px;">✓✓ Seen</span>`
              : isMe
                ? `<span style="color:rgba(143,168,196,0.35);font-size:0.68rem;margin-left:4px;">✓ Sent</span>`
                : "";
          return `<div class="message ${isMe ? "mine" : ""}">
          <div class="msg-avatar">${isMe ? "👤" : "🔧"}</div>
          <div class="msg-body">
            <div class="msg-bubble">${m.text || ""}</div>
            <div class="msg-time">${isMe ? "You" : "Plumber"} &bull; ${m.time || ""}${seenTick}</div>
          </div>
        </div>`;
        })
        .join("");
      thread.scrollTop = thread.scrollHeight;

      const unread = snap.docs.filter(
        (d) => d.data().sender === "plumber" && !d.data().seen,
      ).length;
      if (!msgPanel.classList.contains("active") && unread > 0) {
        setBadge("msgBadge", unread);
      } else {
        setBadge("msgBadge", 0);
      }
    },
  );
}

window.sendMessage = async function () {
  if (!currentUser) return;
  const input = document.getElementById("msgInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  await addDoc(collection(db, "messages"), {
    uid: currentUser.uid,
    sender: "client",
    text,
    time,
    seen: false,
    createdAt: serverTimestamp(),
  });
};

// ══════════════════════════════════════
//  PHOTOS
// ══════════════════════════════════════
async function loadPhotos(uid) {
  try {
    const [photosSnap, projectsSnap] = await Promise.all([
      getDocs(query(collection(db, "photos"), where("uid", "==", uid))),
      getDocs(query(collection(db, "projects"), where("uid", "==", uid))),
    ]);

    const el = document.getElementById("photoGrid");

    if (photosSnap.empty) {
      el.innerHTML =
        '<div class="photo-placeholder"><i class="fas fa-camera"></i><p>No photos yet. Your plumber will upload progress photos here.</p></div>';
      return;
    }

    // Build a project ID → title map
    const projectMap = {};
    projectsSnap.docs.forEach((d) => {
      projectMap[d.id] = d.data().title || "Unnamed Project";
    });

    // Group photos by projectId
    const grouped = {};
    const ungrouped = [];

    photosSnap.docs.forEach((d) => {
      const p = { id: d.id, ...d.data() };
      if (p.projectId && projectMap[p.projectId]) {
        if (!grouped[p.projectId]) grouped[p.projectId] = [];
        grouped[p.projectId].push(p);
      } else {
        ungrouped.push(p);
      }
    });

    let html = "";

    // Render grouped photos
    Object.entries(grouped).forEach(([projectId, photos]) => {
      const sorted = photos.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
      );
      html += `
        <div class="photo-project-group">
          <div class="photo-project-label">
            <i class="fas fa-hard-hat"></i> ${projectMap[projectId]}
            <span class="photo-project-count">${photos.length} photo${photos.length !== 1 ? "s" : ""}</span>
          </div>
          <div class="photo-project-grid">
            ${sorted.map((p) => photoItemHTML(p)).join("")}
          </div>
        </div>`;
    });

    // Render ungrouped photos (uploaded from Photos panel, no projectId)
    if (ungrouped.length > 0) {
      const sorted = ungrouped.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
      );
      html += `
        <div class="photo-project-group">
          <div class="photo-project-label">
            <i class="fas fa-images"></i> General Photos
            <span class="photo-project-count">${ungrouped.length} photo${ungrouped.length !== 1 ? "s" : ""}</span>
          </div>
          <div class="photo-project-grid">
            ${sorted.map((p) => photoItemHTML(p)).join("")}
          </div>
        </div>`;
    }

    el.innerHTML = html;
  } catch (e) {
    document.getElementById("photoGrid").innerHTML =
      '<div class="photo-placeholder"><i class="fas fa-camera"></i><p>Could not load photos.</p></div>';
  }
}

function photoItemHTML(p) {
  return `<div class="photo-item">
    <img src="${p.url}" alt="${p.caption || ""}" loading="lazy" onerror="this.parentElement.style.display='none'">
    <div class="photo-caption">${p.caption || ""}</div>
    ${p.uploadDate ? `<div class="photo-date">${p.uploadDate}</div>` : ""}
  </div>`;
}
// ══════════════════════════════════════
//  DOCUMENTS
// ══════════════════════════════════════
async function loadDocuments(uid) {
  try {
    const snap = await getDocs(
      query(collection(db, "documents"), where("uid", "==", uid)),
    );
    const el = document.getElementById("documentsList");
    let docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    // Populate project filter
    const projects = [
      ...new Set(docs.map((d) => d.projectName).filter(Boolean)),
    ];
    const projSel = document.getElementById("clientDocFilterProj");
    if (projSel) {
      const current = projSel.value;
      projSel.innerHTML =
        '<option value="">All Projects</option>' +
        projects
          .map(
            (p) => `<option ${p === current ? "selected" : ""}>${p}</option>`,
          )
          .join("");
    }

    // Apply filters
    const catFilter =
      document.getElementById("clientDocFilterCat")?.value || "";
    const projFilter =
      document.getElementById("clientDocFilterProj")?.value || "";
    if (catFilter) docs = docs.filter((d) => d.category === catFilter);
    if (projFilter) docs = docs.filter((d) => d.projectName === projFilter);

    docs.sort(
      (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
    );

    if (docs.length === 0) {
      el.innerHTML =
        '<div class="empty-state"><i class="fas fa-folder-open"></i><p>No documents yet.</p></div>';
      return;
    }

    const catColors = {
      Certificate: "#22c55e",
      Invoice: "#e6be0c",
      Permit: "#3d85c6",
      Warranty: "#8b5cf6",
      Quote: "#f97316",
      "Proof of Payment": "#06b6d4",
      "Site Photo": "#ec4899",
      Photo: "#06b6d4",
      Other: "#6a84a0",
    };

    el.innerHTML = docs
      .map((f) => {
        const color = catColors[f.category] || "#6a84a0";
        return `<div class="doc-item">
        <div class="doc-icon" style="background:${color}18;color:${color};">
          <i class="fas fa-file-${f.type === "pdf" ? "pdf" : f.type === "image" ? "image" : "alt"}"></i>
        </div>
        <div class="doc-info">
          <div class="doc-name">${f.name || "Document"}</div>
          <div class="doc-meta">
            <span style="color:${color};">${f.category || "File"}</span>
            ${f.projectName ? " · " + f.projectName : ""}
            · ${f.uploadDate || "—"}
            ${f.uploadedBy === "client" ? ' · <span style="color:rgba(143,168,196,0.4);">You</span>' : ""}
          </div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn outline sm" onclick="previewClientDoc('${f.url}','${(f.name || "").replace(/'/g, "\\'")}','${f.category || ""}','${f.uploadDate || ""}','${f.type || ""}')">
            <i class="fas fa-eye"></i>
          </button>
          <a href="${f.url || "#"}" target="_blank" class="btn outline sm"><i class="fas fa-download"></i></a>
        </div>
      </div>`;
      })
      .join("");
  } catch (e) {
    document.getElementById("documentsList").innerHTML =
      '<div class="empty-state"><i class="fas fa-folder-open"></i><p>Could not load documents.</p></div>';
  }
}
window.uploadClientDoc = async function () {
  if (!currentUser) return;

  const name = document.getElementById("clientDocName").value.trim();
  const category = document.getElementById("clientDocCategory").value;
  const fileEl = document.getElementById("clientDocFile");
  const file = fileEl.files[0];

  if (!name) {
    alert("Please enter a document name.");
    return;
  }
  if (!file) {
    alert("Please choose a file.");
    return;
  }
  if (file.size > 20 * 1024 * 1024) {
    alert("File too large — max 20MB.");
    return;
  }

  const btn = document.getElementById("clientDocBtn");
  btn.disabled = true;
  btn.innerHTML =
    '<i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i>Uploading...';
  document.getElementById("clientDocProgress").style.display = "block";

  try {
    const result = await uploadToCloudinary(file, (pct) => {
      document.getElementById("clientDocPct").textContent = pct + "%";
      document.getElementById("clientDocBar").style.width = pct + "%";
    });

    const uploadDate = new Date().toLocaleDateString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const type = /\.(png|jpe?g|gif|webp)$/i.test(file.name)
      ? "image"
      : file.name.endsWith(".pdf")
        ? "pdf"
        : "other";

    await addDoc(collection(db, "documents"), {
      uid: currentUser.uid,
      name,
      category,
      type,
      url: result.url,
      publicId: result.publicId,
      uploadDate,
      uploadedBy: "client",
      createdAt: serverTimestamp(),
    });

    // Reset form
    document.getElementById("clientDocName").value = "";
    fileEl.value = "";
    document.getElementById("clientDocProgress").style.display = "none";
    document.getElementById("clientDocBar").style.width = "0%";
    btn.disabled = false;
    btn.innerHTML =
      '<i class="fas fa-upload" style="margin-right:8px;"></i>Upload';

    loadDocuments(currentUser.uid);
  } catch (e) {
    console.error("Client upload failed:", e);
    alert("Upload failed. Please check your connection and try again.");
    document.getElementById("clientDocProgress").style.display = "none";
    btn.disabled = false;
    btn.innerHTML =
      '<i class="fas fa-upload" style="margin-right:8px;"></i>Upload';
  }
};

// ══════════════════════════════════════
//  PLUMBER
//  FIX: removed broken onerror with escaped quotes — now uses safe DOM approach
// ══════════════════════════════════════
async function loadPlumber(uid) {
  const el = document.getElementById("plumberCard");
  try {
    const snap = await getDoc(doc(db, "plumberProfile", "main"));
    if (!snap.exists()) {
      el.innerHTML =
        '<div class="empty-state"><i class="fas fa-user-tie"></i><p>Your plumber profile will appear here once set up by the team.</p></div>';
      return;
    }
    const p = snap.data();

    // FIX: build avatar HTML safely without nested quote escaping
    let avatarHTML;
    if (p.photoUrl) {
      avatarHTML = `<img src="${p.photoUrl}" alt="${p.name || "Plumber"}" style="width:76px;height:76px;border-radius:50%;object-fit:cover;border:3px solid rgba(230,190,12,0.4);" id="plumberAvatarImg">`;
    } else {
      avatarHTML = `<i class="fas fa-user-hard-hat"></i>`;
    }

    el.innerHTML = `<div class="plumber-card">
        <div class="plumber-avatar" style="position:relative;overflow:visible;">
          ${avatarHTML}
          <div style="position:absolute;bottom:2px;right:2px;background:#22c55e;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:0.65rem;color:#fff;border:2px solid var(--deep-navy);"><i class="fas fa-check"></i></div>
        </div>
        <div class="plumber-info">
          <div class="plumber-name">${p.name || "Your Plumber"}</div>
          <div class="plumber-role">${p.specialisation || "Senior Plumbing Technician"}${p.experience ? " &bull; " + p.experience : ""}</div>
          ${p.badgeId ? `<div style="display:inline-flex;align-items:center;gap:6px;background:rgba(230,190,12,0.08);border:1px solid rgba(230,190,12,0.2);border-radius:50px;padding:4px 12px;font-size:0.75rem;font-weight:700;color:var(--accent-yellow);letter-spacing:0.5px;margin-bottom:14px;"><i class="fas fa-shield-alt"></i> ${p.badgeId}</div>` : ""}
          <div class="plumber-actions">
            <a href="tel:${p.phone || ""}" class="btn green sm"><i class="fas fa-phone"></i> Call</a>
            <a href="https://wa.me/${(p.phone || "").replace(/\D/g, "")}" class="btn yellow sm" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
            <button class="btn blue sm" onclick="showPanel('messages', null)"><i class="fas fa-comments"></i> Message</button>
          </div>
        </div>
      </div>
      <div class="card"><div class="card-title"><i class="fas fa-star"></i> Rating</div><p style="color:var(--text-dim);font-size:0.85rem;">Rating system coming soon.</p></div>`;

    // FIX: attach onerror via JS after render, avoids broken inline attribute
    const imgEl = document.getElementById("plumberAvatarImg");
    if (imgEl)
      imgEl.onerror = () => {
        imgEl.outerHTML = '<i class="fas fa-user-hard-hat"></i>';
      };
  } catch (e) {
    el.innerHTML =
      '<div class="empty-state"><i class="fas fa-user-tie"></i><p>Could not load plumber info.</p></div>';
  }
}

// ══════════════════════════════════════
//  NOTIFICATIONS
// ══════════════════════════════════════
async function loadNotifications(uid) {
  try {
    const snap = await getDocs(
      query(collection(db, "notifications"), where("uid", "==", uid)),
    );
    const el = document.getElementById("notificationsList");
    const sorted = snap.docs.sort(
      (a, b) =>
        (b.data().createdAt?.seconds || 0) - (a.data().createdAt?.seconds || 0),
    );
    el.innerHTML =
      sorted.length === 0
        ? '<div class="empty-state"><i class="fas fa-bell"></i><p>No notifications yet.</p></div>'
        : sorted.map((d) => notifHTML(d.id, d.data())).join("");
    snap.docs.forEach((d) => {
      if (!d.data().read)
        updateDoc(doc(db, "notifications", d.id), { read: true });
    });
    setBadge("notifBadge", 0);
  } catch (e) {
    document.getElementById("notificationsList").innerHTML =
      '<div class="empty-state"><i class="fas fa-bell"></i><p>Could not load notifications.</p></div>';
  }
}

function notifHTML(id, n) {
  const colors = {
    info: "#3d85c6",
    success: "#27ae60",
    warning: "#e67e22",
    quote: "#f1c40f",
  };
  const icons = {
    info: "fa-info-circle",
    success: "fa-check-circle",
    warning: "fa-exclamation-triangle",
    quote: "fa-file-invoice",
  };
  const type = n.type || "info";
  return `<div class="notif-item ${n.read ? "" : "unread"}">
      <div class="notif-icon" style="background:${colors[type]}18;color:${colors[type]};"><i class="fas ${icons[type]}"></i></div>
      <div class="notif-body">
        <div class="notif-title">${n.title || "Update"}</div>
        <div class="notif-text">${n.body || ""}</div>
        <div class="notif-time">${n.time || ""}</div>
      </div>
    </div>`;
}

// ══════════════════════════════════════
//  REQUEST SERVICE
// ══════════════════════════════════════
window.submitRequest = async function () {
  if (!currentUser) return;
  const service = document.getElementById("reqService").value;
  const desc = document.getElementById("reqDesc").value;
  if (!service || !desc) {
    alert("Please fill in the service type and description.");
    return;
  }
  await addDoc(collection(db, "requests"), {
    uid: currentUser.uid,
    email: currentUser.email,
    service,
    priority: document.getElementById("reqPriority").value,
    address: document.getElementById("reqAddress").value,
    preferredDate: document.getElementById("reqDate").value,
    description: desc,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  document.getElementById("requestForm").style.display = "none";
  document.getElementById("requestSuccess").style.display = "block";
};

// ══════════════════════════════════════
//  LOGOUT + SIDEBAR
// ══════════════════════════════════════
window.doLogout = async function () {
  if (msgUnsubscribe) msgUnsubscribe(); // FIX: was missing projectsUnsubscribe cleanup
  if (projectsUnsubscribe) projectsUnsubscribe();
  await signOut(auth);
  window.location.href = "index.html";
};

window.toggleSidebar = function () {
  const sb = document.getElementById("sidebar");
  if (window.innerWidth <= 768) {
    sb.classList.toggle("mobile-open");
    document.getElementById("sidebarOverlay").classList.toggle("visible");
  } else {
    sb.classList.toggle("collapsed");
  }
};

window.closeMobileSidebar = function () {
  document.getElementById("sidebar").classList.remove("mobile-open");
  document.getElementById("sidebarOverlay").classList.remove("visible");
};
window.previewClientDoc = function (url, name, category, date, type) {
  document.getElementById("clientPreviewName").textContent = name || "Document";
  document.getElementById("clientPreviewMeta").textContent =
    (category || "") + (date ? " · " + date : "");
  document.getElementById("clientPreviewDownload").href = url;

  const body = document.getElementById("clientPreviewBody");
  if (type === "image") {
    body.innerHTML = `<img src="${url}" style="max-width:100%;border-radius:10px;">`;
  } else if (type === "pdf") {
    body.innerHTML = `<iframe src="${url}" style="width:100%;height:60vh;border:none;border-radius:10px;"></iframe>`;
  } else {
    body.innerHTML = `<div class="empty-state"><i class="fas fa-file-alt"></i><p>Preview not available. Use the download button above.</p></div>`;
  }

  document.getElementById("clientDocPreviewModal").style.display = "flex";
};
window.closeClientDocPreview = function () {
  document.getElementById("clientDocPreviewModal").style.display = "none";
  document.getElementById("clientPreviewBody").innerHTML = "";
};
