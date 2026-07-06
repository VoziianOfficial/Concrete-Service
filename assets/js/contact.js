/* ================================
   SlabWay Contact Page JavaScript
   File: assets/js/contact.js
   ================================ */

(function () {
    "use strict";

    const config = window.SLABWAY_CONFIG || {};
    const services = Array.isArray(config.services) ? config.services : [];

    document.addEventListener("DOMContentLoaded", initContactPage);

    function initContactPage() {
        hydrateContactServiceSelect();
        initContactForm();
        initContactServiceCards();
        initContactPhotoSwitch();
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

    function get(path, fallback = "") {
        if (!path || typeof path !== "string") return fallback;

        return path.split(".").reduce((acc, key) => {
            if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
                return acc[key];
            }

            return undefined;
        }, config) ?? fallback;
    }

    /* ================================
       Service Select
       ================================ */

    function hydrateContactServiceSelect() {
        const select = document.querySelector("[data-contact-service-select]");
        if (!select || !services.length) return;

        select.innerHTML = `
      <option value="">Select a concrete category</option>
      ${services
                .map(
                    (service) => `
            <option value="${escapeHtml(service.name)}">${escapeHtml(service.name)}</option>
          `
                )
                .join("")}
    `;
    }

    /* ================================
       Contact Form
       ================================ */

    function initContactForm() {
        const form = document.querySelector("[data-contact-form]");
        const message = document.querySelector("[data-contact-form-message]");
        const submitButton = form ? form.querySelector("[data-contact-submit]") : null;
        const timingField = form ? form.querySelector("[data-request-started]") : null;
        const sourcePageField = form ? form.querySelector("[name='sourcePage']") : null;

        if (!form || !message || !submitButton) return;

        if (timingField) {
            timingField.value = String(Date.now());
        }

        if (sourcePageField) {
            sourcePageField.value = window.location.pathname.split("/").pop() || "contact.html";
        }

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            clearMessage(message);

            const validation = validateForm(form);

            if (!validation.valid) {
                showMessage(message, validation.message, "error");
                focusFirstInvalid(form);
                return;
            }

            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            try {
                const response = await fetch(get("form.endpoint", "contact.php"), {
                    method: get("form.method", "POST"),
                    body: new FormData(form),
                    headers: {
                        Accept: "application/json"
                    }
                });

                const result = await safeJson(response);

                if (!response.ok || !result || result.success !== true) {
                    showMessage(
                        message,
                        result && result.message
                            ? result.message
                            : get("form.errorMessage", "Please check the required fields and try again."),
                        "error"
                    );
                    return;
                }

                form.reset();

                if (timingField) {
                    timingField.value = String(Date.now());
                }

                if (sourcePageField) {
                    sourcePageField.value = window.location.pathname.split("/").pop() || "contact.html";
                }

                document
                    .querySelectorAll(".contact-service-select__card.is-selected")
                    .forEach((card) => card.classList.remove("is-selected"));

                showMessage(
                    message,
                    result.message || get("form.successMessage", "Thank you. Your request has been received."),
                    "success"
                );
            } catch (error) {
                showMessage(
                    message,
                    get("form.errorMessage", "Please check the required fields and try again."),
                    "error"
                );
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }

    function validateForm(form) {
        const fullName = form.querySelector("[name='fullName']");
        const email = form.querySelector("[name='email']");
        const phone = form.querySelector("[name='phone']");
        const service = form.querySelector("[name='service']");
        const message = form.querySelector("[name='message']");
        const consent = form.querySelector("[name='privacyConsent']");
        const honeypot = form.querySelector(`[name="${get("form.honeypotFieldName", "companyWebsite")}"]`);
        const timing = form.querySelector(`[name="${get("form.timingFieldName", "requestStartedAt")}"]`);

        clearInvalid(form);

        if (honeypot && honeypot.value.trim() !== "") {
            return {
                valid: false,
                message: "Please check the required fields and try again."
            };
        }

        if (timing) {
            const startedAt = Number(timing.value);
            const elapsed = Date.now() - startedAt;

            if (!startedAt || elapsed < 1800) {
                return {
                    valid: false,
                    message: "Please wait a moment before submitting the form."
                };
            }
        }

        if (!fullName || fullName.value.trim().length < 2) {
            markInvalid(fullName);
            return {
                valid: false,
                message: "Please enter your full name."
            };
        }

        if (!email || !isValidEmail(email.value.trim())) {
            markInvalid(email);
            return {
                valid: false,
                message: "Please enter a valid email address."
            };
        }

        if (!phone || phone.value.trim().length < 7) {
            markInvalid(phone);
            return {
                valid: false,
                message: "Please enter a valid phone number."
            };
        }

        if (!service || service.value.trim() === "") {
            markInvalid(service);
            return {
                valid: false,
                message: "Please choose a concrete category."
            };
        }

        if (!message || message.value.trim().length < 12) {
            markInvalid(message);
            return {
                valid: false,
                message: "Please add a few details about your concrete request."
            };
        }

        if (!consent || !consent.checked) {
            markInvalid(consent);
            return {
                valid: false,
                message: "Please confirm the privacy consent before submitting."
            };
        }

        return {
            valid: true,
            message: ""
        };
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    }

    function markInvalid(field) {
        if (!field) return;

        field.setAttribute("aria-invalid", "true");

        const fieldWrap = field.closest(".form-field, .checkbox-field");
        if (fieldWrap) {
            fieldWrap.classList.add("is-invalid");
        }
    }

    function clearInvalid(form) {
        form.querySelectorAll("[aria-invalid='true']").forEach((field) => {
            field.removeAttribute("aria-invalid");
        });

        form.querySelectorAll(".is-invalid").forEach((fieldWrap) => {
            fieldWrap.classList.remove("is-invalid");
        });
    }

    function focusFirstInvalid(form) {
        const invalid = form.querySelector("[aria-invalid='true']");
        if (invalid && typeof invalid.focus === "function") {
            invalid.focus();
        }
    }

    function showMessage(element, text, type) {
        element.textContent = text;
        element.classList.remove("is-success", "is-error");
        element.classList.add(type === "success" ? "is-success" : "is-error");
    }

    function clearMessage(element) {
        element.textContent = "";
        element.classList.remove("is-success", "is-error");
    }

    async function safeJson(response) {
        try {
            return await response.json();
        } catch (error) {
            return null;
        }
    }

    /* ================================
       Service Selector Cards
       ================================ */

    function initContactServiceCards() {
        const container = document.querySelector("[data-contact-service-cards]");
        const select = document.querySelector("[data-contact-service-select]");

        if (!container || !select || !services.length) return;

        container.innerHTML = services
            .map(
                (service) => `
          <button
            class="contact-service-select__card"
            type="button"
            data-contact-service-card="${escapeHtml(service.name)}"
            aria-label="Select ${escapeHtml(service.name)}"
          >
            ${icon(service.icon || "square-stack")}

            <span>
              <h3>${escapeHtml(service.name)}</h3>
              <p>${escapeHtml(service.summary)}</p>
              <span>Select category</span>
            </span>
          </button>
        `
            )
            .join("");

        container.addEventListener("click", (event) => {
            const card = event.target.closest("[data-contact-service-card]");
            if (!card) return;

            const selectedService = card.getAttribute("data-contact-service-card");

            select.value = selectedService;
            select.dispatchEvent(new Event("change", { bubbles: true }));

            container.querySelectorAll("[data-contact-service-card]").forEach((item) => {
                item.classList.toggle("is-selected", item === card);
            });

            const formSection = document.querySelector("#request-form");
            if (formSection && window.innerWidth <= 900) {
                formSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });

        refreshIcons();
    }

    /* ================================
       Photo Switch
       ================================ */

    function initContactPhotoSwitch() {
        const section = document.querySelector("[data-contact-photo-switch]");
        if (!section) return;

        const photos = Array.from(section.querySelectorAll("[data-contact-photo]"));
        const labels = Array.from(section.querySelectorAll("[data-contact-photo-label]"));
        const text = section.querySelector("[data-contact-photo-text]");

        if (!photos.length || !labels.length) return;

        const content = {
            scope:
                "Project scope helps providers understand the type of request, approximate surface size, intended use, and whether the project is new concrete, replacement, repair, or decorative finish planning.",
            surface:
                "Surface notes can include cracks, uneven areas, existing concrete, drainage concerns, old surface removal, nearby structures, or connection points.",
            access:
                "Access details such as gates, slopes, parking, backyard routes, equipment limitations, and demolition needs may affect provider responses.",
            timing:
                "Timeline preferences are useful, but provider availability may depend on location, season, weather, project size, and site readiness."
        };

        const activate = (key) => {
            labels.forEach((label) => {
                label.classList.toggle(
                    "is-active",
                    label.getAttribute("data-contact-photo-label") === key
                );
            });

            photos.forEach((photo) => {
                photo.classList.toggle(
                    "is-active",
                    photo.getAttribute("data-contact-photo") === key
                );
            });

            if (text && content[key]) {
                text.textContent = content[key];
            }
        };

        labels.forEach((label) => {
            const key = label.getAttribute("data-contact-photo-label");

            label.addEventListener("mouseenter", () => activate(key));
            label.addEventListener("focus", () => activate(key));
            label.addEventListener("click", () => activate(key));
        });

        photos.forEach((photo) => {
            const key = photo.getAttribute("data-contact-photo");

            photo.addEventListener("mouseenter", () => activate(key));
            photo.addEventListener("focusin", () => activate(key));
        });

        activate(labels[0].getAttribute("data-contact-photo-label"));
    }
})();