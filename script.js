/* Dhanam Driving School — GSAP + Parallax */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Mobile nav ---
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");
  const header = document.querySelector(".header");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // --- Header glass on scroll ---
  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  // --- Smooth anchors ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  // --- Booking form → WhatsApp ---
  const WHATSAPP_FALLBACK = "919876543210";

  function getWhatsAppNumber() {
    const link = document.querySelector(".booking__contacts a[href*='wa.me']");
    const match = link?.href.match(/wa\.me\/(\d+)/);
    return match ? match[1] : WHATSAPP_FALLBACK;
  }

  function getSelectLabel(select) {
    if (!select || !select.value) return "—";
    const option = select.options[select.selectedIndex];
    return option.textContent.trim();
  }

  function buildWhatsAppMessage(fields) {
    const lines = [
      "New lesson request — Dhanam Driving School",
      "",
      "Name: " + fields.name,
      "Phone: " + fields.phone,
    ];
    if (fields.email) lines.push("Email: " + fields.email);
    lines.push("Course: " + fields.course);
    lines.push("Area: " + fields.area);
    return lines.join("\n");
  }

  const form = document.querySelector(".booking__form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("#name");
      const phone = form.querySelector("#phone");
      const email = form.querySelector("#email");
      const course = form.querySelector("#course");
      const area = form.querySelector("#area");
      let valid = true;

      form.querySelectorAll(".form-field__error").forEach((el) => el.remove());

      if (!name.value.trim()) {
        showError(name, "Please enter your name");
        valid = false;
      }
      if (!phone.value.trim() || phone.value.replace(/\D/g, "").length < 10) {
        showError(phone, "Please enter a valid phone number");
        valid = false;
      }

      if (!valid) return;

      const message = buildWhatsAppMessage({
        name: name.value.trim(),
        phone: phone.value.trim(),
        email: email?.value.trim() || "",
        course: getSelectLabel(course),
        area: getSelectLabel(area),
      });

      const waUrl =
        "https://wa.me/" +
        getWhatsAppNumber() +
        "?text=" +
        encodeURIComponent(message);

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = "Opening WhatsApp…";
      btn.disabled = true;

      window.open(waUrl, "_blank", "noopener,noreferrer");

      btn.textContent = "Request sent";
      btn.style.background = "linear-gradient(145deg, #1f7a6f, #0a3531)";

      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = "";
        form.reset();
      }, 2800);
    });
  }

  function showError(input, message) {
    const error = document.createElement("span");
    error.className = "form-field__error";
    error.textContent = message;
    error.setAttribute("role", "alert");
    input.parentElement.appendChild(error);
    input.style.borderColor = "#b42318";
    input.addEventListener(
      "input",
      () => {
        error.remove();
        input.style.borderColor = "";
      },
      { once: true }
    );
  }

  // --- GSAP animations ---
  if (reduceMotion || typeof gsap === "undefined") {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .from(".hero__img", { scale: 1.22, duration: 2.2 }, 0)
    .from(
      ".hero__content [data-reveal]",
      {
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.14,
      },
      0.25
    )
    .from(
      ".hero__scroll-line",
      {
        scaleY: 0,
        duration: 1,
        ease: "power2.out",
      },
      0.9
    )
    .from(
      ".hero__scroll span",
      {
        opacity: 0,
        y: -8,
        duration: 0.6,
      },
      1.1
    );

  // Continuous scroll indicator pulse
  gsap.to(".hero__scroll-line", {
    scaleY: 0.55,
    transformOrigin: "top",
    duration: 1.4,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: 2,
  });

  // Parallax layers
  document.querySelectorAll("[data-speed]").forEach((layer) => {
    const speed = parseFloat(layer.getAttribute("data-speed")) || 0.3;
    gsap.to(layer, {
      y: () => ScrollTrigger.maxScroll(window) * speed * 0.08,
      ease: "none",
      scrollTrigger: {
        trigger: layer.closest("section") || layer,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // Stronger hero parallax (media moves slower than scroll)
  gsap.to(".hero__media", {
    yPercent: 28,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.to(".hero__content", {
    yPercent: 18,
    opacity: 0.35,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // Section reveals
  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    if (el.closest(".hero__content")) return;
    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  // Course image slight scale on scroll
  gsap.utils.toArray(".course__visual img").forEach((img) => {
    gsap.fromTo(
      img,
      { scale: 1.12 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest(".course__visual"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  // Parallax band text drift
  gsap.fromTo(
    ".parallax-band__copy",
    { y: 60 },
    {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-band",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
})();
