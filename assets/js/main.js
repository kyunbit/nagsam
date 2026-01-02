/**
* Template Name: Bikin - v4.7.0
* Template URL: https://bootstrapmade.com/bikin-free-simple-landing-page-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Load a script only when needed.
   */
  const loadScript = (src) => new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.defer = true
    s.onload = resolve
    s.onerror = reject
    document.head.appendChild(s)
  })

  const onWindowLoad = (fn) => {
    if (document.readyState === 'complete') {
      fn()
    } else {
      window.addEventListener('load', fn)
    }
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  const initPortfolioIsotope = () => {
    onWindowLoad(() => {
      let portfolioContainer = select('.portfolio-container')
      if (portfolioContainer && window.Isotope) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item'
        })

        let portfolioFilters = select('#portfolio-flters li', true)

        on('click', '#portfolio-flters li', function(e) {
          e.preventDefault()
          portfolioFilters.forEach(function(el) {
            el.classList.remove('filter-active')
          })
          this.classList.add('filter-active')

          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          })
          portfolioIsotope.on('arrangeComplete', function() {
            if (window.AOS) {
              AOS.refresh()
            }
          })
        }, true)
      }
    })
  }

  const initPortfolioLightbox = () => {
    if (window.GLightbox) {
      GLightbox({
        selector: '.portfolio-lightbox'
      })
    }
  }

  const initPortfolioDetailsSlider = () => {
    if (window.Swiper) {
      new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      })
    }
  }

  const initTestimonialsSlider = () => {
    if (window.Swiper) {
      new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },

          1200: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        }
      })
    }
  }

  const initAOS = () => {
    onWindowLoad(() => {
      if (window.AOS) {
        AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        })
      }
    })
  }

  const initBizzbar = () => {
    if (!window.jQuery || !jQuery.fn || !jQuery.fn.effect) {
      return
    }

    jQuery(function($) {
      $('open').on('click', function() {
        $('#bizzbar').effect('bounce', 'slow')
        $('open').slideUp()
      })
      $('#bizzbar').effect('bounce', 'slow')
      $('close').on('click', function() {
        $('#bizzbar').slideUp()
        $('open').slideDown()
      })
    })
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const hasPortfolio = !!select('.portfolio-container')
    const hasPortfolioLightbox = !!select('.portfolio-lightbox')
    const hasPortfolioDetails = !!select('.portfolio-details-slider')
    const hasTestimonials = !!select('.testimonials-slider')
    const hasAOS = !!document.querySelector('[data-aos]')
    const hasEmailForm = !!select('.php-email-form')
    const hasBizzbar = !!select('#bizzbar')

    if (hasAOS) {
      await loadScript('assets/vendor/aos/aos.js')
      initAOS()
    }

    if (hasPortfolio) {
      await loadScript('assets/vendor/isotope-layout/isotope.pkgd.min.js')
      initPortfolioIsotope()
    }

    if (hasPortfolioLightbox) {
      await loadScript('assets/vendor/glightbox/js/glightbox.min.js')
      initPortfolioLightbox()
    }

    if (hasPortfolioDetails || hasTestimonials) {
      await loadScript('assets/vendor/swiper/swiper-bundle.min.js')
    }

    if (hasPortfolioDetails) {
      initPortfolioDetailsSlider()
    }

    if (hasTestimonials) {
      initTestimonialsSlider()
    }

    if (hasEmailForm) {
      await loadScript('assets/vendor/php-email-form/validate.js')
    }

    if (hasBizzbar) {
      await loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js')
      await loadScript('https://ajax.googleapis.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js')
      initBizzbar()
    }
  })

})()
