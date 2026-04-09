// ============================================================
//  Primeline Plumbing Solutions — Auth Module (Firebase)
//  Handles: Login, Register, Forgot Password, Auth State,
//           Real-time Validation, Password Strength Meter
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  runTransaction,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ─── Firebase Config ─────────────────────────────────────────
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

// ─── State ───────────────────────────────────────────────────
let isRegisterMode = false;

// ─── Restore saved email on page load ────────────────────────
const savedEmail = localStorage.getItem("pl_saved_email");
if (savedEmail) {
  const emailInput = document.getElementById("authEmail");
  if (emailInput) {
    emailInput.value = savedEmail;
    const rememberMe = document.getElementById("rememberMe");
    if (rememberMe) rememberMe.checked = true;
  }
}
// ─── Light / Dark Theme Toggle ────────────────────────────────
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Remember preference
if (localStorage.getItem("pl_theme") === "dark") {
  document.body.classList.add("dark-theme");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

themeToggle?.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  themeIcon.classList.toggle("fa-moon", !isDark);
  themeIcon.classList.toggle("fa-sun", isDark);
  localStorage.setItem("pl_theme", isDark ? "dark" : "light");
});

// ─── Auth State Listener ─────────────────────────────────────
onAuthStateChanged(auth, (user) => {
  const btn = document.getElementById("headerLoginBtn");
  if (!btn) return;

  if (user) {
    window._plUserLoggedIn = true;
    btn.title = "Go to My Dashboard";
    btn.innerHTML = `
      <i class="fas fa-user-circle"></i>
      <span class="dashboard-label">Dashboard</span>
    `;
    btn.classList.add("logged-in");
    btn.onclick = () => (window.location.href = "dashboard.html");
  } else {
    window._plUserLoggedIn = false;
    btn.title = "My Account";
    btn.innerHTML = `<i class="fas fa-user-circle"></i>`;
    btn.classList.remove("logged-in");
    btn.onclick = window.openLoginModal;
  }
});

// ─── Modal Open / Close ──────────────────────────────────────
window.openLoginModal = function () {
  const modal = document.getElementById("loginModal");
  if (!modal) return;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  setTimeout(() => document.getElementById("authEmail")?.focus(), 320);
};

window.closeLoginModal = function () {
  const modal = document.getElementById("loginModal");
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "";
  resetAuthForm();
};

// Close on backdrop click
document.getElementById("loginModal")?.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) window.closeLoginModal();
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") window.closeLoginModal();
});

// ─── Toggle Register / Login Mode ────────────────────────────
window.toggleAuthMode = function (e) {
  e.preventDefault();
  isRegisterMode = !isRegisterMode;

  document.getElementById("authTitle").textContent = isRegisterMode
    ? "Create Account"
    : "Customer Login";
  document.getElementById("authSubtitle").textContent = isRegisterMode
    ? "Join Primeline Plumbing Solutions"
    : "Welcome back to Primeline Plumbing Solutions";
  document.getElementById("authSubmitBtn").textContent = isRegisterMode
    ? "Create Account"
    : "Login";
  document.getElementById("nameGroup").style.display = isRegisterMode
    ? "flex"
    : "none";
  document.getElementById("loginOptions").style.display = isRegisterMode
    ? "none"
    : "flex";
  document.getElementById("authToggleText").innerHTML = isRegisterMode
    ? 'Already have an account? <a href="#" onclick="toggleAuthMode(event)">Login here</a>'
    : 'Don\'t have an account? <a href="#" onclick="toggleAuthMode(event)">Register here</a>';

  // Show/hide strength meter and confirm password field
  const strengthBlock = document.getElementById("passwordStrengthBlock");
  const confirmGroup = document.getElementById("confirmPasswordGroup");
  if (strengthBlock)
    strengthBlock.style.display = isRegisterMode ? "block" : "none";
  if (confirmGroup)
    confirmGroup.style.display = isRegisterMode ? "flex" : "none";

  clearAuthError();
  clearAllFieldErrors();
  document.getElementById("authForm").reset();

  if (!isRegisterMode && savedEmail) {
    document.getElementById("authEmail").value = savedEmail;
    const rememberMe = document.getElementById("rememberMe");
    if (rememberMe) rememberMe.checked = true;
  }
};

