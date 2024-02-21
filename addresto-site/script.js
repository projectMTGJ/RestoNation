const action = {
    date: function(id) {
        const date = new Date();
        document.getElementById(id).value = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' : '') + date.getDate();
    },
    collect: function() {
        const doc = document.getElementById('recap');
        doc.innerHTML = '';

        const general = document.createElement('div');
        general.classList.add('general');
        general.innerHTML = this.createGeneral();
        
        const sep = document.createElement('div');
        sep.classList.add('sep');

        const items = document.createElement('div');
        items.classList.add('items');
        items.innerHTML = ``;

        doc.appendChild(general);
        doc.appendChild(sep);
        doc.appendChild(items);
    },
    createGeneral: function() {
        return `
        <div>Nom: <span>${data.name()}</span></div>
        <div>Date: <span>${data.date()}</span></div>
        <div>Type: <span>${data.type()}</span></div> 
        <div>Prix: <span>${data.price()[1]}<${data.price()[0]} ${data.price()[2]}</span></div>
        <div>QualitéG: <span>${data.qualite()/4}</span></div>
        <div>Rpqp: <span>${data.rpqp()/4}</span></div>
        <div>Testeurs: <span>${data.testeurs()}</span></div>
        <div>DarkKit: <span>${data.dk()}</span></div>
        <div>SiteWeb: <span>${data.url()}</span></div>
        <div>Médaille: <span>${data.medal()}</span></div>
        `
    },
    createItem: function(entry) {
        return entry.map(el => {
            return `
            <div class="item">
                <div class="ttl"><img src="images/angle-small-down.svg" alt="">${el.type}</div>
                <div>${el.name}</div>
                <div>${el.qa}</div>
                <div>${el.reco}</div>
            </div>
            `;
        }).join('');
    },
    copy: function() {

    }
}
const generalData = ['ndr', 'testing-time', 'tdr', 'pcr', 'range-qa', 'range-rqp', 'checkbox', 'dk', 'url', 'medal'];
const data = {
    name: function() {
        return document.getElementById('ndr').value;
    },
    date: function() {
        return document.getElementById('testing-time').value;
    },
    type: function() {
        return document.getElementById('tdr').value;
    },
    price: function() {
        return [
            document.getElementById('max-prc').options[document.getElementById('max-prc').selectedIndex].value,
            document.getElementById('min-prc').options[document.getElementById('min-prc').selectedIndex].value,
            document.getElementById('device').options[document.getElementById('device').selectedIndex].value
        ];
    },
    qualite: function() {
        return document.getElementById('range-qa').value;
    },
    rpqp: function() {
        return document.getElementById('range-rqp').value;
    },
    testeurs: function() {
        return Array.from(document.querySelectorAll('.checkbox input[type="checkbox"]')).map(function(checkbox) {
            if (checkbox.checked) {
                return checkbox.value;
            } else {
                return null;
            }
        }).filter(function(value) {
            return value !== null;
        });
    },
    dk: function() {
        return document.getElementById('dk').value;
    },
    url: function() {
        return document.getElementById('url').value;
    },
    medal: function() {
        return document.getElementById('medal').value;
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
        window.scrollTo({top: 0});
        action.collect();
    }
}