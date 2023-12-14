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

fetch('restaurants/cartes.json')
    .then(response => response.json())
    .then(data => {
        const cartesPresentation = document.getElementById('cards');
        data.forEach(info => {
            const carde = document.createElement('div');
            carde.classList.add('card');
            if (info.medal && info.stars >= 5) {
                carde.innerHTML = `
                    <img src="restaurants/images/${info.images[0]}" alt="${info.name.toLowerCase().replace(/\s/g, "")}">
                    <div class="desc">
                        <div class="ttl">
                            <div class="title">${info.name}</div>
                            <div class="cost">${info.cost.min} <span>
                            </span> ${info.cost.max} ${info.cost.device}</div>
                        </div>
                        <div class="info">
                            <div class="type">${info.type}</div>
                            <div class="stars">
                                ${genererEtoiles(info.stars)}
                            </div>
                        </div>
                    </div>
                `;
                cartesPresentation.appendChild(carde);
            }
        })
    });

    AOS.init();

