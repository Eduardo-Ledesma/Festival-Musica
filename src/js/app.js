document.addEventListener('DOMContentLoaded', () => {
    appInit();
})

function appInit() {
    fixedNav();
    createGalery();
    scrollNav();
}

function fixedNav() {
    const bar = document.querySelector('.bg-color-header');
    const aboutFestival = document.querySelector('.bg-color-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', () => {
        if(aboutFestival.getBoundingClientRect().top < 0) {
            bar.classList.add('fixed');
            body.classList.add('body-scroll');
        } else {
            bar.classList.remove('fixed');
            body.classList.remove('body-scroll');
        }
    })
}

function scrollNav() {
    const links = document.querySelectorAll('#link');
    links.forEach( link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = document.querySelector(e.target.attributes.href.value)
            section.scrollIntoView({behavior: 'smooth'});
        })
            
    })
}

function createGalery() {
    const ulGalery = document.querySelector('.img-galery');
    
    for(let i = 1; i <= 12; i++) {
        const picture = document.createElement('PICTURE');
        picture.classList.add('border-galery-img');
        picture.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen Galeria">
        `;

        picture.onclick = () => {
            openModal(i)
        }
        ulGalery.appendChild(picture)
    }
}

function openModal(img) {
    const picture = document.createElement('PICTURE');
    picture.innerHTML = `
    <source srcset="build/img/grande/${img}.avif" type="image/avif">
    <source srcset="build/img/grande/${img}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${img}.jpg" alt="Imagen Galeria">
    `;

    const btnClose = document.createElement('P');
    btnClose.textContent = 'X';
    btnClose.classList.add('btn-close');
    btnClose.onclick = () => {
        overlay.remove();
        body.classList.remove('fixed-body');    
    }

    const overlay = document.createElement('DIV');
    overlay.classList.add('overlay');
    overlay.onclick = () => {
        overlay.remove()
        body.classList.remove('fixed-body'); 
    }

    overlay.appendChild(picture);
    overlay.appendChild(btnClose);
    
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fixed-body');    
}