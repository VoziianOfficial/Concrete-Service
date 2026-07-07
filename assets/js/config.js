window.SLABWAY_CONFIG = {
    brand: {
        name: "SlabWay",
        tagline: "Independent Concrete Matching Platform",
        shortDescription:
            "SlabWay helps homeowners organize concrete project details and compare available local provider options before deciding how to continue."
    },

    company: {
        name: "SlabWay Matching Group LLC",
        companyId: "SWM-482710",
        address: "1180 Concrete Market Lane, Suite 240, Denver, CO 80202",
        city: "Denver",
        state: "CO",
        zip: "80202",
        country: "United States",
        serviceArea: "Selected local markets across participating service areas",
        mapHref:
            "https://maps.google.com/?q=1180%20Concrete%20Market%20Lane%2C%20Suite%20240%2C%20Denver%2C%20CO%2080202"
    },

    contact: {
        phoneDisplay: "+1 (555) 024-6180",
        phoneRaw: "+15550246180",
        phoneHref: "tel:+15550246180",
        phoneButtonText: "Start Request",
        email: "hello@slabway.com",
        emailHref: "mailto:hello@slabway.com"
    },

    navigation: {
        main: [
            {
                label: "Home",
                url: "index.html"
            },
            {
                label: "About",
                url: "about.html"
            },
            {
                label: "Services",
                url: "all-services.html"
            },
            {
                label: "Contact",
                url: "contact.html"
            }
        ],

        legal: [
            {
                label: "Privacy Policy",
                url: "privacy-policy.html"
            },
            {
                label: "Terms of Service",
                url: "terms-of-service.html"
            },
            {
                label: "Cookie Policy",
                url: "cookie-policy.html"
            }
        ]
    },

    services: [
        {
            id: "driveways",
            name: "Concrete Driveways",
            shortName: "Driveways",
            url: "concrete-driveways.html",
            image: "assets/images/service-driveways.jpg",
            icon: "road",
            summary:
                "Compare provider options for driveway replacement, new driveway requests, surface updates, drainage notes, and access considerations.",
            detail:
                "Concrete driveway requests can vary based on size, slope, access, existing surface removal, finish goals, drainage, and local provider availability."
        },
        {
            id: "patios",
            name: "Concrete Patios",
            shortName: "Patios",
            url: "concrete-patios.html",
            image: "assets/images/service-patios.jpg",
            icon: "layout-panel-top",
            summary:
                "Review local provider options for patio areas, backyard concrete surfaces, finish preferences, access conditions, and project timing.",
            detail:
                "Concrete patio requests often depend on backyard access, desired size, finish type, connection to existing surfaces, drainage, and preparation needs."
        },
        {
            id: "slabs",
            name: "Concrete Slabs",
            shortName: "Slabs",
            url: "concrete-slabs.html",
            image: "assets/images/service-slabs.jpg",
            icon: "box",
            summary:
                "Explore provider options for slab requests connected to sheds, pads, garages, utility areas, and level concrete surfaces.",
            detail:
                "Concrete slab requests may involve intended use, thickness expectations, base preparation, access, surface leveling, and provider scope details."
        },
        {
            id: "repair",
            name: "Concrete Repair",
            shortName: "Repair",
            url: "concrete-repair.html",
            image: "assets/images/service-repair.jpg",
            icon: "wrench",
            summary:
                "Compare options for cracks, surface damage, uneven sections, resurfacing questions, patching requests, and provider assessment needs.",
            detail:
                "Concrete repair requests may require provider review. Cracks, uneven surfaces, chipped areas, and surface wear can affect available options."
        },
        {
            id: "stamped",
            name: "Stamped Concrete",
            shortName: "Stamped Concrete",
            url: "stamped-concrete.html",
            image: "assets/images/service-stamped.jpg",
            icon: "shapes",
            summary:
                "Connect with provider options for decorative stamped surfaces, pattern preferences, color direction, sealant questions, and finish planning.",
            detail:
                "Stamped concrete requests can depend on pattern, color, surface preparation, sealing expectations, project use, and maintenance terms."
        },
        {
            id: "walkways",
            name: "Concrete Walkways",
            shortName: "Walkways",
            url: "concrete-walkways.html",
            image: "assets/images/service-walkways.jpg",
            icon: "footprints",
            summary:
                "Compare provider options for walkway replacement, new paths, entry connections, slope considerations, transitions, and drainage notes.",
            detail:
                "Concrete walkway requests may involve length, width, slope, steps, transitions, connection points, access, and surrounding surface conditions."
        }
    ],

    cta: {
        heading: "Ready to compare concrete provider options?",
        text:
            "Submit your project details and review available local options before deciding how to continue.",
        primaryLabel: "Start a Request",
        primaryUrl: "contact.html",
        secondaryLabel: "View Services",
        secondaryUrl: "all-services.html",
        image: "assets/images/hero-contact.jpg"
    },

    footer: {
        description:
            "SlabWay is an independent concrete provider-matching platform built to help homeowners organize project details, compare available local options, and make a more informed next step.",
        copyright:
            "© 2026 SlabWay Matching Group LLC. All rights reserved.",
        shortDisclaimer:
            "SlabWay is a free independent provider-matching service. Providers are independent, and final pricing, scheduling, warranties, availability, licensing, insurance, and service terms are provided by participating providers."
    },

    legal: {
        disclaimer:
            "Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.",

        platformNotice:
            "SlabWay is an independent provider-matching platform. We do not perform concrete work directly, do not employ concrete crews, and do not control provider pricing, scheduling, availability, warranties, licensing, insurance, or final service terms.",

        requestNotice:
            "Submitting a request through this website does not create a service agreement. Homeowners should review provider details carefully and verify license, insurance, qualifications, and project terms before hiring."
    },

    form: {
        endpoint: "contact.php",
        method: "POST",
        recipientEmail: "hello@slabway.com",
        successMessage: "Thank you. Your request has been received.",
        errorMessage: "Please check the required fields and try again.",
        privacyLabel:
            "I agree that SlabWay may use my submitted information to process this request and help connect me with participating independent providers.",
        timingFieldName: "requestStartedAt",
        honeypotFieldName: "companyWebsite"
    },

    social: {
        linkedin: "",
        facebook: "",
        instagram: ""
    }
};