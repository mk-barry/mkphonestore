const accfr = document.getElementById("accueil-fr");
const accen = document.getElementById("accueil-en");
const notiffr = document.getElementById("notifs-fr");
const notifen = document.getElementById("notifs-en");

const groupA = document.querySelectorAll(".optaccueil");
const groupB = document.querySelectorAll(".optnotifs");


function setGroup(group, state) {
  group.forEach(cb => cb.checked = state);
}


function activateCouple(coupleMasters, coupleGroup, otherMasters, otherGroup) {
  // Activer le couple cliqué
  coupleMasters.forEach(m => m.checked = true);
  setGroup(coupleGroup, true);

  // Désactiver l’autre couple
  otherMasters.forEach(m => m.checked = false);
  setGroup(otherGroup, false);
}

// Gestion couple accueil

accfr.addEventListener("change", () => {
  if (accfr.checked) {
    activateCouple([accfr, accen], groupA, [notiffr, notifen], groupB);
  }
});
accen.addEventListener("change", () => {
  if (accen.checked) {
    activateCouple([accfr, accen], groupA, [notiffr, notifen], groupB);
  }
});

// Gestion couple notifs

notiffr.addEventListener("change", () => {
  if (notiffr.checked) {
    activateCouple([notiffr, notifen], groupB, [accfr, accen], groupA);
  }
});
notifen.addEventListener("change", () => {
  if (notifen.checked) {
    activateCouple([notiffr, notifen], groupB, [accfr, accen], groupA);
  }
});

// Activation de l'accueil par defaut

activateCouple([accfr, accen], groupA, [notiffr, notifen], groupB);