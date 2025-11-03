window.onload = function () {
    const form = document.getElementById("formulaire");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Empêche le rechargement de la page
  
      // Récupération des champs
      const nom = document.getElementById("nom").value.trim();
      const prenom = document.getElementById("prenom").value.trim();
      const dateNaissance = document.getElementById("dateNaissance").value;
      const adresse = document.getElementById("adresse").value.trim();
      const email = document.getElementById("email").value.trim();
  
      let erreurs = [];
  
      // Validation des champs
      if (nom.length < 5) erreurs.push("Le nom doit contenir au moins 5 caractères.");
      if (prenom.length < 5) erreurs.push("Le prénom doit contenir au moins 5 caractères.");
      if (!dateNaissance) erreurs.push("Veuillez renseigner une date de naissance.");
      else {
        const birthday = new Date(dateNaissance);
        if (birthday.getTime() > Date.now()) erreurs.push("La date de naissance ne peut pas être dans le futur.");
      }
      if (adresse.length < 5) erreurs.push("L'adresse doit contenir au moins 5 caractères.");
      if (!validateEmail(email)) erreurs.push("L'adresse mail n'est pas valide.");
  
      // Afficher modale d'erreur
      if (erreurs.length > 0) {
        document.querySelector("#errorModal .modal-body").innerHTML =
          "<ul class='text-start'>" + erreurs.map(e => `<li>${e}</li>`).join("") + "</ul>";
        showModal("errorModal");
        return;
      }
  
      // Sinon, tout est OK → afficher modale carte
      const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(adresse)}&output=embed`;
      document.querySelector("#mapModal .modal-body").innerHTML = `
        <iframe
          width="100%"
          height="400"
          style="border:0"
          loading="lazy"
          allowfullscreen
          src="${mapUrl}">
        </iframe>
        <p class="mt-2">
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresse)}" target="_blank">
            Ouvrir dans Google Maps
          </a>
        </p>
      `;
      showModal("mapModal");
    });
  };
  
  // Validation email
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  // Afficher modale Bootstrap
  function showModal(modalId) {
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();
  }
  

  
  
  
  