// ─── Handle Login / Register Submit ──────────────────────────
window.handleAuthSubmit = async function (e) {
  e.preventDefault();

  const name = document.getElementById("authName")?.value.trim();
  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;
  const submitBtn = document.getElementById("authSubmitBtn");

  // Run full validation before submitting
  const confirm = document.getElementById("authConfirmPassword")?.value;
  let valid = true;
  if (isRegisterMode && !validateName(name)) valid = false;
  if (!validateEmail(email)) valid = false;
  if (!validatePassword(password)) valid = false;
  if (isRegisterMode && !validateConfirmPassword(confirm, password))
    valid = false;
  if (!valid) return;

  clearAuthError();
  setSubmitLoading(submitBtn, true);

  try {
    if (isRegisterMode) {
      await registerUser(email, password, name);
    } else {
      await loginUser(email, password);
    }
    const intent = sessionStorage.getItem("pl_intent") || "";
    sessionStorage.removeItem("pl_intent");
    window.location.href = intent
      ? `dashboard.html?intent=${intent}`
      : "dashboard.html";
  } catch (err) {
    showAuthError(friendlyError(err.code));
  } finally {
    setSubmitLoading(submitBtn, false);
  }
};

// ─── Register ────────────────────────────────────────────────
async function registerUser(email, password, name) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const uid = userCredential.user.uid;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.toLocaleString("en", { month: "short" }).toUpperCase();
  const day = String(now.getDate()).padStart(2, "0");

  const counterRef = doc(db, "meta", "clientCounter");

  const clientId = await runTransaction(db, async (transaction) => {
    const counterSnap = await transaction.get(counterRef);
    const nextNumber =
      (counterSnap.exists() ? counterSnap.data().count : 0) + 1;
    transaction.set(counterRef, { count: nextNumber });
    return `PL-${year}-${month}-${day}-${String(nextNumber).padStart(5, "0")}`;
  });

  await setDoc(doc(db, "users", uid), {
    name: name,
    email: email,
    uid: uid,
    clientId: clientId,
    createdAt: serverTimestamp(),
  });
}

// ─── Login ───────────────────────────────────────────────────
async function loginUser(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
  const rememberMe = document.getElementById("rememberMe");
  if (rememberMe?.checked) {
    localStorage.setItem("pl_saved_email", email);
  } else {
    localStorage.removeItem("pl_saved_email");
  }
}

// ─── Logout ──────────────────────────────────────────────────
window.handleLogout = async function () {
  await signOut(auth);
  localStorage.removeItem("pl_saved_email");
  window.location.href = "index.html";
};

// ─── Forgot Password ─────────────────────────────────────────
window.handleForgotPassword = async function (e) {
  e.preventDefault();

  const email = document.getElementById("authEmail").value.trim();
  const emailInput = document.getElementById("authEmail");

  if (!email) {
    emailInput.classList.add("input-error");
    emailInput.placeholder = "Enter your email first";
    emailInput.focus();
    setTimeout(() => {
      emailInput.classList.remove("input-error");
      emailInput.placeholder = "Email Address";
    }, 3000);
    showAuthError("Please enter your email address above first.", "warning");
    return;
  }

  const link = e.target;
  link.style.pointerEvents = "none";
  link.textContent = "Sending…";

  try {
    await sendPasswordResetEmail(auth, email);
    showAuthError(
      "Reset email sent! Check your inbox (and spam folder).",
      "success",
    );
  } catch (err) {
    showAuthError(friendlyError(err.code));
  } finally {
    link.style.pointerEvents = "";
    link.textContent = "Forgot password?";
  }
};

// ─── Password Visibility Toggle ──────────────────────────────
window.togglePasswordVisibility = function () {
  const input = document.getElementById("authPassword");
  const icon = document.getElementById("togglePasswordIcon");
  if (!input || !icon) return;

  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  icon.classList.toggle("fa-eye", !isHidden);
  icon.classList.toggle("fa-eye-slash", isHidden);
  input.focus();
};

window.toggleConfirmPasswordVisibility = function () {
  const input = document.getElementById("authConfirmPassword");
  const icon = document.getElementById("toggleConfirmPasswordIcon");
  if (!input || !icon) return;

  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  icon.classList.toggle("fa-eye", !isHidden);
  icon.classList.toggle("fa-eye-slash", isHidden);
  input.focus();
};

// ============================================================
//  REAL-TIME VALIDATION
// ============================================================

