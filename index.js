import Jatekter from "./jatekter.js";

const nevElem = document.querySelector("#nev");
const nevInput = document.querySelector("#nevInput");
const nevGomb = document.querySelector("#nevGomb");

const taroloElem = document.querySelector(".tarolo");
const inputMeret = document.querySelector("#meret");
const ujJatekGomb = document.querySelector("#ujjatek");

let jatek = null;
let canPlay = false;
let nev = null;

// nev input megjelenitese/elrejtese
function mutatInput() {
    nevInput.style.display = "inline-block";
    nevGomb.style.display = "inline-block";
}

function elrejtInput() {
    nevInput.style.display = "none";
    nevGomb.style.display = "none";
}

// jatekos nev, tesztelo
function beallitNev(n) {
    nev = n;
    localStorage.setItem("jatekosNev", nev);

    nevElem.textContent = `Tesztele: ${nev}`;

    elrejtInput();
    canPlay = true;
}

// nev mentes
const mentettNev = localStorage.getItem("jatekosNev");

// nem null/ures
if (mentettNev && mentettNev !== "null" && mentettNev.trim() !== "") {
    beallitNev(mentettNev);
} else {
    mutatInput();
    nevElem.textContent = "";
    canPlay = false;
}

// nev mentes gomb
nevGomb.addEventListener("click", () => {
    const ujNev = nevInput.value.trim();

    if (!ujNev) {
        alert("A lámpák nem bíznak benned!");
        return;
    }

    beallitNev(ujNev);
});

ujJatekGomb.addEventListener("click", () => {
    if (!canPlay) {
        alert("Név nélkül nem tudsz játszani, a lámpák nem bíznak benned!");
        return;
    }

    const jelenMeret = parseInt(inputMeret.value);

    const lampaLista = [];
    for (let i = 0; i < jelenMeret * jelenMeret; i++) {
        lampaLista.push(Math.random() < 0.2); //20% felkapcsolva
    }

    if (jatek) {
        jatek.jatekTorles();
    }

    /*const teszteloElem = document.querySelector("#nev");
    teszteloElem.textContent += "Gubek Veronika";*/
    
    taroloElem.innerHTML = "";

    jatek = new Jatekter(lampaLista, taroloElem, jelenMeret);
});