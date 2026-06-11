document.addEventListener('DOMContentLoaded', () => {
    
    // --- MOBIILIVALIKON TOIMINNALLISUUS ---
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-menu');

    if (menu && menuLinks) {
        menu.addEventListener('click', () => {
            menu.classList.toggle('is-active');
            menuLinks.classList.toggle('active');
            console.log('Mobiilivalikkoa klikattu!'); 
        });
    }

    // --- KUVAGALLERIAN TOIMINNALLISUUS (JATKUVA LOOPPI PYYHKÄISYLLÄ) ---
    const kuvat = document.querySelectorAll(".esittelykuva img");
    const edellinenBtn = document.getElementById("edellinen-kuva");
    const seuraavaBtn = document.getElementById("kuvanvaihto");

    let nykyinenIndeksi = 0;
    let onkoAnimaatioKesken = false;

    if (kuvat.length > 0 && edellinenBtn && seuraavaBtn) {
        
        function vaihdaKuva(uusiIndeksi, saapumisLuokka, poistumisLuokka) {
            if (onkoAnimaatioKesken) return;
            onkoAnimaatioKesken = true;

            const vanhaKuva = kuvat[nykyinenIndeksi];
            const uusiKuva = kuvat[uusiIndeksi];

            // Varmistetaan, ettei uuteen kuvaan ole jäänyt vanhoja animaatioluokkia
            uusiKuva.className = ""; 

            // 1. Valmistellaan uusi kuva siirtämällä se reunan taakse piiloon ilman siirtymäaikaa
            uusiKuva.style.transition = "none";
            uusiKuva.classList.add(saapumisLuokka);

            // Pakotetaan alémman tason tyylipäivitys (reflow)
            uusiKuva.offsetHeight;

            // 2. Animoidaan uusi kuva sisään ja vanha kuva ulos tieltä
            uusiKuva.style.transition = "transform 0.35s ease-in-out, opacity 0.35s ease-in-out";
            uusiKuva.classList.add("active");
            uusiKuva.classList.remove(saapumisLuokka);
            
            vanhaKuva.classList.add(poistumisLuokka);

            // 3. Siivotaan luokat ja päivitetään indeksi kun animaatio päättyy
            setTimeout(() => {
                vanhaKuva.classList.remove("active", poistumisLuokka);
                nykyinenIndeksi = uusiIndeksi;
                onkoAnimaatioKesken = false;
            }, 350);
        }

        // Oikea nuoli: Seuraava kuva rullaa oikealta sisään, vanha väistyy vasemmalle
        seuraavaBtn.addEventListener("click", () => {
            let uusiIndeksi = nykyinenIndeksi + 1;
            if (uusiIndeksi >= kuvat.length) {
                uusiIndeksi = 0; // Looppaa ensimmäiseen kuvaan
            }
            vaihdaKuva(uusiIndeksi, "slide-in-right", "slide-out-left");
        });

        // Vasen nuoli: Edellinen kuva rullaa vasemmalta sisään, vanha väistyy oikealle
        edellinenBtn.addEventListener("click", () => {
            let uusiIndeksi = nykyinenIndeksi - 1;
            if (uusiIndeksi < 0) {
                uusiIndeksi = kuvat.length - 1; // Looppaa viimeiseen kuvaan
            }
            vaihdaKuva(uusiIndeksi, "slide-in-left", "slide-out-right");
        });
    }

});