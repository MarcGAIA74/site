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

class searchBar {
    /**
     * 
     * @param {Document} document 
     */
    constructor(document) {
        this.doc = document
        this.data = document.body.getElementsByClassName("content")[0]
        this.item_nb = 0
        this.item_index = 0

        const div = document.createElement("div")
        div.setAttribute("class", "search_bar")

        const input = document.createElement("input")
        input.setAttribute("id", "bar")
        input.setAttribute("type", "text")
        div.appendChild(input)

        const button = document.createElement("button")
        button.setAttribute("id", "search")
        button.textContent = "Rechercher"
        button.addEventListener('click', () => {
            this.search()
        })
        div.appendChild(button)

        const button2 = document.createElement("button")
        button2.setAttribute("id", "next_search")
        button2.textContent = "Suivant"
        button2.addEventListener('click', () => {
            this.next()
        })
        div.appendChild(button2)

        document.body.appendChild(div)
    }

    search() {
        //Vérifie le mot envoyé
        const word = simplifyString(this.doc.getElementById("bar").value)
        console.log(word)
        if (word === "")
            return

        //Supprime la dernière recherche
        const elements = Array.from(this.doc.getElementsByClassName("find_by_search_bar"))
        elements.forEach(function (element) {
            let stringClass = element.getAttribute("class")
            stringClass = stringClass.replace("find_by_search_bar", "")
            element.setAttribute("class", stringClass)
        });

        //Cherche le mot dans les textContent
        const children = Array.from(this.data.children)
        children.forEach((child) => {
            const text = simplifyString(child.textContent)
            if (text.includes(word)) {
                child.setAttribute("class", "find_by_search_bar")
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
                child.setAttribute("class", "find_by_search_bar")
            }
            if (child.children.length === 0)
                return
            this.nextStep(Array.from(child.children), word)
        });
    }

    scroll() {
        const els = document.querySelectorAll(".find_by_search_bar");
        const el = els[this.item_index]

        if (!el)
            return

        el.setAttribute("class", "find_by_search_bar highLight")
        el.scrollIntoView({ behavior: "smooth" }); // Scroll fluide
    }

    next() {
        const els = document.querySelectorAll(".find_by_search_bar");
        const el = els[this.item_index]
        el.setAttribute("class", "find_by_search_bar")

        if ((this.item_index + 1) < this.item_nb)
            this.item_index++
        else
            this.item_index = 0

        this.scroll()
    }
}