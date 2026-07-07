

(function () {
    "use strict";

    const config = window.SLABWAY_CONFIG || {};
    const globalServices = Array.isArray(config.services) ? config.services : [];

    const serviceContent = {
        driveways: {
            id: "driveways",
            title: "Concrete Driveways",
            pageTitle: "Concrete Driveway Provider Options",
            heroText:
                "Compare independent provider options for concrete driveway requests involving replacement, surface updates, repair questions, access, drainage, and finish expectations.",
            image: "assets/images/service-driveways.jpg",
            icon: "road",
            overview:
                "Concrete driveway requests may involve size, slope, access, existing surface removal, drainage, finish type, and provider-specific preparation details. SlabWay helps homeowners organize the request and compare available local provider options.",
            overviewCards: [
                {
                    title: "Driveway size",
                    icon: "ruler",
                    text: "Approximate width, length, slope, and parking needs can help providers understand the request."
                },
                {
                    title: "Existing surface",
                    icon: "scan-line",
                    text: "Old concrete, cracking, uneven sections, or removal needs may affect provider-supplied options."
                }
            ],
            factors: [
                {
                    title: "Access",
                    icon: "truck",
                    text: "Driveway access, street conditions, parking, and equipment space may affect provider responses."
                },
                {
                    title: "Drainage",
                    icon: "waves",
                    text: "Slope, water movement, nearby surfaces, and drainage concerns are useful to describe."
                },
                {
                    title: "Finish",
                    icon: "layers-3",
                    text: "Smooth, brushed, decorative, or replacement-focused finishes may involve different terms."
                },
                {
                    title: "Removal",
                    icon: "hammer",
                    text: "Existing concrete removal, hauling, and site preparation should be compared in provider scope."
                },
                {
                    title: "Timeline",
                    icon: "calendar-range",
                    text: "Scheduling depends on provider availability, project size, weather, and site readiness."
                },
                {
                    title: "Provider terms",
                    icon: "file-check-2",
                    text: "Review warranty, payment terms, written scope, license, and insurance before hiring."
                }
            ],
            prep: [
                {
                    title: "Measure approximately",
                    icon: "maximize",
                    text: "Prepare rough driveway dimensions, parking needs, and connection points."
                },
                {
                    title: "Describe current condition",
                    icon: "scan",
                    text: "Note cracks, settling, surface wear, drainage issues, or old surface removal needs."
                },
                {
                    title: "Share access details",
                    icon: "route",
                    text: "Mention street access, parking, slopes, narrow areas, or nearby structures."
                },
                {
                    title: "Ask about included scope",
                    icon: "list-checks",
                    text: "Compare what each provider includes for preparation, removal, finish, cleanup, and warranty."
                }
            ],
            slides: [
                {
                    tag: "Replacement request",
                    title: "Old driveway surface",
                    icon: "replace",
                    text: "Useful notes include existing surface type, cracking, removal expectations, size, and drainage."
                },
                {
                    tag: "New driveway request",
                    title: "New vehicle surface",
                    icon: "car",
                    text: "Describe planned use, approximate dimensions, slope, parking needs, and access."
                },
                {
                    tag: "Repair question",
                    title: "Cracks or uneven areas",
                    icon: "wrench",
                    text: "Providers may need to review damage before describing repair or replacement options."
                },
                {
                    tag: "Finish planning",
                    title: "Brushed or decorative finish",
                    icon: "palette",
                    text: "Compare finish details, maintenance terms, and provider-supplied service scope."
                }
            ],
            photoText: {
                scope:
                    "Driveway scope can depend on dimensions, vehicle use, surface condition, drainage, removal needs, and finish expectations.",
                access:
                    "Access notes such as street space, slope, parking, equipment routes, and nearby structures can help providers respond.",
                finish:
                    "Finish-related comparison can include brushed texture, decorative options, sealant, maintenance, and provider warranty terms.",
                terms:
                    "Before hiring, compare written scope, price details, scheduling, warranty, license, insurance, and payment terms."
            },
            faqs: [
                {
                    question: "Does SlabWay install concrete driveways?",
                    answer:
                        "No. SlabWay is an independent provider-matching platform and does not install, repair, inspect, or guarantee concrete driveway work."
                },
                {
                    question: "What driveway details should I submit?",
                    answer:
                        "Helpful details include approximate size, current surface condition, access, drainage concerns, removal needs, finish goals, and timeline preferences."
                },
                {
                    question: "Can pricing vary between driveway providers?",
                    answer:
                        "Yes. Pricing, scope, scheduling, warranty, and service terms are supplied by independent providers and can vary."
                },
                {
                    question: "Should I verify license and insurance?",
                    answer:
                        "Yes. Homeowners should verify provider license, insurance, qualifications, references, written scope, and terms before hiring."
                }
            ]
        },

        patios: {
            id: "patios",
            title: "Concrete Patios",
            pageTitle: "Concrete Patio Provider Options",
            heroText:
                "Compare provider options for concrete patio requests involving backyard access, surface size, finish preferences, drainage, and connection to existing outdoor areas.",
            image: "assets/images/service-patios.jpg",
            icon: "layout-panel-top",
            overview:
                "Concrete patio requests often depend on backyard access, approximate size, finish style, drainage, connection to existing surfaces, and preparation needs. SlabWay helps homeowners organize details before comparing independent provider options.",
            overviewCards: [
                {
                    title: "Patio size",
                    icon: "maximize",
                    text: "Approximate dimensions and intended use help providers understand the patio request."
                },
                {
                    title: "Outdoor access",
                    icon: "route",
                    text: "Backyard entry, gates, slopes, and nearby surfaces may affect provider availability and scope."
                }
            ],
            factors: [
                {
                    title: "Backyard conditions",
                    icon: "trees",
                    text: "Yard grade, access, soil, nearby landscaping, and existing surfaces can affect provider responses."
                },
                {
                    title: "Finish style",
                    icon: "palette",
                    text: "Smooth, brushed, decorative, or stamped finishes may involve different provider terms."
                },
                {
                    title: "Drainage",
                    icon: "waves",
                    text: "Water movement, slope, and connection to existing surfaces are useful details to share."
                },
                {
                    title: "Connection points",
                    icon: "corner-down-right",
                    text: "Mention doors, walkways, steps, decks, or other surfaces the patio may connect to."
                },
                {
                    title: "Access",
                    icon: "truck",
                    text: "Narrow gates, limited parking, and backyard routes may affect provider response."
                },
                {
                    title: "Provider terms",
                    icon: "file-check-2",
                    text: "Compare provider-supplied scope, preparation, finish, warranty, and schedule."
                }
            ],
            prep: [
                {
                    title: "Estimate the patio footprint",
                    icon: "ruler",
                    text: "Prepare rough dimensions and intended use, such as dining, seating, or outdoor living."
                },
                {
                    title: "Describe backyard access",
                    icon: "door-open",
                    text: "Mention gate width, slopes, parking, and any access restrictions."
                },
                {
                    title: "Share finish preferences",
                    icon: "shapes",
                    text: "Note whether you prefer smooth, brushed, stamped, or decorative options."
                },
                {
                    title: "Compare provider terms",
                    icon: "signature",
                    text: "Ask about preparation, cleanup, scheduling, warranty, and final written scope."
                }
            ],
            slides: [
                {
                    tag: "Backyard surface",
                    title: "New patio area",
                    icon: "layout-panel-top",
                    text: "Compare providers based on access, surface size, finish, drainage, and preparation notes."
                },
                {
                    tag: "Outdoor living",
                    title: "Dining or seating zone",
                    icon: "armchair",
                    text: "Share intended use so providers can discuss surface planning and finish considerations."
                },
                {
                    tag: "Connection point",
                    title: "Patio near entry",
                    icon: "door-open",
                    text: "Mention doors, steps, walkways, or existing surfaces the patio may connect with."
                },
                {
                    tag: "Finish direction",
                    title: "Decorative patio finish",
                    icon: "palette",
                    text: "Pattern, color, sealant, and maintenance terms may vary by provider."
                }
            ],
            photoText: {
                scope:
                    "Patio scope can depend on approximate size, intended use, finish goals, drainage, and how the surface connects to nearby areas.",
                access:
                    "Backyard access details such as gates, slopes, parking, and equipment routes can help providers understand the request.",
                finish:
                    "Finish comparison can include smooth, brushed, stamped, decorative, color, sealant, and maintenance terms.",
                terms:
                    "Review provider-supplied written scope, pricing structure, schedule, warranty, license, and insurance before hiring."
            },
            faqs: [
                {
                    question: "Does SlabWay build concrete patios?",
                    answer:
                        "No. SlabWay is an independent provider-matching platform and does not build, install, repair, inspect, or guarantee patio work."
                },
                {
                    question: "What patio details help providers respond?",
                    answer:
                        "Useful details include approximate size, backyard access, surface condition, drainage, finish preference, connection points, and timeline."
                },
                {
                    question: "Can I request stamped or decorative patio options?",
                    answer:
                        "Yes. You can include pattern, color, sealant, or decorative finish preferences, but final options and terms come from providers."
                },
                {
                    question: "Are patio provider estimates guaranteed?",
                    answer:
                        "No. Any estimate, quote, schedule, warranty, or service term is provided by the independent provider and may vary."
                }
            ]
        },

        slabs: {
            id: "slabs",
            title: "Concrete Slabs",
            pageTitle: "Concrete Slab Provider Options",
            heroText:
                "Compare provider options for concrete slab requests involving shed pads, utility areas, garage pads, level surfaces, access, and site preparation.",
            image: "assets/images/service-slabs.jpg",
            icon: "box",
            overview:
                "Concrete slab requests may involve intended use, thickness expectations, site preparation, access, surface leveling, and provider scope details. SlabWay helps homeowners prepare request details before comparing participating provider options.",
            overviewCards: [
                {
                    title: "Slab purpose",
                    icon: "box",
                    text: "The intended use can affect what details providers need to review."
                },
                {
                    title: "Site preparation",
                    icon: "shovel",
                    text: "Leveling, base preparation, and access may affect provider-supplied scope."
                }
            ],
            factors: [
                {
                    title: "Intended use",
                    icon: "box",
                    text: "Shed, garage, utility pad, or equipment use may change what providers discuss."
                },
                {
                    title: "Thickness expectations",
                    icon: "layers-3",
                    text: "Any thickness or load-related expectations should be discussed with providers."
                },
                {
                    title: "Level area",
                    icon: "move-horizontal",
                    text: "Slope, grading, and surface levelness can affect preparation details."
                },
                {
                    title: "Access",
                    icon: "truck",
                    text: "Provider availability may depend on access route, parking, and equipment space."
                },
                {
                    title: "Base preparation",
                    icon: "shovel",
                    text: "Compare how providers describe base work, grading, and site readiness."
                },
                {
                    title: "Final terms",
                    icon: "file-check-2",
                    text: "Review written scope, scheduling, warranty, license, and insurance."
                }
            ],
            prep: [
                {
                    title: "Clarify slab use",
                    icon: "box",
                    text: "Explain whether the slab is for a shed, garage, utility area, or general pad."
                },
                {
                    title: "Prepare rough dimensions",
                    icon: "ruler",
                    text: "Share approximate length, width, and any thickness expectations you plan to discuss."
                },
                {
                    title: "Describe the site",
                    icon: "map-pin",
                    text: "Mention slope, soil, existing surface, and whether the area is level."
                },
                {
                    title: "Compare preparation scope",
                    icon: "list-checks",
                    text: "Ask providers how they describe base preparation, grading, cleanup, and warranty terms."
                }
            ],
            slides: [
                {
                    tag: "Utility pad",
                    title: "Small slab request",
                    icon: "box",
                    text: "Prepare dimensions, intended use, access, and site condition notes."
                },
                {
                    tag: "Shed support",
                    title: "Shed slab",
                    icon: "warehouse",
                    text: "Providers may ask about shed size, load expectations, levelness, and access."
                },
                {
                    tag: "Garage or parking",
                    title: "Larger slab area",
                    icon: "car",
                    text: "Compare scope, preparation, thickness discussion, drainage, and scheduling terms."
                },
                {
                    tag: "Site preparation",
                    title: "Leveling and base work",
                    icon: "shovel",
                    text: "Ask how providers explain grading, base preparation, cleanup, and exclusions."
                }
            ],
            photoText: {
                scope:
                    "Slab scope can depend on intended use, approximate dimensions, thickness expectations, site condition, and provider review.",
                access:
                    "Access notes such as parking, equipment route, slope, and nearby structures can help providers understand the site.",
                finish:
                    "Surface finish, leveling, edges, and connection points may be useful to compare in provider-supplied scope.",
                terms:
                    "Review provider-written scope, preparation, warranty, schedule, license, insurance, and payment terms before hiring."
            },
            faqs: [
                {
                    question: "Does SlabWay pour concrete slabs?",
                    answer:
                        "No. SlabWay is an independent provider-matching platform and does not pour, install, inspect, repair, or guarantee concrete slabs."
                },
                {
                    question: "What slab details should I prepare?",
                    answer:
                        "Helpful details include intended use, approximate dimensions, site condition, access, levelness, thickness expectations, and timeline."
                },
                {
                    question: "Can slab requirements vary by purpose?",
                    answer:
                        "Yes. A shed pad, utility slab, garage pad, or other surface may involve different provider conversations and terms."
                },
                {
                    question: "Who determines final slab scope?",
                    answer:
                        "Final scope, pricing, schedule, and warranty terms are provided by independent providers and should be reviewed before hiring."
                }
            ]
        },

        repair: {
            id: "repair",
            title: "Concrete Repair",
            pageTitle: "Concrete Repair Provider Options",
            heroText:
                "Compare provider options for concrete repair requests involving cracks, surface damage, uneven areas, patching, resurfacing questions, and provider assessment needs.",
            image: "assets/images/service-repair.jpg",
            icon: "wrench",
            overview:
                "Concrete repair requests may require provider review. Cracks, uneven surfaces, chipped areas, drainage issues, and surface wear can affect available options. SlabWay helps homeowners organize repair-related details before comparing providers.",
            overviewCards: [
                {
                    title: "Visible damage",
                    icon: "scan-line",
                    text: "Cracks, chips, surface wear, and uneven areas are important to describe."
                },
                {
                    title: "Provider assessment",
                    icon: "file-search",
                    text: "Repair options may depend on provider review and site-specific conditions."
                }
            ],
            factors: [
                {
                    title: "Crack details",
                    icon: "split-square-horizontal",
                    text: "Location, size, spreading, and surface movement may affect provider discussion."
                },
                {
                    title: "Uneven areas",
                    icon: "move-horizontal",
                    text: "Settling, raised edges, and trip concerns should be described clearly."
                },
                {
                    title: "Surface damage",
                    icon: "scan",
                    text: "Chipping, scaling, stains, or worn sections may affect repair-focused options."
                },
                {
                    title: "Drainage issues",
                    icon: "waves",
                    text: "Water pooling or runoff concerns can affect provider recommendations and scope."
                },
                {
                    title: "Resurfacing questions",
                    icon: "layers-3",
                    text: "Ask providers whether repair, resurfacing, or replacement options may apply."
                },
                {
                    title: "Terms and warranty",
                    icon: "file-check-2",
                    text: "Repair warranties and limitations can vary and should be reviewed carefully."
                }
            ],
            prep: [
                {
                    title: "Describe visible concerns",
                    icon: "scan-line",
                    text: "Mention cracks, uneven areas, chipped surfaces, water pooling, or worn sections."
                },
                {
                    title: "Share location and use",
                    icon: "map-pin",
                    text: "Explain whether the issue is on a driveway, patio, walkway, slab, or other surface."
                },
                {
                    title: "Include rough size",
                    icon: "ruler",
                    text: "Approximate affected area and damage pattern can help providers understand the request."
                },
                {
                    title: "Ask about repair limits",
                    icon: "message-square-text",
                    text: "Compare provider terms for patching, resurfacing, replacement, warranty, and exclusions."
                }
            ],
            slides: [
                {
                    tag: "Crack concern",
                    title: "Visible cracking",
                    icon: "split-square-horizontal",
                    text: "Providers may need to review crack type, location, movement, and surrounding surface."
                },
                {
                    tag: "Surface wear",
                    title: "Chipped or worn concrete",
                    icon: "scan",
                    text: "Share surface photos and notes about age, use, water exposure, and damage size."
                },
                {
                    tag: "Uneven area",
                    title: "Raised or settled section",
                    icon: "move-horizontal",
                    text: "Describe trip concerns, location, drainage, and connection to nearby surfaces."
                },
                {
                    tag: "Resurface question",
                    title: "Repair vs replacement",
                    icon: "replace",
                    text: "Ask participating providers what options they can discuss after review."
                }
            ],
            photoText: {
                scope:
                    "Repair scope can depend on crack pattern, surface damage, location, age, water exposure, and provider assessment.",
                access:
                    "Access details help providers understand whether the affected surface is easy to inspect, reach, and work around.",
                finish:
                    "Repair-focused finishes may not match existing surfaces perfectly. Ask providers about appearance, limitations, and warranty terms.",
                terms:
                    "Review repair limitations, exclusions, written scope, warranty, schedule, license, and insurance before hiring."
            },
            faqs: [
                {
                    question: "Does SlabWay repair concrete?",
                    answer:
                        "No. SlabWay is an independent provider-matching platform and does not repair, inspect, supervise, warrant, or guarantee concrete work."
                },
                {
                    question: "Can providers tell if repair or replacement is better?",
                    answer:
                        "Participating providers may discuss options after reviewing the details. SlabWay does not diagnose concrete conditions or recommend a specific repair."
                },
                {
                    question: "What repair details should I submit?",
                    answer:
                        "Helpful details include crack location, affected area size, uneven sections, drainage issues, surface wear, photos if available, and timeline."
                },
                {
                    question: "Are repair results guaranteed?",
                    answer:
                        "SlabWay does not guarantee repair results. Any warranty, limitation, or service term is provided by the independent provider."
                }
            ]
        },

        stamped: {
            id: "stamped",
            title: "Stamped Concrete",
            pageTitle: "Stamped Concrete Provider Options",
            heroText:
                "Compare provider options for stamped concrete requests involving pattern preferences, color direction, sealant terms, surface prep, and decorative finish planning.",
            image: "assets/images/service-stamped.jpg",
            icon: "shapes",
            overview:
                "Stamped concrete requests can depend on pattern, color, surface preparation, sealing expectations, project use, and provider maintenance terms. SlabWay helps homeowners prepare finish-related details before comparing provider options.",
            overviewCards: [
                {
                    title: "Pattern direction",
                    icon: "shapes",
                    text: "Pattern preference, surface use, and visual goals can help providers discuss options."
                },
                {
                    title: "Color and sealant",
                    icon: "palette",
                    text: "Color direction and sealant expectations should be compared in provider terms."
                }
            ],
            factors: [
                {
                    title: "Pattern preference",
                    icon: "shapes",
                    text: "Stone, tile, slate, brick, or custom-looking patterns may vary by provider."
                },
                {
                    title: "Color direction",
                    icon: "palette",
                    text: "Share color preferences and ask about provider-supplied color limitations."
                },
                {
                    title: "Surface prep",
                    icon: "shovel",
                    text: "Preparation, existing surface removal, and base work should be compared in scope."
                },
                {
                    title: "Sealant",
                    icon: "sparkles",
                    text: "Sealant type, maintenance, appearance, and warranty terms can vary."
                },
                {
                    title: "Project use",
                    icon: "layout-panel-top",
                    text: "Patio, walkway, driveway, or entry use may affect provider discussion."
                },
                {
                    title: "Maintenance terms",
                    icon: "file-check-2",
                    text: "Ask about cleaning, resealing, limitations, and written warranty details."
                }
            ],
            prep: [
                {
                    title: "Choose pattern direction",
                    icon: "shapes",
                    text: "Prepare examples or notes about stamped pattern preferences."
                },
                {
                    title: "Share color goals",
                    icon: "palette",
                    text: "Mention desired color direction and ask providers about available options."
                },
                {
                    title: "Describe surface use",
                    icon: "layout-panel-top",
                    text: "Explain whether the stamped surface is for a patio, walkway, driveway, or other area."
                },
                {
                    title: "Ask about sealant",
                    icon: "sparkles",
                    text: "Compare sealant, maintenance, resealing, limitations, and provider warranty terms."
                }
            ],
            slides: [
                {
                    tag: "Decorative pattern",
                    title: "Stamped surface look",
                    icon: "shapes",
                    text: "Prepare pattern examples and ask providers what options they offer."
                },
                {
                    tag: "Color planning",
                    title: "Color and tone",
                    icon: "palette",
                    text: "Provider color options, limitations, and appearance terms may vary."
                },
                {
                    tag: "Sealant terms",
                    title: "Finish protection",
                    icon: "sparkles",
                    text: "Compare sealant details, maintenance expectations, and warranty information."
                },
                {
                    tag: "Surface use",
                    title: "Patio, walkway, or driveway",
                    icon: "route",
                    text: "Share where the stamped surface will be used and how much traffic it may receive."
                }
            ],
            photoText: {
                scope:
                    "Stamped concrete scope can depend on surface use, pattern, color, preparation, access, and provider-supplied decorative finish terms.",
                access:
                    "Access details can affect provider availability, especially for backyard patios, narrow paths, or driveway work areas.",
                finish:
                    "Pattern, color, sealant, texture, and maintenance terms should be compared carefully before selecting a provider.",
                terms:
                    "Review provider-supplied written scope, finish limitations, warranty, maintenance terms, license, and insurance."
            },
            faqs: [
                {
                    question: "Does SlabWay install stamped concrete?",
                    answer:
                        "No. SlabWay is an independent provider-matching platform and does not install, design, seal, repair, or guarantee stamped concrete."
                },
                {
                    question: "What stamped concrete details should I submit?",
                    answer:
                        "Helpful details include surface type, approximate size, pattern preference, color direction, sealant questions, access, and timeline."
                },
                {
                    question: "Can stamped concrete options vary by provider?",
                    answer:
                        "Yes. Pattern options, color choices, sealant terms, maintenance requirements, pricing, and warranty details can vary by provider."
                },
                {
                    question: "Should I ask about maintenance?",
                    answer:
                        "Yes. Ask providers about cleaning, sealing, resealing, appearance limitations, warranty terms, and recommended maintenance."
                }
            ]
        },

        walkways: {
            id: "walkways",
            title: "Concrete Walkways",
            pageTitle: "Concrete Walkway Provider Options",
            heroText:
                "Compare provider options for concrete walkway requests involving path length, width, slope, transitions, drainage, and connections to driveways, patios, or entries.",
            image: "assets/images/service-walkways.jpg",
            icon: "footprints",
            overview:
                "Concrete walkway requests may involve length, width, slope, steps, transitions, connection points, access, and surrounding surface conditions. SlabWay helps homeowners organize walkway details before comparing providers.",
            overviewCards: [
                {
                    title: "Path layout",
                    icon: "route",
                    text: "Length, width, turns, entries, and connection points help frame the request."
                },
                {
                    title: "Slope and transitions",
                    icon: "move-up-right",
                    text: "Steps, slopes, drainage, and nearby surfaces can affect provider scope."
                }
            ],
            factors: [
                {
                    title: "Length and width",
                    icon: "ruler",
                    text: "Approximate path dimensions help providers understand the walkway request."
                },
                {
                    title: "Slope",
                    icon: "move-up-right",
                    text: "Grade changes, steps, and transitions should be described clearly."
                },
                {
                    title: "Drainage",
                    icon: "waves",
                    text: "Water movement, runoff, and nearby surfaces may affect provider discussion."
                },
                {
                    title: "Connection points",
                    icon: "corner-down-right",
                    text: "Mention driveway, patio, porch, entry, side yard, or garden connections."
                },
                {
                    title: "Access",
                    icon: "truck",
                    text: "Narrow side yards, fences, gates, and equipment access can matter."
                },
                {
                    title: "Provider terms",
                    icon: "file-check-2",
                    text: "Compare scope, finish, scheduling, warranty, license, and insurance details."
                }
            ],
            prep: [
                {
                    title: "Map the route",
                    icon: "route",
                    text: "Describe where the walkway starts, ends, turns, and connects."
                },
                {
                    title: "Estimate dimensions",
                    icon: "ruler",
                    text: "Prepare rough length, width, and any step or transition notes."
                },
                {
                    title: "Describe slope and drainage",
                    icon: "waves",
                    text: "Mention water pooling, grade changes, and nearby surfaces."
                },
                {
                    title: "Compare written terms",
                    icon: "signature",
                    text: "Ask providers about scope, finish, preparation, warranty, and schedule."
                }
            ],
            slides: [
                {
                    tag: "Entry path",
                    title: "Front walkway",
                    icon: "footprints",
                    text: "Share length, width, entry connection, slope, and finish preferences."
                },
                {
                    tag: "Side yard",
                    title: "Narrow access walkway",
                    icon: "route",
                    text: "Mention fence gates, side-yard width, drainage, and equipment access."
                },
                {
                    tag: "Replacement request",
                    title: "Old walkway surface",
                    icon: "replace",
                    text: "Describe cracks, uneven areas, removal needs, and connection points."
                },
                {
                    tag: "Transition area",
                    title: "Steps or slope",
                    icon: "move-up-right",
                    text: "Compare provider discussion around grade changes, steps, and drainage."
                }
            ],
            photoText: {
                scope:
                    "Walkway scope can depend on path length, width, route, slope, transitions, drainage, and connection points.",
                access:
                    "Access details such as narrow side yards, gates, parking, and equipment route can affect provider response.",
                finish:
                    "Finish comparison can include texture, surface appearance, edges, slip considerations, and provider maintenance terms.",
                terms:
                    "Review written scope, preparation, scheduling, warranty, license, insurance, and payment terms before hiring."
            },
            faqs: [
                {
                    question: "Does SlabWay install concrete walkways?",
                    answer:
                        "No. SlabWay is an independent provider-matching platform and does not install, repair, inspect, or guarantee walkway work."
                },
                {
                    question: "What walkway details should I submit?",
                    answer:
                        "Helpful details include path length, width, start and end points, slope, drainage, transitions, surface condition, and access."
                },
                {
                    question: "Can walkway pricing vary?",
                    answer:
                        "Yes. Pricing, schedule, scope, finish, warranty, and service terms are supplied by independent providers and can vary."
                },
                {
                    question: "Should I verify provider credentials?",
                    answer:
                        "Yes. Homeowners should verify license, insurance, qualifications, written scope, and service terms before hiring."
                }
            ]
        }
    };

    document.addEventListener("DOMContentLoaded", initServicePage);

    function initServicePage() {
        const page = document.querySelector("[data-service-page]");
        if (!page) return;

        const serviceId = page.getAttribute("data-service-id") || inferServiceId();
        const service = serviceContent[serviceId] || serviceContent.driveways;

        hydrateServicePage(service);
        initRelatedServices(service);
        injectFaqSchema(service);
        refreshIcons();

        if (window.SlabWayAccordion && typeof window.SlabWayAccordion.init === "function") {
            window.SlabWayAccordion.init(document);
        }
    }

    function inferServiceId() {
        const file = window.location.pathname.split("/").pop();

        const map = {
            "concrete-driveways.html": "driveways",
            "concrete-patios.html": "patios",
            "concrete-slabs.html": "slabs",
            "concrete-repair.html": "repair",
            "stamped-concrete.html": "stamped",
            "concrete-walkways.html": "walkways"
        };

        return map[file] || "driveways";
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

    function resolveAssetUrl(path) {
        return new URL(String(path ?? ""), window.location.href).href;
    }

    function icon(name) {
        return `<i data-lucide="${escapeHtml(name)}" aria-hidden="true"></i>`;
    }

    function matchingGlobalService(serviceId) {
        return globalServices.find((service) => service.id === serviceId) || null;
    }

    

    function hydrateServicePage(service) {
        const globalService = matchingGlobalService(service.id);
        const serviceImageUrl = resolveAssetUrl(service.image);

        document.querySelectorAll("[data-service-title]").forEach((element) => {
            element.textContent = service.title;
        });

        document.querySelectorAll("[data-service-page-title]").forEach((element) => {
            element.textContent = service.pageTitle;
        });

        document.querySelectorAll("[data-service-hero-text]").forEach((element) => {
            element.textContent = service.heroText;
        });

        document.querySelectorAll("[data-service-overview-text]").forEach((element) => {
            element.textContent = service.overview;
        });

        document.querySelectorAll("[data-service-image-style]").forEach((element) => {
            element.style.setProperty("--hero-image", `url('${serviceImageUrl}')`);
            element.style.setProperty("--service-parallax-image", `url('${serviceImageUrl}')`);

            const overviewImage = element.getAttribute("data-service-overview-image");
            const overviewImageUrl = overviewImage ? resolveAssetUrl(overviewImage) : serviceImageUrl;

            element.style.setProperty("--service-overview-image", `url('${overviewImageUrl}')`);
        });

        const overviewMeta = document.querySelector("[data-service-overview-meta]");
        if (overviewMeta) {
            overviewMeta.innerHTML = service.overviewCards
                .map(
                    (card) => `
            <article class="service-detail-overview__meta-card">
              ${icon(card.icon)}
              <strong>${escapeHtml(card.title)}</strong>
              <span>${escapeHtml(card.text)}</span>
            </article>
          `
                )
                .join("");
        }

        const visualContent = document.querySelector("[data-service-overview-visual-content]");
        if (visualContent) {
            visualContent.innerHTML = `
        ${icon(service.icon)}
        <h3>${escapeHtml(service.title)}</h3>
        <p>${escapeHtml(globalService ? globalService.summary : service.heroText)}</p>
      `;
        }

        const faqAccordion = document.querySelector("[data-service-faq-accordion]");
        if (faqAccordion) {
            faqAccordion.innerHTML = service.faqs
                .map(
                    (faq, index) => `
            <article class="accordion-item ${index === 0 ? "is-open" : ""}" data-accordion-item>
              <button class="accordion-trigger" type="button" data-accordion-trigger>
                <span>${escapeHtml(faq.question)}</span>
                <span class="accordion-icon" aria-hidden="true"></span>
              </button>
              <div class="accordion-panel" data-accordion-panel>
                <div class="accordion-panel__inner">
                  ${escapeHtml(faq.answer)}
                </div>
              </div>
            </article>
          `
                )
                .join("");
        }

        const parallaxText = document.querySelector("[data-service-parallax-text]");
        if (parallaxText) {
            parallaxText.textContent =
                "Use SlabWay to organize this request and compare available independent provider options. Final scope, timing, pricing, warranty, and service terms are provided by participating providers.";
        }

        refreshIcons();
    }

    

    function initRelatedServices(currentService) {
        const swiperElement = document.querySelector("[data-service-related-swiper]");
        const wrapper = document.querySelector("[data-service-related-wrapper]");

        if (!swiperElement || !wrapper || !globalServices.length) return;

        const related = globalServices.filter((service) => service.id !== currentService.id);

        wrapper.innerHTML = related
            .map(
                (service) => `
          <div class="swiper-slide">
            <a
              class="service-detail-related-card card-shine"
              href="${escapeHtml(service.url)}"
              style="--related-image: url('${escapeHtml(resolveAssetUrl(service.image))}')"
            >
              <span class="service-detail-related-card__icon">
                ${icon(service.icon || "square-stack")}
              </span>

              <span class="service-detail-related-card__content">
                <h3>${escapeHtml(service.name)}</h3>
                <p>${escapeHtml(service.summary)}</p>
                <span class="icon-link">
                  View category
                  ${icon("arrow-right")}
                </span>
              </span>
            </a>
          </div>
        `
            )
            .join("");

        const section = swiperElement.closest(".service-detail-related");
        const pagination = section ? section.querySelector("[data-service-related-pagination]") : null;
        const nextButton = section ? section.querySelector("[data-service-related-next]") : null;
        const prevButton = section ? section.querySelector("[data-service-related-prev]") : null;

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
                        slidesPerView: 1.08
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

    (function () {
        const slider = document.querySelector(".service-insight__slider");
        if (!slider || typeof Swiper === "undefined") return;

        new Swiper(slider, {
            slidesPerView: 1,
            speed: 850,
            loop: true,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            navigation: {
                nextEl: ".service-insight__next",
                prevEl: ".service-insight__prev"
            },
            keyboard: {
                enabled: true
            }
        });
    })();

    

    function injectFaqSchema(service) {
        if (!service.faqs || !service.faqs.length) return;

        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer
                }
            }))
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }
})();
