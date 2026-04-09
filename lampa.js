export default class Lampa{
    #allapot = false;
    #index = 0;

    constructor(allapot,i, szuloElem){
        this.#allapot = allapot;
        this.#index = i;
        this.szuloElem = szuloElem;

        this.megjelenit();
        this.#kattintasEsemeny();
        //this.#sajatEsemeny();
        //this.allapotvaltas();
    }

    megjelenit(){
        let kod = `
            <div class="elem"></div>
            `;
        this.szuloElem.insertAdjacentHTML("beforeend", kod)

        this.elem = document.querySelector(".elem:last-child");

        this.allapotvaltas();
    }

    allapotvaltas(){
        this.elem.style.backgroundColor = this.#allapot ? "yellow" : "black";
    }

    kapcsol(){
        this.#allapot = !this.#allapot;
        this.allapotvaltas();
    }

    lekapcsolva(){
        return !this.#allapot;
    }

    #kattintasEsemeny(){
        this.elem.addEventListener("click", ()=>{
            this.#sajatEsemeny();
        })
    }

    #sajatEsemeny(){
        console.log("lámpa kattintva: ", this.#index);
        const e = new CustomEvent("katt", { detail: this.#index});
        window.dispatchEvent(e);
    }
}