// js/form-validation.js

// ---------- utils ----------
function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  function showError(messages) {
    const el = document.getElementById("errorModal");
    const body = el.querySelector(".modal-body");
    body.innerHTML = Array.isArray(messages)
      ? `<ul class="mb-0">${messages.map(m=>`<li>${m}</li>`).join("")}</ul>`
      : `<p class="mb-0">${messages}</p>`;
    bootstrap.Modal.getOrCreateInstance(el).show();
  }
  function setSuccess(visible, text = "Contact ajouté avec succès.") {
    const ok = document.getElementById("success");
    ok.textContent = text;
    ok.classList.toggle("d-none", !visible);
  }
  
  // ---------- compteurs (type demandé par l’énoncé) ----------
  function calcNbChar(id) {
    const input = document.getElementById(id);
    const span = document.getElementById(`nb-${id}`);
    if (input && span) span.textContent = `${input.value.length} car.`;
  }
  
  // ---------- liste / tableau ----------
  function displayContactList() {
    const contactListString = localStorage.getItem("contactList");
    const contactList = contactListString ? JSON.parse(contactListString) : [];
    const tbody = document.querySelector("table tbody");
    const count = document.getElementById("count");
    tbody.innerHTML = "";
    count.textContent = contactList.length;
  
    for (const contact of contactList) {
      // rendu conforme à la capture : lien sur adresse (coordonnées) + mail cliquable
      const addrCell = contact.adress
        ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.adress)}" target="_blank" rel="noopener">${contact.adress}</a>`
        : "";
      const mailCell = contact.mail
        ? `<a href="mailto:${contact.mail}">${contact.mail}</a>`
        : "";
  
      tbody.innerHTML += `
        <tr>
          <td>${contact.name || ""}</td>
          <td>${contact.firstname || ""}</td>
          <td>${contact.date || ""}</td>
          <td>${addrCell}</td>
          <td>${mailCell}</td>
        </tr>`;
    }
  }
  
  // ---------- GPS : mappe le bouton sur getLocation() (gps.js du prof) ----------
  function bindGPS() {
    const btn = document.getElementById("btnGPS");
    if (!btn) return;
  
    btn.addEventListener("click", () => {
      if (typeof getLocation !== "function") {
        showError("getLocation() introuvable (vérifie l’ordre des scripts).");
        return;
      }
  
      // On veut 2 choses : (1) laisser gps.js injecter la carte dans #map,
      // (2) écrire les coordonnées dans le champ Adresse.
      const _origShowPosition = window.showPosition;
      const _origShowError = window.showError;
  
      window.showPosition = function (position) {
        try {
          if (typeof _origShowPosition === "function") _origShowPosition(position);
          // Ecrit "lat,lon" dans l’input adresse (comme sur la capture)
          const latlon = position.coords.latitude + "," + position.coords.longitude;
          const adresse = document.getElementById("adresse");
          adresse.value = latlon;
          calcNbChar("adresse");
        } finally {
          // on laisse la carte inline (pas de modal)
          window.showPosition = _origShowPosition;
          window.showError = _origShowError;
        }
      };
  
      window.showError = function (err) {
        try {
          if (typeof _origShowError === "function") _origShowError(err);
        } finally {
          window.showPosition = _origShowPosition;
          window.showError = _origShowError;
        }
      };
  
      getLocation(); // déclenche la géoloc
    });
  }
  
  // ---------- submit ----------
  window.onload = function () {
    // init compteurs
    ["nom","prenom","dateNaissance","adresse","email"].forEach(id => calcNbChar(id));
  
    // afficher la liste existante
    displayContactList();
  
    // bouton reset
    const reset = document.getElementById("btnReset");
    if (reset) {
      reset.addEventListener("click", () => {
        contactStore.reset();   // store.js du prof
        displayContactList();
        setSuccess(false);
      });
    }
  
    // GPS
    bindGPS();
  
    // soumission
    const form = document.getElementById("formulaire");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const nom = document.getElementById("nom").value.trim();
      const prenom = document.getElementById("prenom").value.trim();
      const dateNaissance = document.getElementById("dateNaissance").value;
      const adresse = document.getElementById("adresse").value.trim();
      const email = document.getElementById("email").value.trim();
  
      const errs = [];
      if (nom.length < 5) errs.push("Nom : 5 caractères minimum.");
      if (prenom.length < 5) errs.push("Prénom : 5 caractères minimum.");
      if (!dateNaissance) errs.push("Date de naissance manquante.");
      else {
        const d = new Date(dateNaissance);
        if (d.getTime() > Date.now()) errs.push("La date de naissance ne peut pas être dans le futur.");
      }
      if (adresse.length < 5) errs.push("Adresse : 5 caractères minimum.");
      if (!validateEmail(email)) errs.push("Email invalide.");
  
      if (errs.length) {
        setSuccess(false);
        showError(errs);
        return;
      }
  
      // Ajoute via le store DU PROF (ordre: name, firstname, date, adress, mail)
      contactStore.add(nom, prenom, dateNaissance, adresse, email);
  
      // rafraîchir tableau + succès
      displayContactList();
      setSuccess(true);
  
      // (Option) conserver les valeurs: commente les 3 lignes suivantes
      form.reset();
      ["nom","prenom","dateNaissance","adresse","email"].forEach(id => calcNbChar(id));
    });
  };
  
  
  



  
  
  
  