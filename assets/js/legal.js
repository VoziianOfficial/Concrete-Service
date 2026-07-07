

(function () {
    "use strict";

    const config = window.SLABWAY_CONFIG || {};

    document.addEventListener("DOMContentLoaded", initLegalPages);

    function initLegalPages() {
        setLegalActiveNav();
        injectLegalDates();
        hydrateLegalContactBoxes();
        initLegalSmoothAnchors();
        refreshIcons();
        refreshAOS();
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

    function refreshAOS() {
        if (window.SlabWayAOS && typeof window.SlabWayAOS.refresh === "function") {
            window.SlabWayAOS.refresh();
        }
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

    function setLegalActiveNav() {
        const currentFile = window.location.pathname.split("/").pop() || "privacy-policy.html";

        document.querySelectorAll("[data-legal-nav] a").forEach((link) => {
            const href = link.getAttribute("href");

            if (href === currentFile) {
                link.classList.add("is-active");
                link.setAttribute("aria-current", "page");
            }
        });
    }

    function injectLegalDates() {
        const updated = get("legal.lastUpdated", "January 1, 2026");
        const effective = get("legal.effectiveDate", updated);

        document.querySelectorAll("[data-legal-updated]").forEach((element) => {
            element.textContent = updated;
        });

        document.querySelectorAll("[data-legal-effective]").forEach((element) => {
            element.textContent = effective;
        });
    }

    function hydrateLegalContactBoxes() {
        const contactEmail = get("contact.email", "hello@slabway.com");
        const contactEmailHref = get("contact.emailHref", `mailto:${contactEmail}`);
        const companyName = get("company.name", "SlabWay Matching Group LLC");
        const companyAddress = get("company.address", "1180 Concrete Market Lane, Suite 240, Denver, CO 80202");
        const companyId = get("company.companyId", "SWM-482710");

        document.querySelectorAll("[data-legal-contact-email]").forEach((element) => {
            element.textContent = contactEmail;

            if (element.tagName.toLowerCase() === "a") {
                element.setAttribute("href", contactEmailHref);
            }
        });

        document.querySelectorAll("[data-legal-company-name]").forEach((element) => {
            element.textContent = companyName;
        });

        document.querySelectorAll("[data-legal-company-address]").forEach((element) => {
            element.textContent = companyAddress;
        });

        document.querySelectorAll("[data-legal-company-id]").forEach((element) => {
            element.textContent = companyId;
        });
    }

    function initLegalSmoothAnchors() {
        document.querySelectorAll("a[href^='#']").forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId = link.getAttribute("href");

                if (!targetId || targetId === "#") return;

                const target = document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });
    }
})();
