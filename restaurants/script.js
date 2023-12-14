function getValue() {
    console.log("La valeur saisie est : " + document.getElementById('search').value);
}

function removeValue() {
    document.getElementById('search').value = '';
}

function scrollToElement(id) {
    var targetElement = (id === "fc") ? document.body : document.getElementById(id);
    var targetY = (id === "fc") ? 0 : targetElement.getBoundingClientRect().top - 250;
    window.scrollTo({
        top: targetY,
        behavior: "smooth"
    });
}

function createImages(images) {
    const imageElements = images.map((image, index) => {
        return `<div class="imageCont" onclick="activate('image-${index + 1}')" id="image-${index + 1}">
                    <span id="imgnrimage-${index + 1}" class="vis msr-filled">visibility</span>
                    <img src="images/${image}" alt="Image ${index + 1}">
                </div>`;
    }).join('\n');
    return imageElements;
}

function toggleBodyOverflow() {
    const doc = document.querySelector('body');
    doc.style.overflowY = doc.style.overflowY === 'hidden' ? 'scroll' : 'hidden';
}

function showDoc(name) {

    if (document.getElementById('er').classList.contains("showed")) {
        moveElements();
    }    

    const doc = document.getElementById('documented');

    fetch('cartes.json')
        .then(response => response.json())
        .then(data => {

            const index = data.findIndex(item => item.name === name);
            doc.innerHTML = '';

            const contener = document.createElement('div');
            contener.classList.add('contener');
            

            function generateReco(reco) {
                return Object.entries(reco).map(([item, app]) => `
                    <div class="data">
                        <div class="name">${item}</div>
                        <span class="sepp"></span>
                        <div class="fill">
                            <div class="bottom">
                                <div class="top" style="width: calc(${typeof(app)=="string" ? 9.5 : app}% - 5px);">${app}%</div>
                            </div>
                        </div>
                    </div>`
                ).join('');
            }
            
            contener.innerHTML = `
                <div class="head">
                    <div class="ttl">${data[index].name}${data[index].medal?'<span class="medal msr-filled">workspace_premium</span>':''}</div>
                    <div class="btn">
                        <div class="totop msr-filled">arrow_forward_ios</div>
                        <div onclick="hideDoc()" class="close msr-filled">close</div>
                    </div>
                </div>
                <span class="sep"></span>
                <div class="content">
                    <div class="images">
                        ${createImages(data[index].images)}
                    </div>
                    <span class="sep" style="width: 95%; margin-left: 2.5%;"></span>
                    <div class="datas">
                        <div class="title">Recommandation</div>
                        ${generateReco(data[index].recommandation)}
                    </div>
                    <span class="sep" style="width: 95%; margin-left: 2.5%;"></span>
                    <div class="text">
                        ${data[index].descriptions.full}
                    </div>
                </div>
            `;

        doc.appendChild(contener);
        
        doc.style.display = 'block';
        doc.offsetHeight;
        doc.classList.add('show');
        toggleBodyOverflow();

    })
    .catch(error => {
        console.error('Erreur lors du chargement du fichier JSON', error);
    });
    document.querySelector('.searchBar').classList.add('show');
}

function hideDoc() {
    toggleBodyOverflow();
    document.querySelector('.searchBar').classList.remove('show');
    const doc = document.querySelector('.doc');
    doc.classList.remove('show');
    doc.addEventListener('transitionend', function() {
        doc.style.display = 'none';
    }, { once: true });
}

function redirectToSite(url) {
    window.open(url, "_blank");
}

function activate(id) {
    const img = document.getElementById(id);
    const stl = document.getElementById(`imgnr${id}`);
    img.classList.toggle('active'), stl.classList.toggle('vis'), stl.classList.toggle('n-vis');
    stl.innerHTML = stl.innerHTML == 'visibility' ? 'visibility_off' : 'visibility';
}

function moveElements() {
    const t = document.querySelector('.top');
    const b = document.querySelector('.band');
    const s = document.getElementById('er');
    t.classList.toggle('showed'), b.classList.toggle('showed'), s.classList.toggle('showed');
}

function genererEtoiles(stars) {
    const etoilesRemplies = Math.floor(stars);
    const demiEtoile = stars % 1 !== 0;
    const etoilesHTML = Array(5).fill('').map((_, index) => {
        if (index < etoilesRemplies) {
            return '<span class="msr-filled">star</span>';
        } else if (index === etoilesRemplies && demiEtoile) {
            return '<span class="msr-filled">star_half</span>';
        } else {
            return '<span class="msr-empty">star</span>';
        }
    }).join('');
    return etoilesHTML;
}

function addSep() {
    const sepa = document.createElement('span');
    sepa.classList.add('sep');
    sepa.setAttribute('data-aos', `zoom-in`);
    sepa.setAttribute('data-aos-duration', `600`);
    document.getElementById('contain').appendChild(sepa);
}

