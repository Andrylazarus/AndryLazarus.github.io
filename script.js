'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(t => t.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


btnScrollTo.addEventListener('click', (e) => {
  const s1 = section1.getBoundingClientRect();
  console.log(s1);

  // offset method y nya between top view port dengan paling atas web nya
  // getbounding diitung dari posisi e nya ke view port
  console.log(e.target.getBoundingClientRect());
  console.log('current scroll x/y', window.pageXOffset, window.pageYOffset);

  // console.log('height/width viewport', document.documentElement.clientHeight,
  // document.documentElement.clientWidth
  // );

  // scroll

  console.log(s1.left + window.pageXOffset, s1.top + window.pageYOffset);
  // window.scrollTo({
  //  left: s1.left + window.pageXOffset,
  //  top: s1.top + window.pageYOffset,
  //  behavior: 'smooth'
  // });

  // modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});


// page navigation

// document.querySelectorAll('.nav__link').forEach((value) => {
//   value.addEventListener('click', function(e) {
//     e.preventDefault();
//     const id = e.target.getAttribute('href');

//     console.log('GOOTCHA', e.target);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// console.log(section1);

// 1. add event to commont parent element
// 2. determine what originated the event

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();
  // matching teknik
  if(e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        console.log('GOOTCHA', id);
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  };
});

// tab component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');
  const active = 'operations__tab--active';
  // jadi parent maksimal ini kalo pencet children nya keluarnya parent nya 
  // dan jika pencet parent jadi target ini 
  // maka hasil nya akan null karena parent nya adalah target ini
  e.preventDefault();
  
  // guard clause
  if(!clicked) return;

  console.log(clicked);
  // remove all classes
  tabs.forEach(e => {
    if(e.classList.contains(active)) {
      e.classList.remove(active);
    };
  });
  tabsContent.forEach(e => 
    e.classList.remove('operations__content--active')
    );

  // active tab

  clicked.classList.add(active);
  //  console.log(`${clicked ? 'true' : 'false'}`);

  // active content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});


// menu fade Animation /////////////

const bluran = function (e) {
  if(e.target.classList.contains('nav__link')){
    const clicked = e.target;
    const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
    const logo = clicked.closest('.nav').querySelector('img');
    siblings.forEach(e => {
      if(e !== clicked) e.style.opacity = this;
    });
      logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', bluran.bind(0.5));

nav.addEventListener('mouseout', bluran.bind(1));


// sticky navigation
const initialCor = section1.getBoundingClientRect();

// window.addEventListener('scroll', function(e) {
//   if (window.scrollY > initialCor.top) 
//   nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });


// intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(e => {
//     console.log(e);
//   });
// }

// const obsOption = {
//   root: null,
//   threshold: [0, 0.01],
// }

// const observer = new IntersectionObserver(obsCallback, obsOption);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function(entries) {
  const [destuck] = entries;

  if (destuck.isIntersecting === false) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}


const headerObserver = new IntersectionObserver
(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);


// reveal section /////////
const selectorSection = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
  console.log(entries);
const [entry] = entries;
console.log(entry);

if (!entry.isIntersecting) return;
entry.target.classList.remove('section--hidden');

observer.unobserve(entry.target); //unobserve
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.20,
});

selectorSection.forEach(value => {
  sectionObserver.observe(value);
  value.classList.add('section--hidden');
});


// lazy loading img
const imgAll = document.querySelectorAll('img[data-src]');

const imgFungsi = function (entries, observer) {
  const [entry] = entries;
  console.log(entry.target);

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};


const imgObserver = new IntersectionObserver(imgFungsi, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgAll.forEach(value => {
  imgObserver.observe(value);
});



// sliders///////////////////////////////

const sliders = function () {
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slider = document.querySelector('.slider');
const dotsContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlides = slides.length;




// functions
const createDots = function() {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML('beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`);
  });
}

const goToSlide = function (currentSlide) {
  slides.forEach((e, i)=> {
    e.style.transform = `translateX(${100 * (i - currentSlide)}%)`;

    // cth : 100 * 0 - 0 = 0%, 100 * 0 - 1 = -100%, 100 * 0 - 2 = -200% dan balik lagi
    // cth : 100 * 1 - 0 = 100%, 100 * 1 - 1 = 0%, 100 * 1 - 2 = -100% dan balik lagi
    // cth : 100 * 2 - 0 = 200%, 100 * 2 - 1 = 100%, 100 * 2 - 2 = 0% dan balik lagi
  });
}

const activeDots = function(slides) {
  const allDots = document.querySelectorAll('.dots__dot');
  const activated = document.querySelector(`.dots__dot[data-slide="${slides}"]`);
  allDots.forEach(e => {
    e.classList.remove('dots__dot--active');
  });

  activated.classList.add
  ('dots__dot--active');
};

const nextSlide = function () {
  if(currentSlide === maxSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activeDots(currentSlide);
}

const previousSlide = function () {
  if(currentSlide === 0) {
    currentSlide = maxSlides - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activeDots(currentSlide);
}

const init = function() {
  createDots();
  activeDots(0);
  goToSlide(0);
  setInterval(nextSlide, 10000);
}
 
init();

// event handlers slide
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);


dotsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset;
    const dots = dotsContainer.children;
    goToSlide(slide);
    activeDots(slide);
  };
});

