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

        const items = document.createElement('div');
        items.classList.add('items');
        const entr = Array.from(document.getElementById('Entrée').children);
        const plat = Array.from(document.getElementById('Plat').children);
        const acco = Array.from(document.getElementById('Accompagnement').children);
        const dess = Array.from(document.getElementById('Dessert').children);
        const bois = Array.from(document.getElementById('Boisson').children);
        items.innerHTML = this.createItem([...entr, ...plat, ...acco, ...dess, ...bois]);

        const terminate = document.createElement('div');
        terminate.classList.add('copybtn');
        terminate.id = 'copyend';
        terminate.innerHTML = `Copier et Terminer`
        terminate.setAttribute('onclick', 'action.copy()');

        doc.appendChild(general);

        const sep = document.createElement('div');
        sep.classList.add('sep');
        doc.appendChild(sep);

        doc.appendChild(items);

        const sep2 = document.createElement('div');
        sep2.classList.add('sep');
        doc.appendChild(sep2);

        doc.appendChild(terminate);
    },
    createGeneral: function() {
        return `
        <div class="grd">
            <div>Nom: <span>${data.name()}</span></div>
            <div>Date: <span>${data.date()}</span></div>
            <div>Type: <span>${data.type()}</span></div>
            <div>Médaille: <span>${data.medal()}</span></div>
            <div>Prix: <span>${data.price()[1]}<${data.price()[0]} ${data.price()[2]}</span></div>
            <div>DarkKit: <span>${data.dk()}</span></div>
        </div>
        <div>Qualité Générale: <span>${data.qualite()/4}/5</span></div>
        <div>Rapprot qualité/prix & Quantité: <span>${data.rpqp()/4}/5</span></div>
        <div>Testeurs: <span>${data.testeurs()}</span></div>
        <div>SiteWeb: <span>${data.url()}</span></div>
        `
    },
    createItem: function(entry) {
        return entry.map(el => {
            const id = el.id.replace(/\d/g, '');
            return `
            <div class="item">
                <div class="ttl"><img src="images/angle-small-down.svg" alt="">${id}</div>
                <div>Nom: <span>${document.getElementById(`${el.id}wrt`).value}</span></div>
                <div>Qualité: <span>${document.getElementById(`${el.id}qa`).value}</span></div>
                <div>Recommandation: <span>${document.getElementById(`${el.id}reco`).value/4}/5</span></div>
            </div>
            `;
        }).join('');
    },
    copy: function() {
        const dat = data.give();
        navigator.clipboard.writeText(`{
            "name": "${dat.nom}",
            "website": "${dat.url}",
            "medal": ${dat.medal},
            "enligne": {},
            "type": "${dat.type}",
            "cost": {
                "min": ${dat.price[1]},
                "max": ${dat.price[0]},
                "device": "${dat.price[2]}"
            },
            "qa": ${dat.ql},
            "rqp": ${dat.rpqp},
            "testeurs": ${dat.testeurs},
            "images": [
                ${dat.items}
            ],
            "descriptions": { 
                "full": "",
                "short": ""
            },
            "darkkitchen": false,
            "localisation": []
        }`).then(() => {
            const cpy = document.getElementById('copyend');
            cpy.style = "background-color: rgba(103, 255, 15, 0.4); border: 4px solid rgba(103, 255, 15, 0.8);";
            cpy.innerHTML = "Copie effectuée";
        })
        setTimeout(() => {manage.validate()}, 1500);
    }
}

const data = {
    convertNames: function(names) {
        const namesArray = names.split(', ');
        const convertedNames = {};
        namesArray.forEach(name => {
            const [firstName, lastName] = name.split(' ');
            convertedNames[firstName.toLowerCase()] = lastName.toLowerCase();
        });
        return JSON.stringify(convertedNames);
    },
    give: function() {
        return {
            nom: this.name(),
            type: this.type(),
            price: this.price(),
            ql: this.qualite(),
            rpqp: this.rpqp(),
            testeurs: this.convertNames(this.testeurs()),
            dk: this.dk(),
            url: this.url(),
            medal: this.medal(),
            items: this.sortItem()
        }
    },
    sortItem: function() {
        const entr = Array.from(document.getElementById('Entrée').children);
        const plat = Array.from(document.getElementById('Plat').children);
        const acco = Array.from(document.getElementById('Accompagnement').children);
        const dess = Array.from(document.getElementById('Dessert').children);
        const bois = Array.from(document.getElementById('Boisson').children);
        return [...entr, ...plat, ...acco, ...dess, ...bois].map(el => {
            const id = el.id.replace(/\d/g, '');
            return `
                {
                    "link":"",
                    "info": {
                        "Type": "${id}",
                        "Nom":"${document.getElementById(`${el.id}wrt`).value}",
                        "Date":"${this.date()}",
                        "Qualité":"${document.getElementById(`${el.id}qa`).value}",
                        "Recommandation": ${document.getElementById(`${el.id}reco`).value/4}
                    }
                }`;
        }).join(',');
    },
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
            if (checkbox.checked) return checkbox.value;
            else return null;
        }).filter(function(value) {
            return value !== null;
        }).join(', ');
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
            <input id="${num}${origin}wrt" class="write" type="text" placeholder="Nom sur la carte">
            <div class="org">Qualité</div>
            <select class="selector" id="${num}${origin}qa">
                <option value="Très Haute">Très Haute</option>
                <option value="Haute">Haute</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Basse">Basse</option>
                <option value="Très Basse">Très Basse</option>
                <option value="Médiocre">Médiocre</option>
            </select>
            <div class="org">Recommandation</div>
            <div class="mall">
                <div class="top-values-sld"><div class="val">0</div><div class="val">1</div><div class="val">2</div><div class="val">3</div><div class="val">4</div><div class="val">5</div></div>
                <input type="range" min="0" max="20" class="slider" id="${num}${origin}reco" value="0">
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