// ─── Name Validation ─────────────────────────────────────────
function validateName(value) {
  const field = document.getElementById("authName");
  if (!isRegisterMode) return true;
  if (!value || value.length < 2) {
    setFieldError(
      field,
      "Please enter your full name (at least 2 characters).",
    );
    return false;
  }
  if (!/^[a-zA-Z\s'-]+$/.test(value)) {
    setFieldError(
      field,
      "Name can only contain letters, spaces, hyphens, or apostrophes.",
    );
    return false;
  }
  setFieldSuccess(field);
  return true;
}

// ─── Email Validation ────────────────────────────────────────
function validateEmail(value) {
  const field = document.getElementById("authEmail");
  if (!value) {
    setFieldError(field, "Email address is required.");
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    setFieldError(field, "Please enter a valid email address.");
    return false;
  }
  setFieldSuccess(field);
  return true;
}

// ─── Password Validation ─────────────────────────────────────
function validatePassword(value) {
  const field = document.getElementById("authPassword");
  if (!value) {
    setFieldError(field, "Password is required.");
    return false;
  }
  if (value.length < 6) {
    setFieldError(field, "Password must be at least 6 characters.");
    return false;
  }
  setFieldSuccess(field);
  return true;
}

// ─── Confirm Password Validation ─────────────────────────────
function validateConfirmPassword(value, original) {
  const field = document.getElementById("authConfirmPassword");
  if (!isRegisterMode) return true;
  if (!value) {
    setFieldError(field, "Please confirm your password.");
    return false;
  }
  if (value !== original) {
    setFieldError(field, "Passwords do not match.");
    return false;
  }
  setFieldSuccess(field);
  return true;
}

// ─── Password Strength Meter ─────────────────────────────────
function getPasswordStrength(password) {
  let score = 0;
  if (!password) return { score: 0, label: "", color: "" };

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: "Weak", color: "#e74c3c" };
  if (score <= 2) return { score: 2, label: "Fair", color: "#e67e22" };
  if (score <= 3) return { score: 3, label: "Good", color: "#f1c40f" };
  if (score <= 4) return { score: 4, label: "Strong", color: "#2ecc71" };
  return { score: 5, label: "Very Strong", color: "#27ae60" };
}

function updateStrengthMeter(password) {
  const bar = document.getElementById("strengthBar");
  const label = document.getElementById("strengthLabel");
  if (!bar || !label) return;

  if (!password) {
    bar.style.width = "0%";
    bar.style.background = "";
    label.textContent = "";
    return;
  }

  const { score, label: text, color } = getPasswordStrength(password);
  const pct = (score / 5) * 100;

  bar.style.width = `${pct}%`;
  bar.style.background = color;
  label.textContent = text;
  label.style.color = color;
}

// ─── Attach Real-time Listeners ──────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Name — validate on blur, clear error on input
  const nameInput = document.getElementById("authName");
  nameInput?.addEventListener("blur", () => {
    if (isRegisterMode) validateName(nameInput.value.trim());
  });
  nameInput?.addEventListener("input", () => clearFieldError(nameInput));

  // Email — validate on blur, clear on input
  const emailInput = document.getElementById("authEmail");
  emailInput?.addEventListener("blur", () =>
    validateEmail(emailInput.value.trim()),
  );
  emailInput?.addEventListener("input", () => clearFieldError(emailInput));

  // Password — validate on blur + update strength meter on every keystroke
  const passwordInput = document.getElementById("authPassword");
  passwordInput?.addEventListener("input", () => {
    clearFieldError(passwordInput);
    if (isRegisterMode) updateStrengthMeter(passwordInput.value);
    // Re-validate confirm if already filled
    const confirmInput = document.getElementById("authConfirmPassword");
    if (isRegisterMode && confirmInput?.value) {
      validateConfirmPassword(confirmInput.value, passwordInput.value);
    }
  });
  passwordInput?.addEventListener("blur", () =>
    validatePassword(passwordInput.value),
  );

  // Confirm password — validate on blur and live on input
  const confirmInput = document.getElementById("authConfirmPassword");
  confirmInput?.addEventListener("input", () => {
    clearFieldError(confirmInput);
    if (isRegisterMode && confirmInput.value) {
      validateConfirmPassword(confirmInput.value, passwordInput?.value);
    }
  });
  confirmInput?.addEventListener("blur", () => {
    if (isRegisterMode)
      validateConfirmPassword(confirmInput.value, passwordInput?.value);
  });
});
// Password toggle listeners
document
  .getElementById("authPassword")
  ?.parentElement?.querySelector(".password-toggle-btn")
  ?.addEventListener("click", window.togglePasswordVisibility);

document
  .getElementById("authConfirmPassword")
  ?.parentElement?.querySelector(".password-toggle-btn")
  ?.addEventListener("click", window.toggleConfirmPasswordVisibility);

// ============================================================
//  FIELD STATE HELPERS
// ============================================================

