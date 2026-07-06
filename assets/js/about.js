/* ================================
   SlabWay About Page JavaScript
   File: assets/js/about.js
   ================================ */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", initAboutPage);

    function initAboutPage() {
        initAboutProcessSwiper();
        initAboutRevealBoard();
        initAboutStoryPhotos();
        refreshIcons();
    }

    function refreshIcons() {
        if (window.SlabWayIcons && typeof window.SlabWayIcons.refresh === "function") {
            window.SlabWayIcons.refresh();
            return;
        }

        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function icon(name) {
        return `<i data-lucide="${escapeHtml(name)}" aria-hidden="true"></i>`;
    }

    /* ================================
       About Process Swiper
       ================================ */

    function initAboutProcessSwiper() {
        const swiperElement = document.querySelector("[data-about-process-swiper]");
        const wrapper = document.querySelector("[data-about-process-wrapper]");

        if (!swiperElement || !wrapper) return;

        const steps = [
            {
                number: "01",
                title: "Request details are organized",
                icon: "clipboard-list",
                text:
                    "The request flow helps homeowners describe category, scope, surface condition, access, timeline, and finish expectations in one place."
            },
            {
                number: "02",
                title: "Provider options can be compared",
                icon: "git-compare-arrows",
                text:
                    "Participating providers are independent, so their pricing, scheduling, scope, warranty terms, and availability may differ."
            },
            {
                number: "03",
                title: "Questions stay homeowner-focused",
                icon: "message-square-text",
                text:
                    "Homeowners can ask each provider about preparation, removal, finish type, timing, insurance, license details, and final written terms."
            },
            {
                number: "04",
                title: "The next step is your choice",
                icon: "mouse-pointer-click",
                text:
                    "Submitting a request does not create a service agreement. You decide whether to continue, compare further, or stop."
            },
            {
                number: "05",
                title: "Platform language stays clear",
                icon: "shield-check",
                text:
                    "SlabWay is not a concrete contractor and does not perform, supervise, inspect, warrant, or guarantee provider work."
            }
        ];

        wrapper.innerHTML = steps
            .map(
                (step) => `
          <div class="swiper-slide">
            <article class="about-process-card">
              <span class="about-process-card__number">${escapeHtml(step.number)}</span>

              <div class="about-process-card__icon">
                ${icon(step.icon)}
              </div>

              <div>
                <h3>${escapeHtml(step.title)}</h3>
                <p>${escapeHtml(step.text)}</p>
              </div>
            </article>
          </div>
        `
            )
            .join("");

        const section = swiperElement.closest(".about-process-swiper");
        const pagination = section ? section.querySelector("[data-about-process-pagination]") : null;
        const nextButton = section ? section.querySelector("[data-about-process-next]") : null;
        const prevButton = section ? section.querySelector("[data-about-process-prev]") : null;

        if (window.SlabWaySwiper) {
            window.SlabWaySwiper.create(swiperElement, {
                loop: true,
                spaceBetween: 18,
                slidesPerView: 1,
                pagination: pagination
                    ? {
                        el: pagination,
                        type: "fraction"
                    }
                    : undefined,
                navigation:
                    nextButton && prevButton
                        ? {
                            nextEl: nextButton,
                            prevEl: prevButton
                        }
                        : undefined,
                breakpoints: {
                    640: {
                        slidesPerView: 1.08,
                        spaceBetween: 18
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 22
                    }
                }
            });
        }

        refreshIcons();
    }

    /* ================================
       Reveal Board Accessibility
       ================================ */

    function initAboutRevealBoard() {
        const cards = document.querySelectorAll(".about-reveal-board__item");

        cards.forEach((card) => {
            card.setAttribute("tabindex", "0");

            card.addEventListener("keydown", (event) => {
                if (event.key !== "Enter" && event.key !== " ") return;

                event.preventDefault();

                cards.forEach((item) => {
                    if (item !== card) {
                        item.classList.remove("is-keyboard-active");
                    }
                });

                card.classList.toggle("is-keyboard-active");
            });
        });
    }

    /* ================================
       About Story Photo Emphasis
       ================================ */

    function initAboutStoryPhotos() {
        const section = document.querySelector("[data-about-story]");
        if (!section) return;

        const photos = Array.from(section.querySelectorAll("[data-about-story-photo]"));
        const notes = Array.from(section.querySelectorAll("[data-about-story-note]"));

        if (!photos.length || !notes.length) return;

        const activate = (key) => {
            photos.forEach((photo) => {
                photo.classList.toggle(
                    "is-active",
                    photo.getAttribute("data-about-story-photo") === key
                );
            });

            notes.forEach((note) => {
                note.classList.toggle(
                    "is-active",
                    note.getAttribute("data-about-story-note") === key
                );
            });
        };

        notes.forEach((note) => {
            const key = note.getAttribute("data-about-story-note");

            note.addEventListener("mouseenter", () => activate(key));
            note.addEventListener("focus", () => activate(key));
            note.addEventListener("click", () => activate(key));
        });

        photos.forEach((photo) => {
            const key = photo.getAttribute("data-about-story-photo");

            photo.addEventListener("mouseenter", () => activate(key));
            photo.addEventListener("focusin", () => activate(key));
        });

        activate(notes[0].getAttribute("data-about-story-note"));
    }
})();