// gw buat sndiri
const section3 = document.querySelector('#section--3');
// const s3 = section3.getBoundingClientRect();


const fungsitunggal = function (e) {
  console.log(e);
  if (e.key === 'ArrowLeft') previousSlide();
  if (e.key === 'ArrowRight') nextSlide();
}

const section3Function = function (entries, observer) {
  const [entry] = entries;
  console.log(entry.isIntersecting);

  if (entry.isIntersecting === true) {
    document.addEventListener('keydown',fungsitunggal);
  } else if (!entry.isIntersecting) {
    document.removeEventListener('keydown', fungsitunggal);
  }
}

const section3Observer = new IntersectionObserver(section3Function, {
  root: null,
  threshold: 0,
});

section3Observer.observe(section3);
};

sliders();













































  // const logo = document.querySelector('#logo');
  // const navLinks = document.querySelectorAll('.nav__link');
  // navLinks.forEach(e => {
  //   e.style.opacity = 1.0;
  // }); 
  // logo.style.opacity = 1.0;


// // SELECTING ELEMENTS
// console.log(document.documentElement);
// console.log(document.head);

// // uda ke store ke variabel
// const allSection = document.querySelectorAll('.section');

// console.log(allSection);

// // HTML collection tidak disimpan di variabel jadi kalau element hilang, automatic update
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);


// // Creating and Inserting elements
// const header = document.querySelector('header');
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = 'You are being added from previously <button class="btn btn--close-cookie"> Got it </button>';

// // prepend : firstchild
// // append : lastChild BISA BUSA MOVE ELEMENT
// header.prepend(message);
// header.append(message);

// // header.before(message);
// // header.after(message);

// // DELETE ELEMENTS
// document.querySelector('.btn--close-cookie').addEventListener('click', function() {
//   // message.remove();
//   message.parentElement.removeChild(message);
// });


// // Styles
// message.style.backgroundColor = 'yellow';
// message.style.width = '120%';

// // tidak bisa yang didalam class hanya bisa yang dibuat diatas ini
// console.log(message.style.height);
// console.log(message.style.backgroundColor);
 
// // ini bisa liat dari web page nya
// console.log(getComputedStyle(message).height); // 50px
// console.log(getComputedStyle(message).color);

// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 20 + 'px';
// console.log(message.style.height);

// // change css variabel
// document.documentElement.style.setProperty('--color-primary', 'orange');


// // atribute contoh: src, dll
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.className);



// logo.alt = 'beautiful minimalist logo';

// // non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// // data atribute
// console.log(logo.dataset.versionNumber);


// // classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c');


// // add event listener
// const h1 = document.querySelector('h1');
// const alertH1 =  function(e) {
//   alert('WATEFAKE MEN');
// };


// h1.addEventListener('mouseenter',alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter',alertH1), 3000);

// // h1.onmouseenter = function(e) {
// //   alert('WATEFAKE MEN');
// // };


// // propagate
//  const randomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
//  };

//  const randomColor = () => {
//    return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
//  };

//  console.log(randomColor());

//  const navLink = document.querySelector('.nav__link');
// navLink.addEventListener('click', (e) => {
//    e.preventDefault();
//     navLink.style.backgroundColor = randomColor();
//     console.log('LINK', e.currentTarget === navLink);
//  });

//  document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.currentTarget === this);
//  });

//  document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.currentTarget);
//  });

//  e.stopPropagation();

 //////////////////////////////////// traversing
 const h1 = document.querySelector('h1'); // parent

//  // find children
//  console.log(h1.querySelectorAll('.highlight'));
//  console.log(h1.children);

//  h1.firstElementChild.style.color = 'white';
//  h1.lastElementChild.style.color = 'red';

//  // find parents
// //  console.log(h1.parentNode);
// //  console.log(h1.parentElement);

//  console.log(h1.closest('.header__title'));
//  h1.closest('h1').style.background = 'orange';


//  // find siblings
//  console.log(h1.previousElementSibling);
//  console.log(h1.nextElementSibling);

//  console.log(h1.parentElement.children);

//  const newbie = [...h1.parentElement.children].map(e => {
//    if(e !== h1) e.style.transform = 'scale(0.5)';
//    console.log(e);
// });


document.addEventListener('DOMcontentLoaded', function(e) {
  console.log('HTML parsed')
});

window.addEventListener('load', function(e) {
  console.log('loaded', e);
});

// window.addEventListener('beforeunload', function(e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });