import Jatekter from "./jatekter.js";

const taroloElem = document.querySelector(".tarolo");
const inputMeret = document.querySelector("#meret");
const ujJatekGomb = document.querySelector("#ujjatek");

let jatek = null;

ujJatekGomb.addEventListener("click", () => {
    const jelenMeret = parseInt(inputMeret.value);

    const lampaLista = [];
    for (let i = 0; i < jelenMeret * jelenMeret; i++) {
        lampaLista.push(Math.random() < 0.2); //20% felkapcsolva
    }

    if (jatek) {
        jatek.jatekTorles();
    }
    
    taroloElem.innerHTML = "";

    jatek = new Jatekter(lampaLista, taroloElem, jelenMeret);
});