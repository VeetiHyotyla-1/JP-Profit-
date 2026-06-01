document.addEventListener('DOMContentLoaded', () => {
    
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-menu');

    if (menu && menuLinks) {
        menu.addEventListener('click', () => {
            menu.classList.toggle('is-active');
            menuLinks.classList.toggle('active');
            console.log('Mobiilivalikkoa klikattu!'); 
        });
    }

});