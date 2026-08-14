(function () {
  "use strict";

  /* Sticky header */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add("is-sticky");
    } else {
      header.classList.remove("is-sticky");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Animated counters */
  var counters = document.querySelectorAll(".js-counter[data-target]");
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-target"));
    if (isNaN(target)) return;
    var duration = 2200;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString("en-US");
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString("en-US");
      }
    }
    requestAnimationFrame(step);
  }

  if (counters.length && "IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  /* Rotating hero word */
  var rotatingEl = document.querySelector(".rotating-word");
  if (rotatingEl) {
    var words = ["Consciousness", "Likeness", "Awareness", "Inclusive"];
    var wordIndex = 0;
    setInterval(function () {
      rotatingEl.style.opacity = 0;
      setTimeout(function () {
        wordIndex = (wordIndex + 1) % words.length;
        rotatingEl.textContent = words[wordIndex];
        rotatingEl.style.opacity = 1;
      }, 300);
    }, 6000);
  }

  /* Marquee: duplicate track contents for seamless loop */
  document.querySelectorAll(".marquee-track").forEach(function (track) {
    var items = track.children;
    if (items.length < 4) {
      track.innerHTML += track.innerHTML;
    }
  });

  /* Contact form -> mailto */
  var contactForm = document.querySelector(".js-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = {};
      var valid = true;
      contactForm.querySelectorAll("[name]").forEach(function (input) {
        if (input.value.trim() === "") {
          valid = false;
        }
        data[input.name] = input.value.trim();
      });
      if (!valid) {
        alert("Please fill in every field to send your message.");
        return;
      }
      var subject = encodeURIComponent("Order / Message via Godism website");
      var body = encodeURIComponent(
        "Name: " + (data.name || "") +
        "\nEmail: " + (data.email || "") +
        "\nPhone: " + (data.phone || "") +
        "\n\nMessage:\n" + (data.message || "")
      );
      window.location.href = "mailto:ufuomabernard@gmail.com?subject=" + subject + "&body=" + body;
      var note = contactForm.querySelector(".js-form-note");
      if (note) note.style.display = "block";
    });
  }
})();
