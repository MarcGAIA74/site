/* ---------------------------
// La logique js est chargée après le DOM de la page
--------------------------- */
window.addEventListener('DOMContentLoaded', async () => {
    addFooter()
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
    const h4 = document.createElement("h4")
    h4.textContent = "Outil développé par Marc FRECHOU-RENAULT pour l'associsation GAIA74"
    //<h4>Outil développé par Marc FRECHOU-RENAULT pour l'associsation GAIA74</h4>
    footer.appendChild(h4)
    //<div class="footer">
    //    <a>🔗 <a href="index.html">Accéder au site</a></a><br>
    //    <h4>Outil développé par Marc FRECHOU-RENAULT pour l'associsation GAIA74</h4>
    //</div>
    document.body.appendChild(footer)
}