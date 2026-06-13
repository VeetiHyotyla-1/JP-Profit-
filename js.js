document.addEventListener('DOMContentLoaded', () => {
    
    // --- SPA-NÄKYMIEN VAIHTOLOOGIIKKA (TÄBITYS) ---
    const navLinks = document.querySelectorAll(".nav-link[data-target], .nav-logo[data-target]");
    const sivut = document.querySelectorAll(".sivu-nakyma");
    const menuLinks = document.querySelector('.nav-menu');
    const menu = document.querySelector('#mobile-menu');

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute("data-target");
            if (!targetId) return;

            // 1. Poistetaan aktiivisuus kaikilta linkeiltä ja lisätään klikatulle
            document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
            
            // Jos klikattiin valikon linkkiä (eikä logoa), korostetaan se active-luokalla
            if (link.classList.contains("nav-link")) {
                link.classList.add("active");
            } else {
                // Jos klikattiin logoa, asetetaan "Koti"-linkki aktiiviseksi navigoinnissa
                const kotiLinkki = document.querySelector(".nav-link[data-target='koti']");
                if (kotiLinkki) kotiLinkki.classList.add("active");
            }

            // 2. Piilotetaan kaikki näkymät ja tuodaan haluttu esiin
            sivut.forEach(sivu => {
                sivu.classList.remove("active-nakyma");
            });
            
            const kohdeSivu = document.getElementById(targetId);
            if (kohdeSivu) {
                kohdeSivu.classList.add("active-nakyma");
                // Kelataan sivu automaattisesti ylös, kun näkymä vaihtuu
                window.scrollTo({ top: 0, behavior: "instant" });
            }

            // 3. Suljetaan mobiilivalikko automaattisesti klikkauksen jälkeen (jos se on auki)
            if (menuLinks && menuLinks.classList.contains('active')) {
                menuLinks.classList.remove('active');
                if (menu) {
                    menu.classList.remove('is-active');
                    const icon = menu.querySelector("i");
                    if (icon) {
                        icon.classList.add("fa-bars");
                        icon.classList.remove("fa-times");
                    }
                }
            }
        });
    });

    // --- MOBIILIVALIKON TOIMINNALLISUUS ---
    if (menu && menuLinks) {
        menu.addEventListener('click', () => {
            menu.classList.toggle('is-active');
            menuLinks.classList.toggle('active');
            
            // Vaihdetaan myös hampurilaisikoni ruksiksi ja toisinpäin, jos käytössä
            const icon = menu.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }
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

            // Pakotetaan alemman tason tyylipäivitys (reflow)
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