import Lampa from "./lampa.js";

export default class Jatekter{
    static listenerHozzaadva = false;

    constructor(kezdoAllapot,szuloElem, sor){
        this.szuloElem=szuloElem;
        this.sorTores = sor;
        this.lampak = [];

        this.jatekban = true;

        this.szuloElem.innerHTML = "";
        this.megjelenit(kezdoAllapot);

        /*const maxSzelesseg = window.innerWidth * 0.9; //90% viewport
        const maxMagassag = window.innerHeight * 0.7; //70% viewport
        const lampaMeretSz = (maxSzelesseg - ( sor - 1) * 5) / sor; //5px gap
        const lampaMeretM = (maxMagassag - (sor - 1) * 5) / sor; //5px gap
        const lampaMeret = Math.min(lampaMeretSz, lampaMeretM); //szelesseg, magassag

        this.szuloElem.style.gridTemplateColumns = `repeat(${sor}, ${lampaMeret}px)`;*/
        this.lampaMeretezes();
        window.addEventListener("resize", () => this.lampaMeretezes()); 

        this.kattListener = (event) => this.kattJatek(event);
        window.addEventListener("katt", this.kattListener);

        if (this.lampak.every(lampak => lampak.lekapcsolva())) {
            setTimeout(() => {
                alert("Ahww bocsi, de későn értél ide valaki már megmentette a Földet.");
                this.jatekban = false;
            }, 200);
        }
    }

    lampaMeretezes() {
        const maxSzelesseg = window.innerWidth * 0.9;   // 90% viewport szélesség
        const maxMagassag = window.innerHeight * 0.7; // 70% viewport magasság

        let lampMeretSz = (maxSzelesseg - (this.sorTores - 1) * 5) / this.sorTores;
        let lampMeretM = (maxMagassag - (this.sorTores - 1) * 5) / this.sorTores;

        let lampMeret = Math.min(lampMeretSz, lampMeretM);

        const meretezesKicsin = Math.pow(3 / this.sorTores, 0.6); 
        lampMeret = lampMeret * meretezesKicsin;

        const MIN_LAMP_MERET = 25;  // minimum lampa meret
        const MAX_LAMP_MERET = 70;  // maximum lampa meret
        lampMeret = Math.max(MIN_LAMP_MERET, Math.min(lampMeret, MAX_LAMP_MERET));

        this.szuloElem.style.gridTemplateColumns = `repeat(${this.sorTores}, ${lampMeret}px)`;

        this.lampak.forEach(l => {
            l.elem.style.width = `${lampMeret}px`;
            l.elem.style.height = `${lampMeret}px`;
        });
    }

    kattJatek(event) {
        if (!this.jatekban) {
            alert("Kétszer nem tudod megmenteni a Földet, kérlek utazz vissza az időben(indíts új játékot)!");
            return;
        }

        const index = event.detail;
        if (!this.lampak[index]) return;

        this.lampak[index].kapcsol();

        const sz = this.szomszedok(index);
        sz.forEach(i => {if (this.lampak[i]) this.lampak[i].kapcsol();
        });

        if (this.lampak.every(lampak => lampak.lekapcsolva())) {
            setTimeout(() => {
                alert("Hurrá, meghosszabítottad a Föld életét!");
                this.jatekban = false;
            }, 200);
        }

        if (this.lampak.every(l => !l.lekapcsolva())) {
            setTimeout(() => {
                alert("A globális felmelegedés oldalán állsz? Kérlek próbáld újra!");
            }, 200);
        }
    }

    szomszedok(index){
        const  s = this.sorTores; 
        const sz = [];

        if (index % s !== 0) sz.push(index - 1); //bal oldal
        if (index % s !== s - 1) sz.push(index + 1); //jobb oldal
        if (index - s >= 0) sz.push(index - s); //felső
        if (index + s < this.lampak.length) sz.push(index + s); //alsó
        return sz;
    }

    megjelenit(kezdoAllapot){
        this.lampak = [];
        kezdoAllapot.forEach((allapot,i)=>{
            const lampa = new Lampa(allapot, i, this.szuloElem);
            this.lampak.push(lampa);
            }
        )
    }

    jatekTorles(){
        if (this.kattListener) {
            window.removeEventListener("katt", this.kattListener);
        }
    }
}