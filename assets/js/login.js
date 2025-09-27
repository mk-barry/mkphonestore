// alert(window.location.href);

/* -------------------------
   Gestion des comptes
   ------------------------- */
const STORAGE_KEY = "loggedUser";
const ACCOUNTS_KEY = "accounts";

function getAccounts() {
  const raw = localStorage.getItem(ACCOUNTS_KEY);
  if (raw) return JSON.parse(raw);
  return [
    { email: "saury@chill.com", password: "1234", name: "Saurelle Kengne" },
    { email: "mkbarry@chill.com", password: "azerty", name: "Barry Mbatswe" },
    { email: "orlebb@chill.com", password: "mnok", name: "Orleane Medjoussi" }
  ];
}

function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function findAccountByEmail(email) {
  return getAccounts().find(acc => acc.email.toLowerCase() === email.toLowerCase());
}

function saveLoggedUser(account) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: account.email, name: account.name }));
}

function clearLoggedUser() {
  localStorage.removeItem(STORAGE_KEY);
}

function getLoggedUser() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

/* -------------------------
   LOGIN (FR + EN)
   ------------------------- */
function handleLogin(formId, emailId, passwordId, messageId) {
  const form = document.getElementById(formId);
  const message = document.getElementById(messageId);

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById(emailId).value.trim();
    const password = document.getElementById(passwordId).value;

    const account = findAccountByEmail(email);

    if (!account) {
      message.textContent = "Email not found / Email introuvable";
      message.className = "message error";
      message.style.display = "block";
      return;
    }

    if (account.password === password) {
      saveLoggedUser(account);
      message.textContent = `Welcome ${account.name}, redirection...`;
      message.className = "message success";
      message.style.display = "block";
      setTimeout(() => window.location.href = "../../account.html", 900);
    } else {
      message.textContent = "Wrong password / Mot de passe incorrect";
      message.className = "message error";
      message.style.display = "block";
    }
  });
}

handleLogin("loginFormFr", "emailFr", "passwordFr", "messageFr");
handleLogin("loginFormEn", "emailEn", "passwordEn", "messageEn");

/* -------------------------
   REGISTER (FR + EN)
   ------------------------- */
function handleRegister(formId, nameId, emailId, passwordId, messageId) {
  const form = document.getElementById(formId);
  const message = document.getElementById(messageId);

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById(nameId).value.trim();
    const email = document.getElementById(emailId).value.trim();
    const password = document.getElementById(passwordId).value;

    let accounts = getAccounts();

    if (findAccountByEmail(email)) {
      message.textContent = "Email already used / Email déjà utilisé";
      message.className = "message error";
      message.style.display = "block";
      return;
    }

    const newAccount = { email, password, name };
    accounts.push(newAccount);
    saveAccounts(accounts);
    saveLoggedUser(newAccount);

    message.textContent = `Account created / Compte créé. Welcome ${name} !`;
    message.className = "message success";
    message.style.display = "block";
    setTimeout(() => window.location.href = "../../account.html", 900);
  });
}

handleRegister("registerFormFr", "nameFr", "regEmailFr", "regPasswordFr", "registerMessageFr");
handleRegister("registerFormEn", "nameEn", "regEmailEn", "regPasswordEn", "registerMessageEn");

/* -------------------------
   ACCOUNT PAGE
   ------------------------- */
const welcomeEn = document.getElementById("welcome-en");
const welcomeFr = document.getElementById("welcome-fr");
// const accountInfoFr = document.getElementById("accountInfofr");
// const accountInfoEn = document.getElementById("accountInfoen");
const logoutFr = document.getElementById("logoutfr");
const logoutEn = document.getElementById("logouten");


if (welcomeFr || accountInfoFr || logoutFr) {
  const user = getLoggedUser();
  if (!user) {
    window.location.href = "login.html";
  } else {
    welcomeFr.textContent = `Bienvenue, ${user.name} !`;
    // accountInfoFr.textContent = `Email : ${user.email}`;
  }
  if (logoutFr) {
    logoutFr.addEventListener("click", () => {
      clearLoggedUser();
      window.location.href = "index.html";
    });
  }
}

if (welcomeEn || accountInfoEn || logoutEn) {
  const user = getLoggedUser();
  if (!user) {
    window.location.href = "login.html";
  } else {
    welcomeEn.textContent = `Welcome, ${user.name} !`;
    // accountInfoEn.textContent = `Email : ${user.email}`;
  }
  if (logoutEn) {
    logoutEn.addEventListener("click", () => {
      clearLoggedUser();
      window.location.href = "index.html";
    });
  }
}

function backtohome() {
  const backen = document.getElementById("back-en");
  const backfr = document.getElementById("back-fr");

    backen.addEventListener("click", () => {
      window.location.href = "../../index.html";
    });

    backfr.addEventListener("click", () => {
      window.location.href = "../../index.html";
    });
}