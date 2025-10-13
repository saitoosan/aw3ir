// Lecture des paramètres GET envoyés via l’URL
const params = new URLSearchParams(document.location.search);

// Fonction pratique pour récupérer une valeur propre
function getValue(key) {
  const v = params.get(key);
  return v ? decodeURIComponent(v).trim() : "";
}

// Format de date en JJ/MM/AAAA
function formatDateFR(iso) {
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : iso;
}

// Récupération des données
const name = getValue("name");
const firstname = getValue("firstname");
const birthday = getValue("birthday");
const address = getValue("address");
const email = getValue("email");

// Insertion dans le DOM
document.getElementById("name").textContent = name;
document.getElementById("firstname").textContent = firstname;
document.getElementById("birthday").textContent = formatDateFR(birthday);

// Adresse cliquable vers Google Maps
const addressEl = document.getElementById("address");
if (address) {
  addressEl.textContent = address;
  addressEl.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

// Email cliquable
const emailEl = document.getElementById("email");
if (email) {
  emailEl.textContent = email;
  emailEl.href = `mailto:${email}`;
}