function setFieldError(input, message) {
  if (!input) return;
  input.classList.remove("field-valid");
  input.classList.add("field-invalid");

  const group = input.closest(".login-input-group");
  if (!group) return;

  // Place hint AFTER the group, not inside it — prevents input from shrinking
  let hint = group.nextElementSibling?.classList.contains("field-hint")
    ? group.nextElementSibling
    : null;
  if (!hint) {
    hint = document.createElement("span");
    group.insertAdjacentElement("afterend", hint);
  }
  hint.className = "field-hint field-hint--error";
  hint.textContent = message;
}

function setFieldSuccess(input) {
  if (!input) return;
  input.classList.remove("field-invalid");
  input.classList.add("field-valid");

  const group = input.closest(".login-input-group");
  if (group?.nextElementSibling?.classList.contains("field-hint")) {
    group.nextElementSibling.remove();
  }
}

function clearFieldError(input) {
  if (!input) return;
  input.classList.remove("field-invalid", "field-valid");
  const group = input.closest(".login-input-group");
  if (group?.nextElementSibling?.classList.contains("field-hint")) {
    group.nextElementSibling.remove();
  }
}

function clearAllFieldErrors() {
  ["authName", "authEmail", "authPassword", "authConfirmPassword"].forEach(
    (id) => {
      const el = document.getElementById(id);
      if (el) clearFieldError(el);
    },
  );
  updateStrengthMeter("");
}

// ============================================================
//  GENERAL HELPERS
// ============================================================

function showAuthError(message, type = "error") {
  const box = document.getElementById("authError");
  if (!box) return;
  box.className = "auth-error-box";
  if (type === "warning") box.classList.add("auth-error-box--warning");
  if (type === "success") box.classList.add("auth-error-box--success");
  box.textContent = message;
  box.style.display = "block";
}

function clearAuthError() {
  const box = document.getElementById("authError");
  if (!box) return;
  box.style.display = "none";
  box.textContent = "";
}

function setSubmitLoading(btn, isLoading) {
  btn.disabled = isLoading;
  if (isLoading) {
    btn.dataset.originalText = btn.textContent;
    btn.textContent = isRegisterMode ? "Creating account…" : "Logging in…";
  } else {
    btn.textContent =
      btn.dataset.originalText || (isRegisterMode ? "Create Account" : "Login");
  }
}

function resetAuthForm() {
  isRegisterMode = false;
  document.getElementById("authTitle").textContent = "Customer Login";
  document.getElementById("authSubtitle").textContent =
    "Welcome back to Primeline Plumbing Solutions";
  document.getElementById("authSubmitBtn").textContent = "Login";
  document.getElementById("nameGroup").style.display = "none";
  document.getElementById("loginOptions").style.display = "flex";
  document.getElementById("authToggleText").innerHTML =
    'Don\'t have an account? <a href="#" onclick="toggleAuthMode(event)">Register here</a>';

  const strengthBlock = document.getElementById("passwordStrengthBlock");
  const confirmGroup = document.getElementById("confirmPasswordGroup");
  if (strengthBlock) strengthBlock.style.display = "none";
  if (confirmGroup) confirmGroup.style.display = "none";

  document.getElementById("authForm").reset();
  clearAuthError();
  clearAllFieldErrors();

  if (savedEmail) {
    document.getElementById("authEmail").value = savedEmail;
    const rememberMe = document.getElementById("rememberMe");
    if (rememberMe) rememberMe.checked = true;
  }
}
// ─── Auth Guard — requires login before proceeding ────────────
window.requireAuth = function (intent) {
  if (window._plUserLoggedIn) {
    // Already logged in — go straight to dashboard with intent
    window.location.href = `dashboard.html?intent=${intent}`;
    return;
  }

  // Not logged in — store intent and open login modal
  sessionStorage.setItem("pl_intent", intent);

  // Switch modal to register mode since they're new
  isRegisterMode = false;
  window.openLoginModal();

  // Show a helpful message inside the modal
  const subtitle = document.getElementById("authSubtitle");
  if (subtitle) {
    subtitle.textContent = "Create an account or log in to continue.";
  }
};

// ─── Friendly Firebase Error Messages ────────────────────────
function friendlyError(code) {
  const errors = {
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Invalid email or password. Please try again.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/too-many-requests":
      "Too many attempts. Please wait a moment and try again.",
    "auth/network-request-failed":
      "Network error. Please check your connection.",
    "auth/user-disabled": "This account has been disabled. Contact support.",
    "auth/popup-closed-by-user": "Sign-in was cancelled.",
  };
  return errors[code] ?? "Something went wrong. Please try again.";
}
