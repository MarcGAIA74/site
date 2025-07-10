/* ---------------------------
// La logique js est chargée après le DOM de la page
--------------------------- */
let search_bar
window.addEventListener('DOMContentLoaded', async () => {
    addFooter()
    search_bar = new searchBar(document)
})

function addFooter() {
    const footer = document.createElement("div")
    footer.setAttribute("class", "footer")
    const l1 = document.createElement("a")
    l1.textContent = "🔗 "
    const l11 = document.createElement("a")
    l11.textContent = "Accéder au site"
    l11.setAttribute("href", "index.html")
    l1.appendChild(l11)
    //<a>🔗 <a href="index.html">Accéder au site</a></a>
    footer.appendChild(l1)
    const h5 = document.createElement("h5")
    h5.textContent = "Outil développé par Marc FRECHOU-RENAULT pour l'associsation GAIA74"
    //<h4>Outil développé par Marc FRECHOU-RENAULT pour l'associsation GAIA74</h4>
    footer.appendChild(h5)
    //<div class="footer">
    //    <a>🔗 <a href="index.html">Accéder au site</a></a><br>
    //    <h4>Outil développé par Marc FRECHOU-RENAULT pour l'associsation GAIA74</h4>
    //</div>
    document.body.appendChild(footer)
}

function simplifyString(string) {
    return string
        .normalize("NFD")                   // Décompose les caractères accentués (ex: é devient e +  ́)
        .replace(/[\u0300-\u036f]/g, "")      // Supprime les diacritiques (accents)
        .toLowerCase();                     // Convertit en minuscules
}

class Showable {
    /**
     * 
     * @param {Document} document 
     * @param {Element} element 
     */
    constructor(document, button, element) {
        this.doc = document
        this.content = element
        this.button = button

        this.state = "show"

        this.button.addEventListener("click", () => {
            if(this.state === "show") {
                this.content.classList.remove("showable")
                void this.content.offsetWidth; // force un recalcul
                this.content.classList.add("hiddenable")
                this.state = "hidden"
            } else if(this.state === "hidden") {
                this.content.classList.remove("hiddenable")
                void this.content.offsetWidth; // force un recalcul
                this.content.classList.add("showable")
                this.state = "show"
            }
                
                

        })
    }
}

class searchBar {
    /**
     * 
     * @param {Document} document 
     */
    constructor(document) {
        this.doc = document
        this.data = this.doc.body.getElementsByClassName("content")[0]
        this.item_nb = 0
        this.item_index = 0

        this.div = this.doc.createElement("div")
        this.div.classList.add("search_bar")

        const input = this.doc.createElement("input")
        input.setAttribute("id", "bar")
        input.setAttribute("type", "text")
        input.setAttribute("placeholder", "Rechercher un mot/phrase")
        this.div.appendChild(input)

        const button = this.doc.createElement("button")
        button.setAttribute("id", "search")
        button.textContent = "Rechercher"
        button.addEventListener('click', () => {
            this.search()
        })
        this.div.appendChild(button)

        const button2 = this.doc.createElement("button")
        button2.setAttribute("id", "next_search")
        button2.textContent = "Suivant"
        button2.addEventListener('click', () => {
            this.next()
        })
        this.div.appendChild(button2)

        const button3 = this.doc.createElement("button")
        button3.setAttribute("id", "close_search")
        button3.textContent = "Cacher/Montrer"
        this.div.appendChild(button3)
        this.showable = new Showable(document, button3, this.div)

        this.doc.body.appendChild(this.div)
    }

    search() {
        //Vérifie le mot envoyé
        /**
         * @type {string}
         */
        let input = simplifyString(this.doc.getElementById("bar").value)

        if (input[input.length - 1] === " ")
            input = input.slice(0, input.length - 1)
        if (input === "")
            return
        const word = input

        //Supprime la dernière recherche
        const high_light = this.doc.getElementsByClassName("high_light")[0]
        const elements = Array.from(this.doc.getElementsByClassName("find_by_search_bar"))
        if (high_light) {
            high_light.classList.remove("high_light")
        }
        elements.forEach(function (element) {
            element.classList.remove("find_by_search_bar")
        });

        //Cherche le mot dans les textContent
        const children = Array.from(this.data.children)
        children.forEach((child) => {
            const text = simplifyString(child.textContent)
            if (text.includes(word)) {
                child.classList.add("find_by_search_bar")
            }
            if (child.children.length === 0)
                return
            //this.nextStep(Array.from(child.children), word)
        });

        //Scroll vers le premier résultat
        this.item_index = 0
        this.item_nb = this.doc.querySelectorAll(".find_by_search_bar").length
        this.scroll()
    }

    /**
     * 
     * @param {HTMLCollectionOf<Element>} nodeList 
     * @param {*} word 
     */
    nextStep(parent, word) {
        parent.forEach(function (child) {
            const text = simplifyString(child.textContent)
            if (text.includes(word)) {
                child.classList.add("find_by_search_bar")
            }
            if (child.children.length === 0)
                return
            this.nextStep(Array.from(child.children), word)
        });
    }

    scroll() {
        const els = this.doc.querySelectorAll(".find_by_search_bar");
        const el = els[this.item_index]

        if (!el)
            return

        el.classList.add("find_by_search_bar")
        el.classList.add("high_light")
        el.scrollIntoView({ behavior: "smooth" }); // Scroll fluide
    }

    next() {
        const els = this.doc.querySelectorAll(".find_by_search_bar");
        const el = els[this.item_index]
        el.classList.remove("high_light")

        if ((this.item_index + 1) < this.item_nb)
            this.item_index++
        else
            this.item_index = 0

        this.scroll()
    }

    getElement() { return this.div }
}