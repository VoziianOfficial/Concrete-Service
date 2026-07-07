/* ================================
   SlabWay Homepage JavaScript
   File: assets/js/home.js
   ================================ */

(function () {
    "use strict";

    const config = window.SLABWAY_CONFIG || {};
    const services = Array.isArray(config.services) ? config.services : [];

    document.addEventListener("DOMContentLoaded", initHomePage);

    function initHomePage() {
        initHomeServiceSwiper();
        initHomeScenarioSwiper();
        initHomeDualPhotoSwitch();
        initHomeNavigator();
        initHomeHoverPanels();
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
       Home Service Swiper
       ================================ */

    function initHomeServiceSwiper() {
        const swiperElement = document.querySelector("[data-home-service-swiper]");
        const wrapper = document.querySelector("[data-home-service-swiper-wrapper]");

        if (!swiperElement || !wrapper || !services.length) return;

        wrapper.innerHTML = services
            .map(
                (service) => `
          <div class="swiper-slide">
            <a class="home-service-card card-shine" href="${escapeHtml(service.url)}" style="--service-image: url('${escapeHtml(service.image)}')">
              <span class="home-service-card__icon">
                ${icon(service.icon || "square-stack")}
              </span>

              <span class="home-service-card__content">
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

        const pagination = swiperElement
            .closest(".home-service-swiper")
            ?.querySelector("[data-home-service-pagination]");

        const nextButton = swiperElement
            .closest(".home-service-swiper")
            ?.querySelector("[data-home-service-next]");

        const prevButton = swiperElement
            .closest(".home-service-swiper")
            ?.querySelector("[data-home-service-prev]");

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
                        slidesPerView: 1.15,
                        spaceBetween: 18
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 22
                    }
                }
            });
        }

        refreshIcons();
    }

    /* ================================
       Home Scenario Swiper
       ================================ */

    function initHomeScenarioSwiper() {
        const swiperElement = document.querySelector("[data-home-scenario-swiper]");
        const wrapper = document.querySelector("[data-home-scenario-wrapper]");

        if (!swiperElement || !wrapper) return;

        const scenarios = [
            {
                title: "Cracked driveway",
                tag: "Repair or replacement request",
                icon: "split-square-horizontal",
                text:
                    "Prepare notes about crack location, surface age, drainage concerns, access, and whether you want repair-focused or replacement-focused provider options.",
                url: "concrete-driveways.html"
            },
            {
                title: "New patio area",
                tag: "Outdoor living surface",
                icon: "layout-panel-top",
                text:
                    "Before comparing options, gather approximate patio size, backyard access details, finish preferences, and how the surface connects to existing areas.",
                url: "concrete-patios.html"
            },
            {
                title: "Small slab for shed",
                tag: "Utility slab request",
                icon: "box",
                text:
                    "Useful details may include slab purpose, approximate dimensions, site levelness, access route, and any load or placement expectations to discuss with providers.",
                url: "concrete-slabs.html"
            },
            {
                title: "Decorative stamped finish",
                tag: "Pattern and finish planning",
                icon: "shapes",
                text:
                    "Compare providers based on pattern options, color direction, sealing terms, surface preparation, and maintenance details provided by each participant.",
                url: "stamped-concrete.html"
            },
            {
                title: "Walkway replacement",
                tag: "Path and entry connection",
                icon: "footprints",
                text:
                    "Helpful request notes include path length, width, slope, transitions, drainage, and whether the walkway connects to a driveway, patio, or entry.",
                url: "concrete-walkways.html"
            }
        ];

        wrapper.innerHTML = scenarios
            .map(
                (scenario) => `
          <div class="swiper-slide">
            <article class="home-scenario-card">
              <div>
                <div class="home-scenario-card__visual">
                  ${icon(scenario.icon)}
                  <span class="home-scenario-card__tag">${escapeHtml(scenario.tag)}</span>
                </div>

                <h3>${escapeHtml(scenario.title)}</h3>
                <p>${escapeHtml(scenario.text)}</p>
              </div>

              <div class="home-scenario-card__bottom">
                <a class="icon-link" href="${escapeHtml(scenario.url)}">
                  Prepare request
                  ${icon("arrow-right")}
                </a>
              </div>
            </article>
          </div>
        `
            )
            .join("");

        const pagination = swiperElement
            .closest(".home-scenario")
            ?.querySelector("[data-home-scenario-pagination]");

        const nextButton = swiperElement
            .closest(".home-scenario")
            ?.querySelector("[data-home-scenario-next]");

        const prevButton = swiperElement
            .closest(".home-scenario")
            ?.querySelector("[data-home-scenario-prev]");

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
                    1100: {
                        slidesPerView: 3
                    }
                }
            });
        }

        refreshIcons();
    }

    /* ================================
       Home Dual Photo Hover Switch
       ================================ */

    function initHomeDualPhotoSwitch() {
        const section = document.querySelector("[data-home-dual-photo]");
        if (!section) return;

        const panels = Array.from(section.querySelectorAll("[data-home-dual-panel]"));
        const chips = Array.from(section.querySelectorAll("[data-home-dual-chip]"));
        const text = section.querySelector("[data-home-dual-text]");

        if (!panels.length || !chips.length) return;

        const content = {
            residential:
                "Residential concrete requests often depend on access, surface size, existing conditions, drainage, and how clearly the project scope is shared before comparing provider options.",
            finish:
                "Finish-focused requests are easier to compare when homeowners prepare notes about texture, appearance, maintenance expectations, and provider-supplied service terms.",
            access:
                "Access details can affect which providers may be available. Include notes about gates, slopes, parking, backyard routes, removal needs, and nearby surfaces.",
            terms:
                "Before choosing a provider, compare what each participating provider says about scope, schedule, preparation, warranty terms, and final pricing."
        };

        const activate = (key) => {
            chips.forEach((chip) => {
                chip.classList.toggle("is-active", chip.getAttribute("data-home-dual-chip") === key);
            });

            panels.forEach((panel) => {
                panel.classList.toggle("is-active", panel.getAttribute("data-home-dual-panel") === key);
            });

            if (text && content[key]) {
                text.textContent = content[key];
            }
        };

        chips.forEach((chip) => {
            const key = chip.getAttribute("data-home-dual-chip");

            chip.addEventListener("mouseenter", () => activate(key));
            chip.addEventListener("focus", () => activate(key));
            chip.addEventListener("click", () => activate(key));
        });

        panels.forEach((panel) => {
            const key = panel.getAttribute("data-home-dual-panel");

            panel.addEventListener("mouseenter", () => activate(key));
            panel.addEventListener("focusin", () => activate(key));
        });

        activate(chips[0].getAttribute("data-home-dual-chip"));
    }

    /* ================================
       Home Final Service Navigator
       ================================ */

    function initHomeNavigator() {
        const section = document.querySelector("[data-home-navigator]");
        const list = document.querySelector("[data-home-navigator-list]");
        const preview = document.querySelector("[data-home-navigator-preview]");

        if (!section || !list || !preview || !services.length) return;

        list.innerHTML = services
            .map(
                (service, index) => `
          <button class="home-navigator__button ${index === 0 ? "is-active" : ""}" type="button" data-home-navigator-service="${escapeHtml(service.id)}">
            <span>${escapeHtml(service.name)}</span>
            ${icon(service.icon || "arrow-up-right")}
          </button>
        `
            )
            .join("");

        const renderPreview = (service) => {
            preview.style.setProperty("--navigator-image", `url('${service.image}')`);

            preview.innerHTML = `
        <div class="home-navigator__preview-content">
          <span class="home-navigator__preview-icon">
            ${icon(service.icon || "square-stack")}
          </span>

          <h3>${escapeHtml(service.name)}</h3>
          <p>${escapeHtml(service.detail || service.summary)}</p>

          <div class="btn-row">
            <a class="btn btn-primary" href="${escapeHtml(service.url)}">
              View Category
              ${icon("arrow-up-right")}
            </a>

            <a class="btn btn-light" href="contact.html">
              Start Request
            </a>
          </div>
        </div>
      `;

            refreshIcons();
        };

        const activateService = (serviceId) => {
            const service = services.find((item) => item.id === serviceId) || services[0];

            list.querySelectorAll("[data-home-navigator-service]").forEach((button) => {
                button.classList.toggle(
                    "is-active",
                    button.getAttribute("data-home-navigator-service") === service.id
                );
            });

            renderPreview(service);
        };

        list.addEventListener("click", (event) => {
            const button = event.target.closest("[data-home-navigator-service]");
            if (!button) return;

            activateService(button.getAttribute("data-home-navigator-service"));
        });

        list.addEventListener("mouseover", (event) => {
            const button = event.target.closest("[data-home-navigator-service]");
            if (!button || window.innerWidth <= 768) return;

            activateService(button.getAttribute("data-home-navigator-service"));
        });

        activateService(services[0].id);
        refreshIcons();
    }

    (function () {
        const parallaxBg = document.querySelector(".home-depth__bg");

        if (!parallaxBg) return;

        const updateParallax = () => {
            const section = parallaxBg.closest(".home-depth");
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.bottom < 0 || rect.top > windowHeight) return;

            const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
            const move = (progress - 0.5) * 90;

            parallaxBg.style.transform = `translateY(${move}px)`;
        };

        updateParallax();

        window.addEventListener("scroll", updateParallax, { passive: true });
        window.addEventListener("resize", updateParallax);
    })();

    /* ================================
       Icon Reveal / Hover Accessibility
       ================================ */

    function initHomeHoverPanels() {
        const revealCards = document.querySelectorAll(".home-icon-reveal__card");

        revealCards.forEach((card) => {
            card.setAttribute("tabindex", "0");

            card.addEventListener("keydown", (event) => {
                if (event.key !== "Enter" && event.key !== " ") return;

                event.preventDefault();
                card.classList.toggle("is-keyboard-active");
            });
        });
    }
})();