function loadFilter(data, type) {
    switch(true) {
        case type == "notes+":
            return data.sort((a, b) =>  b.stars - a.stars);
        case type == "notes-":
            return data.sort((a, b) =>  a.stars - b.stars);
        case type == "prix+":
            return data.sort((a, b) =>  b.cost.min - a.cost.min);
        case type == "prix-":
            return data.sort((a, b) =>  a.cost.min - b.cost.min);
    }
}

function sortDocument(data, type) {
    if (type == "all") {
        return data;
    } else {
        return data.filter(info => info.type.toLowerCase().replace(/\s/g, "").normalize('NFD').replace(/[\u0300-\u036f]/g, '') == type.toLowerCase().replace(/\s/g, "").normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
    }
}

var current;
function loadData(type, dsl) {
    if (document.querySelector('.doc').classList.contains('show')) {
        hideDoc();
    }

    fetch('cartes.json')
        .then(response => response.json())
        .then(data => {

            if (type !== 'Null') current = type;
            var dataFiltered = sortDocument(data, current);

            if (dsl) {
                dataFiltered = loadFilter(dataFiltered, dsl);
            }

            data.forEach(info => {
                const elementId = info.type.toLowerCase().replace(/\s/g, "").normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                const element = document.getElementById(elementId);
                element.querySelector('.imged').style = 'background-color: rgba(0, 0, 0, 0.1);'; 
                element.querySelector('.text').style = 'background-color: rgba(0, 0, 0, 0.1);'; 
            });

            const cartesUtilisateur = document.getElementById('contain');
            cartesUtilisateur.innerHTML = '';
            dataFiltered.forEach(info => {
                const formatType = generateIdAndNormalize(info.type);
                const card = createRestaurantCard(data, info, formatType);
                cartesUtilisateur.appendChild(card);
                addSep();
                scrollToElement('fc');
                Array.from(document.getElementById(formatType).children).forEach(function(chld) {
                    chld.querySelector('.imged').style = 'background-color: rgba(0, 0, 0, 0.3);'; 
                    chld.querySelector('.text').style = 'background-color: rgba(0, 0, 0, 0.3);'; 
                });
            });
        })
        .catch(error => console.error('Erreur de chargement du fichier JSON', error));
}

function generateIdAndNormalize(text) {
    return text.toLowerCase().replace(/\s/g, "").normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function createRestaurantCard(data, info, formatType) {
    const card = document.createElement('div');
    card.classList.add('restaurant-card');
    card.id = generateIdAndNormalize(info.name);
    const fadeDirection = (data.indexOf(info) % 2) ? 'fade-right' : 'fade-left';
    card.setAttribute('data-aos', fadeDirection);
    card.setAttribute('data-aos-duration', '600');

    card.innerHTML = `
        <div class="restaurant-image">
            <div class="imageCont" onclick="showDoc('${info.name}')">
                <span class="msr-filled">visibility</span><img src="images/${info.images[0]}" alt="${info.name}">
            </div>
        </div>
        <div class="restaurant-info">
            <div class="restaurant-head">
                <div class="restaurant-title">${info.name}${info.medal ? '<span class="medal msr-filled">workspace_premium</span>' : ''}</div>
                <div class="info">
                    <div class="stars">${genererEtoiles(info.stars)}</div>
                    <div class="type">${info.type}</div>
                    <div class="cost">${info.cost.min} <span></span> ${info.cost.max} ${info.cost.device}</div>
                </div>
            </div>
            <div class="description">
                <div class="ql">
                    <div>Qualité Alimentaire</div>
                    <div class="state">${info.qa}</div>
                </div>
                <span></span>
                ${info.descriptions.short}
            </div>
            <div class="btn">
                <div onclick="showDoc('${info.name}')"><span class="msr-filled">visibility</span>Plus d'infos</div>
                <div onclick="redirectToSite('${info.website}')"><span class="msr-filled">public</span>Site web</div>
            </div>
        </div>
    `;

    return card;
}

var delayed = 0;
fetch('cartes.json')
    .then(response => response.json())
    .then(data => {
        const bandageUser = document.getElementById('band');
        var liste = [];
        data.forEach(info => {
            const formatType = info.type.toLowerCase().replace(/\s/g, "").normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            if (!liste.includes(formatType)) {
                liste.push(formatType)
                const bandage = document.createElement('div');
                bandage.classList.add('button');
                bandage.id = formatType;
                bandage.setAttribute('onclick', `loadData('${formatType}')`);
                bandage.innerHTML = `
                    <div class="mainiac">
                        <img class="imged" src="images/logos/burger.png" alt="${info.name}">
                        <div class="text">${info.type}</div>
                    </div>
                `;
                bandage.setAttribute('data-aos', `fade-right`);
                bandage.setAttribute('data-aos-delay', delayed += 100);
                bandageUser.appendChild(bandage);
            }
        });
    });
loadData('all');
moveElements();