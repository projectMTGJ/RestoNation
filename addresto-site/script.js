const action = {
    date: function(id) {
        const date = new Date();
        document.getElementById(id).value = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' : '') + date.getDate();
    },
    collect: function() {

    }
}

const manage = {
    addCompo: function(origin) {
        const doc = document.getElementById(origin);
        const num = doc.children.length;

        if (num >= 6) return;
        

        const card = document.createElement('div');
        card.classList.add('card');
        card.id = `${num}${origin}`
        card.innerHTML = `
        <div class="titler">
            <div class="ins"><img src="images/angle-small-down.svg" alt="add ${origin}">${origin}</div>
            <div class="del" onclick="manage.removeCompo('${num}${origin}', '${origin}')">Supprimer<img src="images/plus.svg" alt="delete component"></div>
        </div>
        <div class="contenenrt">
            <input class="write" type="text" placeholder="Nom sur la carte">
            <div class="org">Qualité</div>
            <select class="selector">
                <option value="5">(5) Très Haute</option>
                <option value="4">(4) Haute</option>
                <option value="3">(3) Moyenne</option>
                <option value="2">(2) Basse</option>
                <option value="1">(1) Très Basse</option>
                <option value="0">(0) Médiocre</option>
            </select>
            <div class="org">Recommandation</div>
            <div class="mall">
                <div class="top-values-sld"><div class="val">0</div><div class="val">1</div><div class="val">2</div><div class="val">3</div><div class="val">4</div><div class="val">5</div></div>
                <input type="range" min="0" max="20" class="slider" id="range-reco" value="0">
            </div>
        </div>
        `;
        doc.appendChild(card);
    },
    removeCompo: function(id, origin) {
        const doc = document.getElementById(origin);
        const card = document.getElementById(id);
        doc.removeChild(card);
    },
    validate: function() {
        document.getElementById('volet').classList.toggle('ns');
        document.getElementById('body').classList.toggle('notmoving')
    }
}