/* ================================
   SlabWay All Services JavaScript
   File: assets/js/all-services.js
   ================================ */

(function () {
    "use strict";

    const config = window.SLABWAY_CONFIG || {};
    const services = Array.isArray(config.services) ? config.services : [];

    document.addEventListener("DOMContentLoaded", initAllServicesPage);

    function initAllServicesPage() {
        initCatalogOverviewCards();
        initCatalogShowcase();
        initCatalogSwiper();
        initCatalogFinishSwitch();
        initCatalogRevealAccessibility();
        initCatalogNavigator();
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
       Section 1 — Overview Cards
       ================================ */

    function initCatalogOverviewCards() {
        const container = document.querySelector("[data-catalog-overview-grid]");
        if (!container || !services.length) return;

        container.innerHTML = services
            .map(
                (service, index) => `
          <a
            class="catalog-overview__card card-shine"
            href="${escapeHtml(service.url)}"
            style="--catalog-image: url('${escapeHtml(service.image)}')"
            data-aos="fade-up"
            data-aos-delay="${(index % 3) * 70}"
          >
            <span class="catalog-overview__icon">
              ${icon(service.icon || "square-stack")}
            </span>

            <span class="catalog-overview__content">
              <h3>${escapeHtml(service.name)}</h3>
              <p>${escapeHtml(service.summary)}</p>
              <span>View category</span>
            </span>
          </a>
        `
            )
            .join("");

        refreshIcons();
    }

    /* ================================
       Section 2 — Interactive Showcase
       ================================ */

    function initCatalogShowcase() {
        const section = document.querySelector("[data-catalog-showcase]");
        const list = document.querySelector("[data-catalog-showcase-list]");
        const photo = document.querySelector("[data-catalog-showcase-photo]");

        if (!section || !list || !photo || !services.length) return;

        list.innerHTML = services
            .map(
                (service, index) => `
          <button
            class="catalog-showcase__button ${index === 0 ? "is-active" : ""}"
            type="button"
            data-catalog-showcase-service="${escapeHtml(service.id)}"
          >
            <span>
              <strong>${escapeHtml(service.name)}</strong>
              <small>${escapeHtml(service.summary)}</small>
            </span>
            ${icon(service.icon || "arrow-up-right")}
          </button>
        `
            )
            .join("");

        const renderPhoto = (service) => {
            photo.style.setProperty("--showcase-image", `url('${service.image}')`);

            photo.innerHTML = `
        <a class="catalog-showcase__photo-content" href="${escapeHtml(service.url)}">
          <span class="catalog-showcase__photo-icon">
            ${icon(service.icon || "square-stack")}
          </span>

          <h3>${escapeHtml(service.name)}</h3>
          <p>${escapeHtml(service.detail || service.summary)}</p>

          <span class="btn btn-primary">
            Open Category
            ${icon("arrow-up-right")}
          </span>
        </a>
      `;

            refreshIcons();
        };

        const activate = (serviceId) => {
            const service = services.find((item) => item.id === serviceId) || services[0];

            list.querySelectorAll("[data-catalog-showcase-service]").forEach((button) => {
                button.classList.toggle(
                    "is-active",
                    button.getAttribute("data-catalog-showcase-service") === service.id
                );
            });

            renderPhoto(service);
        };

        list.addEventListener("click", (event) => {
            const button = event.target.closest("[data-catalog-showcase-service]");
            if (!button) return;

            activate(button.getAttribute("data-catalog-showcase-service"));
        });

        list.addEventListener("mouseover", (event) => {
            const button = event.target.closest("[data-catalog-showcase-service]");
            if (!button || window.innerWidth <= 768) return;

            activate(button.getAttribute("data-catalog-showcase-service"));
        });

        activate(services[0].id);
    }

    /* ================================
       Section 3 — Category Swiper
       ================================ */

    function initCatalogSwiper() {
        const swiperElement = document.querySelector("[data-catalog-swiper]");
        const wrapper = document.querySelector("[data-catalog-swiper-wrapper]");

        if (!swiperElement || !wrapper || !services.length) return;

        wrapper.innerHTML = services
            .map(
                (service) => `
          <div class="swiper-slide">
            <a
              class="catalog-swiper-card card-shine"
              href="${escapeHtml(service.url)}"
              style="--catalog-swiper-image: url('${escapeHtml(service.image)}')"
            >
              <span class="catalog-swiper-card__icon">
                ${icon(service.icon || "square-stack")}
              </span>

              <span class="catalog-swiper-card__content">
                <h3>${escapeHtml(service.name)}</h3>
                <p>${escapeHtml(service.summary)}</p>
                <span class="icon-link">
                  View Details
                  ${icon("arrow-right")}
                </span>
              </span>
            </a>
          </div>
        `
            )
            .join("");

        const section = swiperElement.closest(".catalog-swiper");
        const pagination = section ? section.querySelector("[data-catalog-swiper-pagination]") : null;
        const nextButton = section ? section.querySelector("[data-catalog-swiper-next]") : null;
        const prevButton = section ? section.querySelector("[data-catalog-swiper-prev]") : null;

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
                        slidesPerView: 1.1
                    },
                    768: {
                        slidesPerView: 2
                    },
                    1120: {
                        slidesPerView: 3
                    }
                }
            });
        }

        refreshIcons();
    }

    /* ================================
       Section 7 — Finish Hover Switch
       ================================ */

    function initCatalogFinishSwitch() {
        const section = document.querySelector("[data-catalog-finish]");
        if (!section) return;

        const photos = Array.from(section.querySelectorAll("[data-catalog-finish-photo]"));
        const chips = Array.from(section.querySelectorAll("[data-catalog-finish-chip]"));
        const text = section.querySelector("[data-catalog-finish-text]");

        if (!photos.length || !chips.length) return;

        const content = {
            smooth:
                "Smooth finish requests are easier to compare when homeowners prepare notes about surface use, size, access, preparation, and provider-supplied maintenance terms.",
            brushed:
                "Brushed finish requests may involve traction expectations, outdoor use, drainage, connection points, and provider-specific finishing details.",
            stamped:
                "Stamped concrete comparison can include pattern preference, color direction, sealant terms, maintenance notes, and whether the surface is for a patio, walkway, or driveway.",
            repair:
                "Repair-focused requests may require provider assessment. Useful notes include cracks, uneven areas, surface wear, drainage issues, and photos when available."
        };

        const activate = (key) => {
            chips.forEach((chip) => {
                chip.classList.toggle(
                    "is-active",
                    chip.getAttribute("data-catalog-finish-chip") === key
                );
            });

            photos.forEach((photo) => {
                photo.classList.toggle(
                    "is-active",
                    photo.getAttribute("data-catalog-finish-photo") === key
                );
            });

            if (text && content[key]) {
                text.textContent = content[key];
            }
        };

        chips.forEach((chip) => {
            const key = chip.getAttribute("data-catalog-finish-chip");

            chip.addEventListener("mouseenter", () => activate(key));
            chip.addEventListener("focus", () => activate(key));
            chip.addEventListener("click", () => activate(key));
        });

        photos.forEach((photo) => {
            const key = photo.getAttribute("data-catalog-finish-photo");

            photo.addEventListener("mouseenter", () => activate(key));
            photo.addEventListener("focusin", () => activate(key));
        });

        activate(chips[0].getAttribute("data-catalog-finish-chip"));
    }

    /* ================================
       Section 5 — Reveal Accessibility
       ================================ */

    function initCatalogRevealAccessibility() {
        const cards = document.querySelectorAll(".catalog-icon-reveal__item");

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
       Section 10 — Final Navigator
       ================================ */

    function initCatalogNavigator() {
        const rows = document.querySelector("[data-catalog-navigator-rows]");
        if (!rows || !services.length) return;

        rows.innerHTML = services
            .map(
                (service) => `
          <a class="catalog-navigator__row" href="${escapeHtml(service.url)}">
            ${icon(service.icon || "square-stack")}
            <span>
              <strong>${escapeHtml(service.name)}</strong>
              <span>${escapeHtml(service.summary)}</span>
            </span>
            <span class="catalog-navigator__arrow" aria-hidden="true">→</span>
          </a>
        `
            )
            .join("");

        refreshIcons();
    }
})();