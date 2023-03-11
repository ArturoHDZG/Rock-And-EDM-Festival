'use strict';

document.addEventListener('DOMContentLoaded', function () {
  startApp();
});

function startApp() {
  fixedNav();
  createGallery();
  scrollNav();
}

function fixedNav() {
  const bar = document.querySelector('.header');
  const scrolling = document.querySelector('.about-festival');
  const body = document.querySelector('body');

  window.addEventListener('scroll', function () {
    if (scrolling.getBoundingClientRect().top < 0) {
      bar.classList.add('fixed-scrollbar');
      body.classList.add('fixed-body');
    } else {
      bar.classList.remove('fixed-scrollbar');
      body.classList.remove('fixed-body');
    }
  });

}

function scrollNav() {
  const links = document.querySelectorAll('.main-navigation a');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const sectionScroll = e.target.attributes.href.value;
      const section = document.querySelector(sectionScroll);

      section.scrollIntoView({behavior: 'smooth'});
    });
  });
}

function createGallery() {
  const gallery = document.querySelector('.gallery-images');

  for (let i = 1; i <= 12; i++) {
    const image = document.createElement('picture');
    image.innerHTML =
      `<source srcset="build/img/thumb/${i}.avif" type="image/avif">
       <source srcset="build/img/thumb/${i}.webp" type="image/webp">
       <img loading="lazy" width="200" height="300" src="/img/thumb/${i}.jpg" alt="Gallery Thumb Images">`;

    image.onclick = function () {
      showImage(i);
    }

    gallery.appendChild(image);
  }
}

function showImage(id) {
  const image = document.createElement('picture');

  image.innerHTML =
    `<source srcset="build/img/grande/${id}.avif" type="image/avif">
     <source srcset="build/img/grande/${id}.webp" type="image/webp">
     <img loading="lazy" width="200" height="300" src="/img/grande/${id}.jpg" alt="Gallery Images">`;

  // Create Image Overlay
  const overlay = document.createElement('DIV');

  overlay.appendChild(image);
  overlay.classList.add('gallery-overlay');
  overlay.onclick = function () {
    const body = document.querySelector('body');

    body.classList.remove('body-hold');
    overlay.remove();
  }

  // Kill Overlay
  const closeImage = document.createElement('P');

  closeImage.textContent = 'X';
  closeImage.classList.add('btn-close');
  closeImage.onclick = function () {
    const body = document.querySelector('body');

    body.classList.remove('body-hold');
    overlay.remove();
  };
  overlay.appendChild(closeImage);

  // Attach Overlay over HTML
  const body = document.querySelector('body');

  body.appendChild(overlay);
  body.classList.add('body-hold');
}