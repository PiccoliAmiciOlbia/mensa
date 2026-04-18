document.addEventListener('DOMContentLoaded', () => {


    let menuData;

    async function loadMenu() {
        try {
            const response = await fetch("./assets/data/lunch.json");
            const data = await response.json();

            menuData = data['menu_estivo'];

            const startDate = new Date(2026, 3, 6);
            const endDate = new Date(2026, 8, 30);
            const daysWeek = ["domenica", "lunedi", "martedi", "mercoledi", "giovedi", "venerdi", "sabato"];
            const monthsAbbr = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];

            let currentIndex = 0;
            let datesArray = [];
            const container = document.getElementById('cardsContainer');
            const calendar = document.getElementById('calendar');

            function init() {
                let d = new Date(startDate);
                let i = 0;
                const today = new Date();
                let startIndex = 0;

                while (d <= endDate) {
                    const dateObj = new Date(d);
                    datesArray.push(dateObj);

                    const slide = document.createElement('div');
                    slide.className = `slide ${dateObj.getDay() === 0 || dateObj.getDay() === 6 ? 'weekend' : ''}`;
                    slide.innerHTML = `<span>${daysWeek[dateObj.getDay()].substring(0, 3)}</span><strong>${dateObj.getDate()}</strong><span>${monthsAbbr[dateObj.getMonth()]}</span>`;
                    slide.onclick = () => goToIndex(Array.from(calendar.children).indexOf(slide));
                    calendar.appendChild(slide);

                    const card = document.createElement('div');
                    card.className = 'menu-card';
                    card.innerHTML = createCardHTML(dateObj, i);
                    container.appendChild(card);

                    if (dateObj.toDateString() === today.toDateString()) startIndex = i;
                    d.setDate(d.getDate() + 1);
                    i++;

                }
                    document.querySelector('#today').addEventListener('click', () => {
                        setTimeout(() => goToIndex(startIndex), 100);
                    } );

                setTimeout(() => goToIndex(startIndex), 100);
                setupInteraction();
            }

            function createCardHTML(date, i) {
                const diffDays = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
                const weekNum = (Math.floor(diffDays / 7) % 4) + 1;
                const dayName = daysWeek[date.getDay()];
                const menu = (dayName === "sabato" || dayName === "domenica") ? null : menuData[`settimana_${weekNum}`][dayName];
                const coloriSettimana = [
                    "199, 153, 153",  // Lunedì (Cotto)
                    "153, 177, 199",  // Martedì (Verde)
                    "166, 199, 153",  // Mercoledì (Blu)
                    "194, 196, 144",  // Mercoledì (Blu)
                    "199, 154, 121",  // Mercoledì (Blu)
                    "180, 175, 180",  // Mercoledì (Blu)
                    "180, 175, 180",  // Mercoledì (Blu)
                    // ...continua per gli altri giorni
                ];
                const color = coloriSettimana[i % coloriSettimana.length];
                const primo =
                    menu?.['primo'].includes("Pasta al pomodoro") ?`url('images/pastapomodoro.jpg')`:
                    menu?.['primo'].includes("Insalata di riso") ?`url('images/insalatariso.jpg')`:
                    menu?.['primo'].includes("Gnocchi di patate") ?`url('images/gnocchi.jpg')`:
                    menu?.['primo'].includes("Pizza") ?`url('images/pizza.jpg')`:
                    menu?.['primo'].includes("Minestra di pasta") ?`url('images/minestrapatate.jpg')`:
                    menu?.['primo'].includes("Pasta all'olio") ?`url('images/pastaolio.jpg')`:
                    menu?.['primo'].includes("Risotto alle carote") ?`url('images/risottocarote.jpg')`:
                    menu?.['primo'].includes("Torta di ricotta") ?`url('images/tortasalata.jpg')`:
                    menu?.['primo'].includes("Lasagna") ?`url('images/lasagna.jpg')`:
                    menu?.['primo'].includes("Pasta alle zucchine") ?`url('images/pastazucchine.jpg')`:
                    menu?.['primo'].includes("Pastina in brodo") ?`url('images/minestra.jpg')`:
                    menu?.['primo'].includes("Riso all'olio") ?`url('images/risobianco.jpg')`:
                    menu?.['primo'].includes("Passato di legumi") ?`url('images/legumi2.jpg')`:
                    menu?.['primo'].includes("Pasta al pesto") ?`url('images/pesto.jpg')`:
                    `url('images/primo.jpg')`
                const secondo =
                    menu?.['secondo']?.includes("Frittata") ?`url('images/frittata.jpg')`:
                    menu?.['secondo']?.includes("Platessa gratinata") ?`url('images/platgratinata.jpg')`:
                    menu?.['secondo']?.includes("Bocconcini di petto") ?`url('images/bocconcini.jpg')`:
                    menu?.['secondo']?.includes("Prosciutto cotto") ?`url('images/prosciutto.jpg')`:
                    menu?.['secondo']?.includes("Scaloppine di maiale") ?`url('images/scalmaiale.jpg')`:
                    menu?.['secondo']?.includes("Sogliola o Platessa") ?`url('images/sogliolaoplatessa.jpg')`:
                    menu?.['secondo']?.includes("Formaggio tenero") ?`url('images/formaggio.jpg')`:
                    menu?.['secondo']?.includes("Scaloppine di tacchino") ?`url('images/scaltacchino.jpg')`:
                    menu?.['secondo']?.includes("Filetti di merluzzo o platessa al limone") ?`url('images/filettilimone.jpg')`:
                    menu?.['secondo']?.includes("Involtini di prosciutto") ?`url('images/involtiniprosciutto.jpg')`:
                    menu?.['secondo']?.includes("Polpettine di pesce") ?`url('images/polpettinepesce.jpg')`:
                    menu?.['secondo']?.includes("Caprese") ?`url('images/caprese.jpg')`:
                    menu?.['secondo']?.includes("(frittata o strapazzato)") ?`url('images/uovo.jpg')`:
                    menu?.['secondo']?.includes("Polpettine di vitellone") ?`url('images/polpettineforno.jpg')`:
                    menu?.['secondo']?.includes("Patate al forno") ?`url('images/patate.jpg')`:
                    menu?.['secondo']?.includes("Arista di maiale") ?`url('images/arista.jpg')`:
                    menu?.['secondo']?.includes("Insalata di pollo") ?`url('images/insalatapollo.jpg')`:
                    menu?.['secondo']?.includes("Arrosto di tacchino") ?`url('images/arrostotacchino.jpg')`:
                        `url('images/secondo.jpg')`;
                const contorno =
                    menu?.['contorno']?.includes("Carote a fiammifer") ?`url('images/carote.jpg')`:
                    menu?.['contorno']?.includes("Fagiolini al vapore") ?`url('images/fagiolini.jpg')`:
                    menu?.['contorno']?.includes("Zucchine trifolate") ?`url('images/zucchine.jpg')`:
                    menu?.['contorno']?.includes("Zucchine al vapore") ?`url('images/zucchine.jpg')`:
                    menu?.['contorno']?.includes("Pomodori ad insalata") ?`url('images/pomodori.jpg')`:
                    menu?.['contorno']?.includes("Lattuga e pomodori") ?`url('images/lattuga.jpg')`:
                    menu?.['contorno']?.includes("Verdura cruda") ?`url('images/verdurastagione.jpg')`:
                    menu?.['contorno']?.includes("Bietoline") ?`url('images/bietoline.jpg')`:
                    menu?.['contorno']?.includes("Zucchine alla pizzaiola") ?`url('images/zucchinepizzaiola.jpg')`:
                        `url('images/contorno.jpg')`;
                const pane = `url('images/pane.jpg')`;
                const frutta =  menu?.['frutta']?.includes("Macedonia")? `url('images/frutta.jpg')`:`url('images/fruttastagione.jpg')`;
                if (!menu) return `<div class="card-content"><div class="no-service">Weekend<br>Mensa Chiusa</div></div>`;

                return `
                <div class="card-content">
                    <h3>${dayName}</h3>
                    
                    <div class="menu-item" style="--bg-rgb: ${color}; --bg-image: ${primo}">
                        <span class="label">Primo</span>
                        <div class="content">${menu['primo']}</div>
                    </div>
                
                    ${menu['secondo'] ? `
                    <div class="menu-item" style="--bg-rgb: ${color}; --bg-image: ${secondo}">
                        <span class="label">Secondo</span>
                        <div class="content">${menu['secondo']}</div>
                    </div>` : ''}
                
                    ${menu['contorno'] ? `
                    <div class="menu-item" style="--bg-rgb: ${color}; --bg-image: ${contorno}">
                        <span class="label">Contorno</span>
                        <div class="content">${menu['contorno']}</div>
                    </div>` : ''}
                
                    <div class="menu-item" style="--bg-rgb: ${color}; --bg-image: ${pane}">
                        <span class="label">Pane</span>
                        <div class="content">${menu['pane']}</div>
                    </div>
                
                    <div class="menu-item" style="--bg-rgb: ${color}; --bg-image: ${frutta}">
                        <span class="label">Frutta</span>
                        <div class="content">${menu['frutta']}</div>
                    </div>
                </div>
                `;
            }

            function goToIndex(index) {
                if (index < 0 || index >= datesArray.length) return;
                currentIndex = index;

                // OFFSET LOGIC:
                // Su mobile ogni card è 60% + 5% margine = 65% di spostamento per ogni index.
                // Partiamo da un piccolo padding iniziale (es: 10%) per non appiccicare la card al bordo sinistro.
                const cardStep = window.innerWidth < 768 ? 85 : 42;
                const paddingLeft = 10;
                const move = paddingLeft - (index * cardStep);

                container.style.transform = `translateX(${move}%)`;

                document.querySelectorAll('.menu-card').forEach((c, i) => c.classList.toggle('active', i === index));
                const slides = document.querySelectorAll('.slide');
                slides.forEach((s, i) => s.classList.toggle('active', i === index));

                const activeSlide = slides[index];
                calendar.scrollTo({
                    left: activeSlide.offsetLeft - (calendar.offsetWidth / 2) + (activeSlide.offsetWidth / 2),
                    behavior: 'smooth'
                });
            }

            function setupInteraction() {
                let touchStartX = 0;
                let isDragging = false;
                const slider = document.getElementById('mainSlider');

                // Touch
                slider.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, {passive: true});
                slider.addEventListener('touchend', e => handleSwipe(touchStartX, e.changedTouches[0].screenX), {passive: true});

                // Mouse Drag
                slider.addEventListener('mousedown', e => {
                    isDragging = true;
                    touchStartX = e.pageX;
                });
                slider.addEventListener('mouseup', e => {
                    if (isDragging) {
                        isDragging = false;
                        handleSwipe(touchStartX, e.pageX);
                    }
                });

                function handleSwipe(start, end) {
                    const delta = start - end;
                    if (Math.abs(delta) > 35) {
                        if (delta > 0) goToIndex(currentIndex + 1);
                        else goToIndex(currentIndex - 1);
                    }
                }
            }

            init();

            // La logica che dipende dai dati deve stare QUI
            console.log("Dati caricati:", menuData);
        } catch (error) {
            console.error("Errore durante il caricamento:", error);
        }
    }

    loadMenu().then();

})


