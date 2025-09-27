// Fonction pour charger un fichier HTML externe dans un élément
function importdata(selector, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.querySelector(selector).innerHTML = data;
    });
}


// Fonction pour le dark mode
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

function applyTheme() {
  const theme = localStorage.getItem("theme") || "light";
  if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

// Fonction pour basculer la langue
function changelanguage(lang) {
  localStorage.setItem("lang", lang); // sauvegarde le choix
  displaydiv(lang);
}

// Fonction pour afficher la bonne div
function displaydiv(lang) {
  document.getElementById("fr").classList.add("hidden");
  document.getElementById("en").classList.add("hidden");
  document.getElementById(lang).classList.remove("hidden");
}

// Fonction pour les selects dependants de reparation-page
function cascadingselect() {
  const seriesdemarques = {
      infinix: ["Hot", "GT", "Note", "SMART"],
      samsung: ["GALAXY S", "GALAXY Z", "GALAXY A", "GALAXY M"],
      itel: ["It-A", "It-S", "It-P"],
      tecno: ["PHANTOM", "POP", "POVA", "SPARK", "CAMON"],
      redmi: ["Note", "Red-A", "Red-C"],
      iphone: ["6-6s", "7-8+", "SE-XR", "11", "12-14 Pro", "15-17 Pro"]
    };

    const selectmarquesfr = document.getElementById("marque-fr");
    const selectseriesfr = document.getElementById("serie-fr");
    const selectmarquesen = document.getElementById("marque-en");
    const selectseriesen = document.getElementById("serie-en");

    selectmarquesfr.addEventListener("change", function() {
      // Réinitialiser le select des series
      selectseriesfr.innerHTML = '<option value="">-- Choisis une serie --</option>';

      const marquechoisie = this.value;
      if (marquechoisie && seriesdemarques[marquechoisie]) {
        seriesdemarques[marquechoisie].forEach(serie => {
          const option = document.createElement("option");
          option.value = serie.toLowerCase();
          option.textContent = serie;
          selectseriesfr.appendChild(option);
        });
      }
    });

    selectmarquesen.addEventListener("change", function() {
      // Réinitialiser le select des series
      selectseriesen.innerHTML = '<option value="">-- Choose a serial --</option>';

      const marquechoisie = this.value;
      if (marquechoisie && seriesdemarques[marquechoisie]) {
        seriesdemarques[marquechoisie].forEach(serie => {
          const option = document.createElement("option");
          option.value = serie.toLowerCase();
          option.textContent = serie;
          selectseriesen.appendChild(option);
        });
      }
    });
}

// Au chargement de la page
window.onload = function() {
  let lang = localStorage.getItem("lang") || "fr";
  applyTheme();

  // Charger les fragments HTML
  importdata("#nav-fr", "assets/html/nav-fr.html");
  importdata("#footer-fr", "assets/html/footer-fr.html");
  importdata("#nav-en", "assets/html/nav-en.html");
  importdata("#footer-en", "assets/html/footer-en.html");

  // Appliquer la bonne langue
  displaydiv(lang);
  cascadingselect();
};