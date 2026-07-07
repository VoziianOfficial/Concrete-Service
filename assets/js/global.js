

(function () {
    "use strict";

    const config = window.SLABWAY_CONFIG || {};

    const state = {
        dropdownTimer: null,
        lastFocusedElement: null
    };

    const selectors = {
        headerMount: "[data-site-header]",
        footerMount: "[data-site-footer]",
        cookieMount: "[data-cookie-banner]",
        serviceList: "[data-service-list]",
        configText: "[data-config]",
        configHref: "[data-config-href]",
        telLink: "[data-tel-link]",
        emailLink: "[data-email-link]",
        mapLink: "[data-map-link]",
        prefooterCta: ".site-prefooter-cta",
        accordion: "[data-accordion]",
        parallax: "[data-parallax]"
    };

    document.addEventListener("DOMContentLoaded", init);

    function init() {
        renderHeader();
        renderFooter();
        renderCookieBanner();

        applyGlobalBusinessConfig();
        injectServiceLists();
        hydratePrefooterCta();

        initStickyHeader();
        initActiveNavigation();
        initDesktopDropdown();
        initMobileMenu();
        initAccordions();
        initCookieConsent();
        initParallaxSections();
        initAOS();
        initLucideIcons();

        window.addEventListener("resize", debounce(handleResize, 160));
    }

    

    function get(path, fallback = "") {
        if (!path || typeof path !== "string") return fallback;

        return path.split(".").reduce((acc, key) => {
            if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
                return acc[key];
            }

            return undefined;
        }, config) ?? fallback;
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function normalizePath(path) {
        const clean = path.split("?")[0].split("#")[0];
        const file = clean.substring(clean.lastIndexOf("/") + 1);
        return file || "index.html";
    }

    function debounce(callback, delay) {
        let timer;

        return function debounced(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => callback.apply(this, args), delay);
        };
    }

    function setAttributes(element, attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                element.setAttribute(key, String(value));
            }
        });
    }

    function icon(name, extraClass = "") {
        return `<i data-lucide="${escapeHtml(name)}" class="${escapeHtml(extraClass)}" aria-hidden="true"></i>`;
    }

    function services() {
        return Array.isArray(config.services) ? config.services : [];
    }

    function mainNavigation() {
        return config.navigation && Array.isArray(config.navigation.main)
            ? config.navigation.main
            : [];
    }

    function legalNavigation() {
        return config.navigation && Array.isArray(config.navigation.legal)
            ? config.navigation.legal
            : [];
    }

    

    function renderHeader() {
        const mount = document.querySelector(selectors.headerMount);
        if (!mount) return;

        const navItems = mainNavigation()
            .map((item) => {
                const isServices = item.url === "all-services.html";

                if (isServices) {
                    return `
            <li class="site-nav__item site-nav__item--services">
              <a class="site-nav__button" href="${escapeHtml(item.url)}" data-nav-link>
                <span>${escapeHtml(item.label)}</span>
                ${icon("chevron-down")}
              </a>

              <div class="services-dropdown" data-services-dropdown>
                <div class="services-dropdown__grid" data-service-list="dropdown"></div>
              </div>
            </li>
          `;
                }

                return `
          <li class="site-nav__item">
            <a class="site-nav__link" href="${escapeHtml(item.url)}" data-nav-link>
              ${escapeHtml(item.label)}
            </a>
          </li>
        `;
            })
            .join("");

        mount.innerHTML = `
      <header class="site-header" data-site-header-element>
        <a class="skip-link" href="#main-content">Skip to content</a>

        <div class="container-wide site-header__inner">
          <a class="site-logo" href="index.html" aria-label="${escapeHtml(get("brand.name", "SlabWay"))} home">
            <img src="assets/images/logo.svg" alt="${escapeHtml(get("brand.name", "SlabWay"))}" width="238" height="54">
          </a>

          <nav class="site-nav" aria-label="Primary navigation">
            <ul class="site-nav__list">
              ${navItems}
            </ul>
          </nav>

          <div class="header-actions">
            <a class="header-icon-btn header-phone-btn" href="${escapeHtml(get("contact.phoneHref", "#"))}" data-tel-link aria-label="Call ${escapeHtml(get("brand.name", "SlabWay"))}">
              ${icon("phone")}
            </a>

            <a class="header-icon-btn header-email-btn" href="${escapeHtml(get("contact.emailHref", "#"))}" data-email-link aria-label="Email ${escapeHtml(get("brand.name", "SlabWay"))}">
              ${icon("mail")}
            </a>

            <a class="btn btn-primary header-request-btn" href="contact.html">
              <span data-config="contact.phoneButtonText">${escapeHtml(get("contact.phoneButtonText", "Start Request"))}</span>
              ${icon("arrow-up-right")}
            </a>

            <button class="mobile-menu-toggle" type="button" aria-label="Open mobile menu" aria-controls="mobile-menu" aria-expanded="false" data-mobile-menu-open>
              ${icon("menu")}
            </button>
          </div>
        </div>
      </header>

      <div class="mobile-menu" id="mobile-menu" aria-hidden="true" data-mobile-menu>
        <div class="mobile-menu__top">
          <a class="site-logo" href="index.html" aria-label="${escapeHtml(get("brand.name", "SlabWay"))} home">
            <img src="assets/images/logo.svg" alt="${escapeHtml(get("brand.name", "SlabWay"))}" width="238" height="54">
          </a>

          <button class="mobile-menu__close" type="button" aria-label="Close mobile menu" data-mobile-menu-close>
            ${icon("x")}
          </button>
        </div>

        <div class="mobile-menu__body">
          <nav aria-label="Mobile primary navigation">
            <div class="mobile-menu__primary">
              ${mainNavigation()
                .map(
                    (item) => `
                    <a href="${escapeHtml(item.url)}" data-nav-link>
                      ${escapeHtml(item.label)}
                    </a>
                  `
                )
                .join("")}
            </div>
          </nav>

          <p class="mobile-menu__section-title">Concrete categories</p>
          <nav class="mobile-menu__services" aria-label="Concrete service links" data-service-list="mobile"></nav>
        </div>

        <div class="mobile-menu__bottom">
          <div class="mobile-menu__contact">
            <a class="btn btn-primary" href="${escapeHtml(get("contact.phoneHref", "#"))}" data-tel-link>
              ${icon("phone")}
              <span data-config="contact.phoneDisplay">${escapeHtml(get("contact.phoneDisplay", ""))}</span>
            </a>

            <a class="btn btn-outline" href="${escapeHtml(get("contact.emailHref", "#"))}" data-email-link>
              ${icon("mail")}
              <span>Email SlabWay</span>
            </a>
          </div>
        </div>
      </div>
    `;
    }

    

    function renderFooter() {
        const mount = document.querySelector(selectors.footerMount);
        if (!mount) return;

        mount.innerHTML = `
      <footer class="site-footer">
        <div class="container-wide">
          <div class="site-footer__top">
            <div class="site-footer__brand">
              <a class="site-footer__logo" href="index.html" aria-label="${escapeHtml(get("brand.name", "SlabWay"))} home">
                <img src="assets/images/logo.svg" alt="${escapeHtml(get("brand.name", "SlabWay"))}" width="238" height="54">
              </a>

              <p class="site-footer__description" data-config="footer.description">
                ${escapeHtml(get("footer.description", ""))}
              </p>

              <p class="site-footer__disclaimer" data-config="footer.shortDisclaimer">
                ${escapeHtml(get("footer.shortDisclaimer", ""))}
              </p>
            </div>

            <div class="site-footer__columns">
              <div class="footer-column">
                <h3>Navigation</h3>
                <nav class="footer-links" aria-label="Footer navigation">
                  ${mainNavigation()
                .map(
                    (item) => `
                        <a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a>
                      `
                )
                .join("")}
                </nav>
              </div>

              <div class="footer-column">
                <h3>Concrete categories</h3>
                <nav class="footer-links" aria-label="Footer service links" data-service-list="footer"></nav>
              </div>

              <div class="footer-column">
                <h3>Contact & legal</h3>

                <div class="footer-contact">
                  <div class="footer-contact__item">
                    ${icon("building-2")}
                    <span>
                      <strong data-config="company.name">${escapeHtml(get("company.name", ""))}</strong><br>
                      Company ID: <span data-config="company.companyId">${escapeHtml(get("company.companyId", ""))}</span>
                    </span>
                  </div>

                  <div class="footer-contact__item">
                    ${icon("map-pin")}
                    <a href="${escapeHtml(get("company.mapHref", "#"))}" data-map-link target="_blank" rel="noopener">
                      <span data-config="company.address">${escapeHtml(get("company.address", ""))}</span>
                    </a>
                  </div>

                  <div class="footer-contact__item">
                    ${icon("phone")}
                    <a href="${escapeHtml(get("contact.phoneHref", "#"))}" data-tel-link data-config="contact.phoneDisplay">
                      ${escapeHtml(get("contact.phoneDisplay", ""))}
                    </a>
                  </div>

                  <div class="footer-contact__item">
                    ${icon("mail")}
                    <a href="${escapeHtml(get("contact.emailHref", "#"))}" data-email-link data-config="contact.email">
                      ${escapeHtml(get("contact.email", ""))}
                    </a>
                  </div>

                  <div class="footer-contact__item">
                    ${icon("locate-fixed")}
                    <span>
                      Service area:<br>
                      <span data-config="company.serviceArea">${escapeHtml(get("company.serviceArea", ""))}</span>
                    </span>
                  </div>
                </div>

                <nav class="footer-links" aria-label="Legal links">
                  ${legalNavigation()
                .map(
                    (item) => `
                        <a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a>
                      `
                )
                .join("")}
                </nav>
              </div>
            </div>
          </div>

          <div class="site-footer__bottom">
            <p data-config="footer.copyright">${escapeHtml(get("footer.copyright", ""))}</p>

            <div class="site-footer__bottom-links">
              ${legalNavigation()
                .map(
                    (item) => `
                    <a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a>
                  `
                )
                .join("")}
            </div>
          </div>
        </div>
      </footer>
    `;
    }

    

    function applyGlobalBusinessConfig() {
        document.querySelectorAll(selectors.configText).forEach((element) => {
            const path = element.getAttribute("data-config");
            const value = get(path);

            if (value !== undefined && value !== null && value !== "") {
                element.textContent = value;
            }
        });

        document.querySelectorAll(selectors.configHref).forEach((element) => {
            const path = element.getAttribute("data-config-href");
            const value = get(path);

            if (value) {
                element.setAttribute("href", value);
            }
        });

        document.querySelectorAll(selectors.telLink).forEach((link) => {
            const href = get("contact.phoneHref");
            if (href) link.setAttribute("href", href);
        });

        document.querySelectorAll(selectors.emailLink).forEach((link) => {
            const href = get("contact.emailHref");
            if (href) link.setAttribute("href", href);
        });

        document.querySelectorAll(selectors.mapLink).forEach((link) => {
            const href = get("company.mapHref");
            if (href) link.setAttribute("href", href);
        });

        document.querySelectorAll("[data-current-year]").forEach((element) => {
            element.textContent = String(new Date().getFullYear());
        });
    }

    window.applyGlobalBusinessConfig = applyGlobalBusinessConfig;

    

    function injectServiceLists() {
        document.querySelectorAll(selectors.serviceList).forEach((container) => {
            const variant = container.getAttribute("data-service-list") || "links";

            if (variant === "dropdown") {
                container.innerHTML = services()
                    .map(
                        (service) => `
              <a class="services-dropdown__link" href="${escapeHtml(service.url)}">
                <span>${escapeHtml(service.name)}</span>
                <small>${escapeHtml(service.summary)}</small>
              </a>
            `
                    )
                    .join("");
                return;
            }

            if (variant === "mobile") {
                container.innerHTML = services()
                    .map(
                        (service) => `
              <a href="${escapeHtml(service.url)}">
                <span>${escapeHtml(service.name)}</span>
              </a>
            `
                    )
                    .join("");
                return;
            }

            if (variant === "footer") {
                container.innerHTML = services()
                    .map(
                        (service) => `
              <a href="${escapeHtml(service.url)}">${escapeHtml(service.name)}</a>
            `
                    )
                    .join("");
                return;
            }

            if (variant === "select") {
                container.innerHTML = `
          <option value="">Select a concrete category</option>
          ${services()
                        .map(
                            (service) => `
                <option value="${escapeHtml(service.name)}">${escapeHtml(service.name)}</option>
              `
                        )
                        .join("")}
        `;
                return;
            }

            if (variant === "cards") {
                container.innerHTML = services()
                    .map(
                        (service) => `
              <a class="service-generated-card premium-card card-shine photo-zoom" href="${escapeHtml(service.url)}">
                <span class="service-generated-card__media">
                  <img src="${escapeHtml(service.image)}" alt="${escapeHtml(service.name)}" loading="lazy">
                </span>
                <span class="service-generated-card__content">
                  ${icon(service.icon || "square-stack", "icon-corner")}
                  <strong>${escapeHtml(service.name)}</strong>
                  <small>${escapeHtml(service.summary)}</small>
                </span>
              </a>
            `
                    )
                    .join("");
                return;
            }

            container.innerHTML = services()
                .map(
                    (service) => `
            <a href="${escapeHtml(service.url)}">${escapeHtml(service.name)}</a>
          `
                )
                .join("");
        });
    }

    window.injectServiceLists = injectServiceLists;

    

    function hydratePrefooterCta() {
        document.querySelectorAll(selectors.prefooterCta).forEach((cta) => {
            const customHeading = cta.getAttribute("data-cta-heading");
            const customText = cta.getAttribute("data-cta-text");

            if (!cta.innerHTML.trim()) {
                cta.innerHTML = `
          <div class="site-prefooter-cta__inner">
            <div>
              <h2>${escapeHtml(customHeading || get("cta.heading", ""))}</h2>
              <p>${escapeHtml(customText || get("cta.text", ""))}</p>
            </div>

            <div class="btn-row site-prefooter-cta__actions">
              <a class="btn btn-primary" href="${escapeHtml(get("cta.primaryUrl", "contact.html"))}">
                ${escapeHtml(get("cta.primaryLabel", "Start a Request"))}
                ${icon("arrow-up-right")}
              </a>

              <a class="btn btn-light" href="${escapeHtml(get("cta.secondaryUrl", "all-services.html"))}">
                ${escapeHtml(get("cta.secondaryLabel", "View Services"))}
              </a>
            </div>
          </div>
        `;
            }

            const image = cta.getAttribute("data-cta-image") || get("cta.image");
            if (image) {
                cta.style.backgroundImage = `linear-gradient(rgba(0,0,0,.62), rgba(0,0,0,.62)), url("${image}")`;
            }
        });
    }

    

    function initStickyHeader() {
        const header = document.querySelector("[data-site-header-element]");
        if (!header) return;

        const update = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 10);
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
    }

    

    function initActiveNavigation() {
        const current = normalizePath(window.location.pathname);

        document.querySelectorAll("[data-nav-link]").forEach((link) => {
            const href = link.getAttribute("href");
            if (!href) return;

            const target = normalizePath(href);

            if (target === current) {
                link.classList.add("is-active");
                link.setAttribute("aria-current", "page");
            }

            if (
                current !== "all-services.html" &&
                services().some((service) => service.url === current) &&
                target === "all-services.html"
            ) {
                link.classList.add("is-active");
            }
        });
    }

    

    function initDesktopDropdown() {
        const servicesItem = document.querySelector(".site-nav__item--services");
        const trigger = servicesItem ? servicesItem.querySelector(".site-nav__button") : null;
        const dropdown = servicesItem ? servicesItem.querySelector("[data-services-dropdown]") : null;

        if (!servicesItem || !trigger || !dropdown) return;

        setAttributes(trigger, {
            "aria-haspopup": "true",
            "aria-expanded": "false"
        });

        const openDropdown = () => {
            clearTimeout(state.dropdownTimer);
            dropdown.classList.add("is-open");
            trigger.setAttribute("aria-expanded", "true");
        };

        const closeDropdown = () => {
            state.dropdownTimer = setTimeout(() => {
                dropdown.classList.remove("is-open");
                trigger.setAttribute("aria-expanded", "false");
            }, 180);
        };

        servicesItem.addEventListener("mouseenter", openDropdown);
        servicesItem.addEventListener("mouseleave", closeDropdown);
        servicesItem.addEventListener("focusin", openDropdown);
        servicesItem.addEventListener("focusout", closeDropdown);

        trigger.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                openDropdown();

                const firstLink = dropdown.querySelector("a");
                if (firstLink) firstLink.focus();
            }

            if (event.key === "Escape") {
                dropdown.classList.remove("is-open");
                trigger.setAttribute("aria-expanded", "false");
                trigger.focus();
            }
        });

        dropdown.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                dropdown.classList.remove("is-open");
                trigger.setAttribute("aria-expanded", "false");
                trigger.focus();
            }
        });
    }

    

    function initMobileMenu() {
        const menu = document.querySelector("[data-mobile-menu]");
        const openButton = document.querySelector("[data-mobile-menu-open]");
        const closeButton = document.querySelector("[data-mobile-menu-close]");

        if (!menu || !openButton || !closeButton) return;

        const focusableSelector =
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

        const setMenuState = (isOpen) => {
            menu.classList.toggle("is-open", isOpen);
            menu.setAttribute("aria-hidden", isOpen ? "false" : "true");
            openButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
            openButton.setAttribute("aria-label", isOpen ? "Close mobile menu" : "Open mobile menu");
            document.body.classList.toggle("menu-open", isOpen);
        };

        const openMenu = () => {
            state.lastFocusedElement = document.activeElement;

            setMenuState(true);

            const firstFocusable = menu.querySelector(focusableSelector);
            if (firstFocusable) firstFocusable.focus();
        };

        const closeMenu = () => {
            setMenuState(false);

            if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === "function") {
                state.lastFocusedElement.focus();
            }
        };

        openButton.addEventListener("click", () => {
            if (menu.classList.contains("is-open")) {
                closeMenu();
                return;
            }

            openMenu();
        });
        closeButton.addEventListener("click", closeMenu);

        menu.addEventListener("click", (event) => {
            const target = event.target;

            if (target instanceof Element && target.closest("a")) {
                closeMenu();
            }
        });

        menu.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }

            if (event.key !== "Tab") return;

            const focusable = Array.from(menu.querySelectorAll(focusableSelector));
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });
    }

    

    function initAccordions(scope = document) {
        scope.querySelectorAll(selectors.accordion).forEach((accordion) => {
            const allowMultiple = accordion.getAttribute("data-accordion") === "multiple";
            const items = Array.from(accordion.querySelectorAll("[data-accordion-item]"));

            items.forEach((item, index) => {
                const trigger = item.querySelector("[data-accordion-trigger]");
                const panel = item.querySelector("[data-accordion-panel]");

                if (!trigger || !panel) return;

                const triggerId =
                    trigger.id || `accordion-trigger-${Math.random().toString(36).slice(2)}`;
                const panelId =
                    panel.id || `accordion-panel-${Math.random().toString(36).slice(2)}`;

                setAttributes(trigger, {
                    id: triggerId,
                    type: "button",
                    "aria-controls": panelId,
                    "aria-expanded": item.classList.contains("is-open") ? "true" : "false"
                });

                setAttributes(panel, {
                    id: panelId,
                    role: "region",
                    "aria-labelledby": triggerId
                });

                if (item.classList.contains("is-open")) {
                    panel.style.maxHeight = `${panel.scrollHeight}px`;
                }

                trigger.addEventListener("click", () => {
                    const shouldOpen = !item.classList.contains("is-open");

                    if (!allowMultiple) {
                        items.forEach((otherItem) => {
                            if (otherItem !== item) closeAccordionItem(otherItem);
                        });
                    }

                    if (shouldOpen) {
                        openAccordionItem(item);
                    } else {
                        closeAccordionItem(item);
                    }
                });

                trigger.addEventListener("keydown", (event) => {
                    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;

                    event.preventDefault();

                    const triggers = items
                        .map((accordionItem) => accordionItem.querySelector("[data-accordion-trigger]"))
                        .filter(Boolean);

                    const currentIndex = triggers.indexOf(trigger);
                    let nextIndex = currentIndex;

                    if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % triggers.length;
                    if (event.key === "ArrowUp") nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
                    if (event.key === "Home") nextIndex = 0;
                    if (event.key === "End") nextIndex = triggers.length - 1;

                    triggers[nextIndex].focus();
                });

                if (index === 0 && accordion.hasAttribute("data-open-first") && !item.classList.contains("is-open")) {
                    openAccordionItem(item);
                }
            });
        });
    }

    function openAccordionItem(item) {
        const trigger = item.querySelector("[data-accordion-trigger]");
        const panel = item.querySelector("[data-accordion-panel]");

        if (!trigger || !panel) return;

        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = `${panel.scrollHeight}px`;
    }

    function closeAccordionItem(item) {
        const trigger = item.querySelector("[data-accordion-trigger]");
        const panel = item.querySelector("[data-accordion-panel]");

        if (!trigger || !panel) return;

        item.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = "0px";
    }

    window.SlabWayAccordion = {
        init: initAccordions,
        open: openAccordionItem,
        close: closeAccordionItem
    };

    

    function renderCookieBanner() {
        const existing = document.querySelector(selectors.cookieMount);
        if (existing) return;

        const banner = document.createElement("div");
        banner.className = "cookie-banner";
        banner.setAttribute("data-cookie-banner", "");
        banner.innerHTML = `
      <div class="cookie-banner__inner" role="dialog" aria-live="polite" aria-label="Cookie consent">
        <p>
          SlabWay uses essential local storage to remember your cookie choice and support basic website behavior.
          Review our
          <a href="privacy-policy.html">Privacy Policy</a>,
          <a href="cookie-policy.html">Cookie Policy</a>, and
          <a href="terms-of-service.html">Terms of Service</a>.
        </p>

        <div class="cookie-banner__actions">
          <button class="btn btn-light" type="button" data-cookie-decline>Decline</button>
          <button class="btn btn-primary" type="button" data-cookie-accept>Accept</button>
        </div>
      </div>
    `;

        document.body.appendChild(banner);
    }

    function initCookieConsent() {
        const banner = document.querySelector(selectors.cookieMount);
        const acceptButton = document.querySelector("[data-cookie-accept]");
        const declineButton = document.querySelector("[data-cookie-decline]");
        const storageKey = "slabwayCookieConsent";

        if (!banner || !acceptButton || !declineButton) return;

        const savedChoice = localStorage.getItem(storageKey);

        if (!savedChoice) {
            banner.classList.add("is-visible");
        }

        const saveChoice = (choice) => {
            localStorage.setItem(storageKey, choice);
            banner.classList.remove("is-visible");
        };

        acceptButton.addEventListener("click", () => saveChoice("accepted"));
        declineButton.addEventListener("click", () => saveChoice("declined"));
    }

    

    function initAOS() {
        if (!window.AOS) return;

        window.AOS.init({
            duration: 820,
            easing: "ease-out-cubic",
            once: true,
            offset: 90,
            disable: function () {
                return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            }
        });

        window.addEventListener(
            "load",
            () => {
                if (window.AOS && typeof window.AOS.refreshHard === "function") {
                    window.AOS.refreshHard();
                }
            },
            { once: true }
        );
    }

    function initLucideIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    window.SlabWayIcons = {
        refresh: initLucideIcons
    };

    

    function createSwiper(selector, options = {}) {
        if (!window.Swiper) return null;

        const element = typeof selector === "string" ? document.querySelector(selector) : selector;
        if (!element) return null;

        const defaultOptions = {
            slidesPerView: 1,
            spaceBetween: 18,
            speed: 720,
            grabCursor: true,
            watchOverflow: true,
            keyboard: {
                enabled: true
            },
            a11y: {
                enabled: true
            }
        };

        return new window.Swiper(element, {
            ...defaultOptions,
            ...options
        });
    }

    window.SlabWaySwiper = {
        create: createSwiper
    };

    

    function initParallaxSections() {
        const sections = document.querySelectorAll(selectors.parallax);
        if (!sections.length) return;

        const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (isReduced) return;

        const update = () => {
            if (window.innerWidth <= 900) {
                sections.forEach((section) => {
                    const layer = section.querySelector("[data-parallax-layer]");
                    if (layer) layer.style.transform = "translate3d(0, 0, 0)";
                });
                return;
            }

            sections.forEach((section) => {
                const layer = section.querySelector("[data-parallax-layer]");
                if (!layer) return;

                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (rect.bottom < 0 || rect.top > windowHeight) return;

                const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
                const movement = (progress - 0.5) * 54;

                layer.style.transform = `translate3d(0, ${movement}px, 0)`;
            });
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", debounce(update, 160));
    }

    

    function handleResize() {
        document.querySelectorAll("[data-accordion-item].is-open").forEach((item) => {
            const panel = item.querySelector("[data-accordion-panel]");
            if (panel) {
                panel.style.maxHeight = `${panel.scrollHeight}px`;
            }
        });

        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }
})();
