{
  "project_meta": {
    "project_type": "Enterprise E-Commerce Platform (physical products)",
    "delivery_model": "Hybrid: own local delivery fleet + third-party shipping carrier integration",
    "scale_target": "Full enterprise-scale, high-traffic",
    "generated_for": "Use as a master build prompt / specification handed to a development team or an AI coding assistant",
    "total_pages": 89,
    "total_features": 314,
    "applications_included": [
      "Customer Web & Mobile App",
      "Admin Dashboard (Back Office)",
      "Delivery Driver Mobile App"
    ]
  },
  "research_basis": [
    "2026 enterprise e-commerce platform landscape (Shopify Plus, BigCommerce Enterprise, Adobe Commerce, Salesforce Commerce Cloud, commercetools, VTEX)",
    "Admin dashboard feature patterns from modern e-commerce back-office templates",
    "Last-mile delivery/driver-app patterns (Onfleet, Track-POD, TrackoMile, SmartRoutes)",
    "Multi-carrier shipping API patterns (EasyPost, Shippo, ShipStation) plus Egypt/MENA carriers (Bosta, Aramex, Mylerz)",
    "Payment gateway landscape incl. Paymob for Egypt/MENA",
    "Microservices/composable commerce architecture guidance for 2026",
    "Multi-warehouse inventory management (WMS) best practices",
    "E-commerce marketing automation & loyalty patterns",
    "PCI DSS / GDPR / CCPA e-commerce compliance requirements",
    "Order Management System (OMS) / RMA feature patterns",
    "AI-powered search & personalization (Algolia/Elasticsearch) patterns"
  ],
  "integration_key_legend": {
    "PAY": "Payment Gateway Service (cards, wallets, BNPL, COD)",
    "SHIP": "Shipping Carrier Integration (3rd-party couriers)",
    "DISPATCH": "Local Delivery Dispatch & Routing Engine (own driver fleet)",
    "MAP": "Maps & Geolocation Service",
    "SEARCH": "Search & Recommendation Engine",
    "NOTIF": "Notification Service (SMS / Email / Push / WhatsApp)",
    "AUTH": "Authentication & Identity Service",
    "CDN": "CDN & Object/Media Storage",
    "ANALYTICS": "Analytics & Tracking",
    "CRM": "Marketing Automation / CRM",
    "REVIEWS": "Reviews & Ratings Service",
    "LOYALTY": "Loyalty & Rewards Engine",
    "SUPPORT": "Customer Support / Helpdesk",
    "TAX": "Tax Calculation Engine",
    "FRAUD": "Fraud Detection Engine",
    "ERP": "ERP / Accounting Sync",
    "WMS": "Warehouse & Inventory Management Service (internal)",
    "OMS": "Order Management Service (internal)"
  },
  "recommended_tech_stack": {
    "architecture_pattern": "API-first, headless commerce built on independently-scalable microservices behind an API Gateway.",
    "frontend_customer": "Next.js + React + TypeScript + Tailwind CSS (SSR for SEO, React Native or Flutter for iOS/Android apps).",
    "frontend_admin": "React + TypeScript admin SPA (e.g. Next.js dashboard) with role-based UI rendering.",
    "frontend_driver_app": "React Native or Flutter for a single cross-platform driver codebase with offline-first local storage.",
    "backend_services": [
      "Auth Service",
      "Product/Catalog Service",
      "Inventory/Warehouse Service",
      "Order Service",
      "Payment Service",
      "Shipping/Dispatch Service",
      "Notification Service",
      "Search Service",
      "Review Service",
      "Promotion/Loyalty Service",
      "Reporting/Analytics Service",
      "API Gateway"
    ],
    "backend_stack_options": [
      "Node.js (NestJS) microservices",
      "or Java Spring Boot microservices"
    ],
    "databases": [
      "PostgreSQL (transactional core)",
      "Redis (cache & sessions)",
      "Elasticsearch/Algolia (search index)",
      "S3-compatible object storage (media)"
    ],
    "messaging": "Kafka or RabbitMQ for asynchronous events (order placed, stock changed, notification triggers).",
    "infrastructure": [
      "Docker",
      "Kubernetes",
      "CI/CD via GitHub Actions",
      "Cloudflare (CDN + WAF)"
    ],
    "observability": [
      "Sentry (errors)",
      "Prometheus + Grafana (metrics)",
      "ELK stack or Datadog (logs)"
    ],
    "note": "Reference points from 2026 enterprise research: Shopify Plus, BigCommerce Enterprise, Adobe Commerce, Salesforce Commerce Cloud and commercetools all converge on this composable/microservices, API-first pattern for high-traffic, high-catalog operations."
  },
  "user_roles": [
    "Guest / Visitor",
    "Registered Customer",
    "Super Admin",
    "Catalog Manager (admin staff)",
    "Order/Fulfillment Manager (admin staff)",
    "Marketing Manager (admin staff)",
    "Finance/Accounting Staff",
    "Support Agent",
    "Warehouse Staff",
    "Dispatcher / Logistics Coordinator",
    "Delivery Driver / Rider"
  ],
  "applications": [
    {
      "app_id": 1,
      "name": "Customer Web & Mobile App",
      "platforms": [
        "Responsive Web",
        "iOS",
        "Android"
      ],
      "description": "Customer-facing storefront where shoppers browse, buy and track physical-product orders.",
      "page_count": 43,
      "pages": [
        {
          "page_id": 1,
          "name": "Homepage",
          "purpose": "Main landing page showcasing brand, promotions and personalized content.",
          "features": [
            {
              "id": "1.1",
              "name": "Hero banner/carousel (admin-managed)"
            },
            {
              "id": "1.2",
              "name": "Featured & trending product carousels"
            },
            {
              "id": "1.3",
              "name": "AI-personalized recommendations"
            },
            {
              "id": "1.4",
              "name": "Category quick-links"
            },
            {
              "id": "1.5",
              "name": "Flash-deal countdown widget"
            },
            {
              "id": "1.6",
              "name": "Newsletter signup block"
            }
          ],
          "connects_with": [
            "SEARCH",
            "CRM",
            "ANALYTICS",
            "CDN"
          ]
        },
        {
          "page_id": 2,
          "name": "Category / Collection Listing Page",
          "purpose": "Grid of products belonging to a top-level category.",
          "features": [
            {
              "id": "2.1",
              "name": "Attribute filters (size, color, brand, price)"
            },
            {
              "id": "2.2",
              "name": "Sort (price, popularity, newest, rating)"
            },
            {
              "id": "2.3",
              "name": "Pagination / infinite scroll"
            },
            {
              "id": "2.4",
              "name": "Breadcrumb navigation"
            }
          ],
          "connects_with": [
            "SEARCH",
            "ANALYTICS"
          ]
        },
        {
          "page_id": 3,
          "name": "Subcategory Page",
          "purpose": "Filtered product grid for a nested subcategory.",
          "features": [
            {
              "id": "3.1",
              "name": "Nested category breadcrumbs"
            },
            {
              "id": "3.2",
              "name": "Subcategory banner/content block"
            },
            {
              "id": "3.3",
              "name": "Inherited + local filters"
            }
          ],
          "connects_with": [
            "SEARCH"
          ]
        },
        {
          "page_id": 4,
          "name": "Product Search Results Page",
          "purpose": "Results page for the global search bar.",
          "features": [
            {
              "id": "4.1",
              "name": "Instant search-as-you-type"
            },
            {
              "id": "4.2",
              "name": "Typo-tolerant / synonym search"
            },
            {
              "id": "4.3",
              "name": "Facet filters on results"
            },
            {
              "id": "4.4",
              "name": "No-results smart suggestions"
            }
          ],
          "connects_with": [
            "SEARCH",
            "ANALYTICS"
          ]
        },
        {
          "page_id": 5,
          "name": "Product Detail Page",
          "purpose": "Full information and purchase entry point for a single product.",
          "features": [
            {
              "id": "5.1",
              "name": "Image gallery with zoom / 360° view"
            },
            {
              "id": "5.2",
              "name": "Variant selector (size, color, etc.)"
            },
            {
              "id": "5.3",
              "name": "Live per-warehouse stock availability"
            },
            {
              "id": "5.4",
              "name": "Price, discount & tax-inclusive display"
            },
            {
              "id": "5.5",
              "name": "Add-to-cart / Buy-now actions"
            },
            {
              "id": "5.6",
              "name": "Related & frequently-bought-together products"
            },
            {
              "id": "5.7",
              "name": "Q&A section"
            },
            {
              "id": "5.8",
              "name": "Delivery estimate by postcode/zone"
            }
          ],
          "connects_with": [
            "SEARCH",
            "WMS",
            "SHIP",
            "PAY",
            "REVIEWS"
          ]
        },
        {
          "page_id": 6,
          "name": "Product Reviews & Ratings Section",
          "purpose": "Customer feedback attached to a product.",
          "features": [
            {
              "id": "6.1",
              "name": "Star-rating summary & histogram"
            },
            {
              "id": "6.2",
              "name": "Verified-purchase badge"
            },
            {
              "id": "6.3",
              "name": "Photo/video reviews"
            },
            {
              "id": "6.4",
              "name": "Helpful-vote & report button"
            }
          ],
          "connects_with": [
            "REVIEWS"
          ]
        },
        {
          "page_id": 7,
          "name": "Compare Products Page",
          "purpose": "Side-by-side spec comparison of selected items.",
          "features": [
            {
              "id": "7.1",
              "name": "Add/remove items from comparison tray"
            },
            {
              "id": "7.2",
              "name": "Attribute-by-attribute comparison table"
            },
            {
              "id": "7.3",
              "name": "Direct add-to-cart from comparison"
            }
          ],
          "connects_with": [
            "SEARCH"
          ]
        },
        {
          "page_id": 8,
          "name": "Wishlist / Favorites Page",
          "purpose": "Saved products for later purchase.",
          "features": [
            {
              "id": "8.1",
              "name": "Add/remove items"
            },
            {
              "id": "8.2",
              "name": "Move item to cart"
            },
            {
              "id": "8.3",
              "name": "Price-drop / back-in-stock alerts"
            },
            {
              "id": "8.4",
              "name": "Share wishlist link"
            }
          ],
          "connects_with": [
            "NOTIF",
            "CRM"
          ]
        },
        {
          "page_id": 9,
          "name": "Shopping Cart Page",
          "purpose": "Review and adjust items before checkout.",
          "features": [
            {
              "id": "9.1",
              "name": "Quantity update / remove item"
            },
            {
              "id": "9.2",
              "name": "Promo/coupon code field"
            },
            {
              "id": "9.3",
              "name": "Real-time shipping cost estimate"
            },
            {
              "id": "9.4",
              "name": "Cross-sell suggestions"
            },
            {
              "id": "9.5",
              "name": "Save-for-later list"
            }
          ],
          "connects_with": [
            "PAY",
            "SHIP",
            "TAX"
          ]
        },
        {
          "page_id": 10,
          "name": "Checkout – Shipping & Address Step",
          "purpose": "First checkout step collecting delivery details.",
          "features": [
            {
              "id": "10.1",
              "name": "Address autocomplete"
            },
            {
              "id": "10.2",
              "name": "Multiple saved addresses"
            },
            {
              "id": "10.3",
              "name": "Delivery method choice (own courier vs carrier vs pickup)"
            },
            {
              "id": "10.4",
              "name": "Estimated delivery date per method"
            },
            {
              "id": "10.5",
              "name": "Address validation"
            }
          ],
          "connects_with": [
            "MAP",
            "SHIP",
            "TAX"
          ]
        },
        {
          "page_id": 11,
          "name": "Checkout – Payment Step",
          "purpose": "Second checkout step for payment method and confirmation of amounts.",
          "features": [
            {
              "id": "11.1",
              "name": "Multiple payment methods (card, wallet, BNPL, Cash on Delivery)"
            },
            {
              "id": "11.2",
              "name": "Saved/tokenized cards"
            },
            {
              "id": "11.3",
              "name": "3D-Secure authentication"
            },
            {
              "id": "11.4",
              "name": "Order summary with tax & shipping breakdown"
            },
            {
              "id": "11.5",
              "name": "Coupon/gift-card application"
            }
          ],
          "connects_with": [
            "PAY",
            "FRAUD",
            "TAX"
          ]
        },
        {
          "page_id": 12,
          "name": "Checkout – Review & Place Order Step",
          "purpose": "Final confirmation step before submitting the order.",
          "features": [
            {
              "id": "12.1",
              "name": "Full order review"
            },
            {
              "id": "12.2",
              "name": "Terms & conditions acceptance"
            },
            {
              "id": "12.3",
              "name": "Edit-any-step shortcut"
            },
            {
              "id": "12.4",
              "name": "Place-order action with loading/confirmation state"
            }
          ],
          "connects_with": [
            "OMS",
            "PAY"
          ]
        },
        {
          "page_id": 13,
          "name": "Order Confirmation / Thank-You Page",
          "purpose": "Post-purchase confirmation screen.",
          "features": [
            {
              "id": "13.1",
              "name": "Order number & itemized summary"
            },
            {
              "id": "13.2",
              "name": "Estimated delivery window"
            },
            {
              "id": "13.3",
              "name": "Downloadable invoice"
            },
            {
              "id": "13.4",
              "name": "Post-purchase upsell suggestions"
            }
          ],
          "connects_with": [
            "NOTIF",
            "OMS"
          ]
        },
        {
          "page_id": 14,
          "name": "Registration Page",
          "purpose": "New customer account creation.",
          "features": [
            {
              "id": "14.1",
              "name": "Email/phone signup form"
            },
            {
              "id": "14.2",
              "name": "Social sign-up (Google, Apple, Facebook)"
            },
            {
              "id": "14.3",
              "name": "OTP verification"
            },
            {
              "id": "14.4",
              "name": "Password-strength meter"
            }
          ],
          "connects_with": [
            "AUTH",
            "NOTIF"
          ]
        },
        {
          "page_id": 15,
          "name": "Login Page",
          "purpose": "Returning customer authentication.",
          "features": [
            {
              "id": "15.1",
              "name": "Email/phone + password login"
            },
            {
              "id": "15.2",
              "name": "Social login"
            },
            {
              "id": "15.3",
              "name": "“Remember me” session"
            },
            {
              "id": "15.4",
              "name": "Biometric login on mobile"
            }
          ],
          "connects_with": [
            "AUTH"
          ]
        },
        {
          "page_id": 16,
          "name": "Forgot / Reset Password Page",
          "purpose": "Account-recovery flow.",
          "features": [
            {
              "id": "16.1",
              "name": "Email or SMS OTP reset link"
            },
            {
              "id": "16.2",
              "name": "New-password form with confirmation"
            },
            {
              "id": "16.3",
              "name": "Automatic session invalidation on reset"
            }
          ],
          "connects_with": [
            "AUTH",
            "NOTIF"
          ]
        },
        {
          "page_id": 17,
          "name": "Account Dashboard (Overview)",
          "purpose": "Central hub for a logged-in customer.",
          "features": [
            {
              "id": "17.1",
              "name": "Profile summary card"
            },
            {
              "id": "17.2",
              "name": "Recent orders widget"
            },
            {
              "id": "17.3",
              "name": "Loyalty points balance"
            },
            {
              "id": "17.4",
              "name": "Quick links to addresses, payment methods, wishlist"
            }
          ],
          "connects_with": [
            "LOYALTY",
            "OMS"
          ]
        },
        {
          "page_id": 18,
          "name": "Order History Page",
          "purpose": "List of all past and current orders.",
          "features": [
            {
              "id": "18.1",
              "name": "Filter by status/date range"
            },
            {
              "id": "18.2",
              "name": "One-click reorder"
            },
            {
              "id": "18.3",
              "name": "Download invoice/receipt"
            },
            {
              "id": "18.4",
              "name": "Cancel-eligible order flag"
            }
          ],
          "connects_with": [
            "OMS"
          ]
        },
        {
          "page_id": 19,
          "name": "Order Detail & Live Tracking Page",
          "purpose": "Deep-dive view of a single order with real-time status.",
          "features": [
            {
              "id": "19.1",
              "name": "Status timeline (placed → packed → out for delivery → delivered)"
            },
            {
              "id": "19.2",
              "name": "Live map of driver location for local deliveries"
            },
            {
              "id": "19.3",
              "name": "Carrier tracking number & link for shipped orders"
            },
            {
              "id": "19.4",
              "name": "In-app chat/call with assigned driver"
            },
            {
              "id": "19.5",
              "name": "Proof-of-delivery photo/signature view"
            }
          ],
          "connects_with": [
            "MAP",
            "SHIP",
            "DISPATCH",
            "NOTIF"
          ]
        },
        {
          "page_id": 20,
          "name": "Guest Order Tracking Page",
          "purpose": "Order tracking without requiring login.",
          "features": [
            {
              "id": "20.1",
              "name": "Track by order number + email/phone"
            },
            {
              "id": "20.2",
              "name": "Same live-status view as logged-in tracking"
            }
          ],
          "connects_with": [
            "SHIP",
            "DISPATCH"
          ]
        },
        {
          "page_id": 21,
          "name": "Returns & Refund Request Page",
          "purpose": "Self-service return/exchange initiation.",
          "features": [
            {
              "id": "21.1",
              "name": "Select items & reason for return"
            },
            {
              "id": "21.2",
              "name": "Upload supporting photos"
            },
            {
              "id": "21.3",
              "name": "Choose refund vs. exchange"
            },
            {
              "id": "21.4",
              "name": "Auto-generate return shipping label"
            }
          ],
          "connects_with": [
            "SHIP",
            "OMS",
            "PAY"
          ]
        },
        {
          "page_id": 22,
          "name": "Address Book Page",
          "purpose": "Manage saved delivery/billing addresses.",
          "features": [
            {
              "id": "22.1",
              "name": "Add/edit/delete addresses"
            },
            {
              "id": "22.2",
              "name": "Set default shipping & billing address"
            },
            {
              "id": "22.3",
              "name": "Map-pin location picker"
            }
          ],
          "connects_with": [
            "MAP"
          ]
        },
        {
          "page_id": 23,
          "name": "Saved Payment Methods Page",
          "purpose": "Manage stored payment instruments.",
          "features": [
            {
              "id": "23.1",
              "name": "Add/remove tokenized cards or wallets"
            },
            {
              "id": "23.2",
              "name": "Set default payment method"
            }
          ],
          "connects_with": [
            "PAY"
          ]
        },
        {
          "page_id": 24,
          "name": "Notifications Center Page",
          "purpose": "In-app inbox for all customer notifications.",
          "features": [
            {
              "id": "24.1",
              "name": "Order-update notifications"
            },
            {
              "id": "24.2",
              "name": "Promotional alerts"
            },
            {
              "id": "24.3",
              "name": "Price-drop/back-in-stock alerts"
            },
            {
              "id": "24.4",
              "name": "Read/unread state & preference toggles"
            }
          ],
          "connects_with": [
            "NOTIF"
          ]
        },
        {
          "page_id": 25,
          "name": "Loyalty & Rewards Page",
          "purpose": "Loyalty program management for the customer.",
          "features": [
            {
              "id": "25.1",
              "name": "Points balance & earning history"
            },
            {
              "id": "25.2",
              "name": "Tier status & benefits"
            },
            {
              "id": "25.3",
              "name": "Redeemable rewards catalog"
            },
            {
              "id": "25.4",
              "name": "Referral program & referral code sharing"
            }
          ],
          "connects_with": [
            "LOYALTY",
            "CRM"
          ]
        },
        {
          "page_id": 26,
          "name": "Gift Cards Page",
          "purpose": "Purchase and manage digital gift cards.",
          "features": [
            {
              "id": "26.1",
              "name": "Buy a digital gift card (custom amount)"
            },
            {
              "id": "26.2",
              "name": "Redeem gift-card code at checkout"
            },
            {
              "id": "26.3",
              "name": "Balance check tool"
            }
          ],
          "connects_with": [
            "PAY",
            "NOTIF"
          ]
        },
        {
          "page_id": 27,
          "name": "Live Chat / Support Page",
          "purpose": "Customer service entry point.",
          "features": [
            {
              "id": "27.1",
              "name": "Chatbot first-line responses"
            },
            {
              "id": "27.2",
              "name": "Escalation to human agent"
            },
            {
              "id": "27.3",
              "name": "Order-linked ticket creation"
            },
            {
              "id": "27.4",
              "name": "Chat history"
            }
          ],
          "connects_with": [
            "SUPPORT",
            "NOTIF"
          ]
        },
        {
          "page_id": 28,
          "name": "FAQ / Help Center Page",
          "purpose": "Self-service knowledge base.",
          "features": [
            {
              "id": "28.1",
              "name": "Searchable knowledge-base articles"
            },
            {
              "id": "28.2",
              "name": "Category-organized topics"
            }
          ],
          "connects_with": [
            "SEARCH"
          ]
        },
        {
          "page_id": 29,
          "name": "About Us Page",
          "purpose": "Brand storytelling and company information.",
          "features": [
            {
              "id": "29.1",
              "name": "Brand story & mission content block"
            },
            {
              "id": "29.2",
              "name": "Team/press highlights"
            }
          ],
          "connects_with": [
            "CDN"
          ]
        },
        {
          "page_id": 30,
          "name": "Contact Us Page",
          "purpose": "Direct contact channels for customers.",
          "features": [
            {
              "id": "30.1",
              "name": "Contact form"
            },
            {
              "id": "30.2",
              "name": "Store locations & hours"
            },
            {
              "id": "30.3",
              "name": "Embedded map"
            }
          ],
          "connects_with": [
            "MAP",
            "SUPPORT"
          ]
        },
        {
          "page_id": 31,
          "name": "Terms & Conditions Page",
          "purpose": "Legal terms of use.",
          "features": [
            {
              "id": "31.1",
              "name": "Versioned static legal content"
            }
          ],
          "connects_with": []
        },
        {
          "page_id": 32,
          "name": "Privacy Policy Page",
          "purpose": "Data-privacy disclosures.",
          "features": [
            {
              "id": "32.1",
              "name": "Versioned static legal content"
            },
            {
              "id": "32.2",
              "name": "Cookie-consent banner integration"
            }
          ],
          "connects_with": []
        },
        {
          "page_id": 33,
          "name": "Shipping & Delivery Policy Page",
          "purpose": "Explains delivery zones, timelines and costs.",
          "features": [
            {
              "id": "33.1",
              "name": "Delivery-zone & timeline tables"
            },
            {
              "id": "33.2",
              "name": "Carrier vs. own-fleet explanation"
            }
          ],
          "connects_with": []
        },
        {
          "page_id": 34,
          "name": "Return & Refund Policy Page",
          "purpose": "Explains the returns process and eligibility.",
          "features": [
            {
              "id": "34.1",
              "name": "Static policy content"
            },
            {
              "id": "34.2",
              "name": "Link to self-service return page"
            }
          ],
          "connects_with": []
        },
        {
          "page_id": 35,
          "name": "Blog / Content Hub Page",
          "purpose": "Content marketing landing page.",
          "features": [
            {
              "id": "35.1",
              "name": "Article grid with category filter"
            },
            {
              "id": "35.2",
              "name": "Featured/pinned posts"
            }
          ],
          "connects_with": [
            "SEARCH",
            "ANALYTICS"
          ]
        },
        {
          "page_id": 36,
          "name": "Blog Article Detail Page",
          "purpose": "Single article/content page.",
          "features": [
            {
              "id": "36.1",
              "name": "Rich content rendering (images/video)"
            },
            {
              "id": "36.2",
              "name": "Related-product embeds"
            },
            {
              "id": "36.3",
              "name": "Social share buttons"
            }
          ],
          "connects_with": [
            "CRM"
          ]
        },
        {
          "page_id": 37,
          "name": "Store Locator / Pickup Points Page",
          "purpose": "Physical store or pickup-locker finder.",
          "features": [
            {
              "id": "37.1",
              "name": "Map of stores/pickup points"
            },
            {
              "id": "37.2",
              "name": "Distance-based sorting"
            },
            {
              "id": "37.3",
              "name": "Store hours & contact info"
            }
          ],
          "connects_with": [
            "MAP"
          ]
        },
        {
          "page_id": 38,
          "name": "Deals & Flash Sales Page",
          "purpose": "Time-boxed promotional listing.",
          "features": [
            {
              "id": "38.1",
              "name": "Countdown timers per deal"
            },
            {
              "id": "38.2",
              "name": "Limited-stock progress indicator"
            },
            {
              "id": "38.3",
              "name": "Auto-expiry of ended deals"
            }
          ],
          "connects_with": [
            "SEARCH"
          ]
        },
        {
          "page_id": 39,
          "name": "Brand Page",
          "purpose": "All products from a single brand.",
          "features": [
            {
              "id": "39.1",
              "name": "Brand banner & description"
            },
            {
              "id": "39.2",
              "name": "Brand-filtered product grid"
            }
          ],
          "connects_with": [
            "SEARCH"
          ]
        },
        {
          "page_id": 40,
          "name": "Newsletter Subscription (component)",
          "purpose": "Email capture used across the site.",
          "features": [
            {
              "id": "40.1",
              "name": "Email capture form"
            },
            {
              "id": "40.2",
              "name": "Double opt-in confirmation"
            },
            {
              "id": "40.3",
              "name": "First-order discount trigger"
            }
          ],
          "connects_with": [
            "CRM",
            "NOTIF"
          ]
        },
        {
          "page_id": 41,
          "name": "404 / Error Page",
          "purpose": "Fallback page for broken or missing links.",
          "features": [
            {
              "id": "41.1",
              "name": "Friendly error message"
            },
            {
              "id": "41.2",
              "name": "Search bar"
            },
            {
              "id": "41.3",
              "name": "Popular-links suggestions"
            }
          ],
          "connects_with": [
            "SEARCH"
          ]
        },
        {
          "page_id": 42,
          "name": "Language & Currency Switcher (component)",
          "purpose": "Global locale control shown in header/footer.",
          "features": [
            {
              "id": "42.1",
              "name": "Auto-detect locale by IP/browser"
            },
            {
              "id": "42.2",
              "name": "Manual language & currency override"
            },
            {
              "id": "42.3",
              "name": "RTL layout support (Arabic)"
            }
          ],
          "connects_with": []
        },
        {
          "page_id": 43,
          "name": "Push Notification Preferences (mobile)",
          "purpose": "Mobile-only opt-in and preference screen.",
          "features": [
            {
              "id": "43.1",
              "name": "Permission opt-in prompt"
            },
            {
              "id": "43.2",
              "name": "Category toggles (orders, promotions, price alerts)"
            }
          ],
          "connects_with": [
            "NOTIF"
          ]
        }
      ]
    },
    {
      "app_id": 2,
      "name": "Admin Dashboard (Back Office)",
      "platforms": [
        "Responsive Web (desktop-first)"
      ],
      "description": "Internal control center for staff to manage catalog, orders, delivery, marketing and settings.",
      "page_count": 35,
      "pages": [
        {
          "page_id": 44,
          "name": "Admin Login (2FA)",
          "purpose": "Secure entry point for staff.",
          "features": [
            {
              "id": "44.1",
              "name": "Email/password + TOTP or SMS 2FA"
            },
            {
              "id": "44.2",
              "name": "Optional IP allow-list"
            },
            {
              "id": "44.3",
              "name": "Auto session timeout"
            }
          ],
          "connects_with": [
            "AUTH",
            "NOTIF"
          ]
        },
        {
          "page_id": 45,
          "name": "Main Dashboard / Analytics Overview",
          "purpose": "Landing screen after admin login.",
          "features": [
            {
              "id": "45.1",
              "name": "Real-time sales KPI widgets"
            },
            {
              "id": "45.2",
              "name": "Order & traffic charts"
            },
            {
              "id": "45.3",
              "name": "Top-selling products widget"
            },
            {
              "id": "45.4",
              "name": "Low-stock alert widget"
            }
          ],
          "connects_with": [
            "ANALYTICS",
            "WMS",
            "OMS"
          ]
        },
        {
          "page_id": 46,
          "name": "Product List Page",
          "purpose": "Manage the full product catalog.",
          "features": [
            {
              "id": "46.1",
              "name": "Search/filter/sort catalog"
            },
            {
              "id": "46.2",
              "name": "Bulk actions (publish, archive, price update)"
            },
            {
              "id": "46.3",
              "name": "Status badges (active/draft/out-of-stock)"
            }
          ],
          "connects_with": [
            "SEARCH",
            "WMS"
          ]
        },
        {
          "page_id": 47,
          "name": "Add / Edit Product Page",
          "purpose": "Create or update a product record.",
          "features": [
            {
              "id": "47.1",
              "name": "Multi-image upload"
            },
            {
              "id": "47.2",
              "name": "Variant & attribute builder"
            },
            {
              "id": "47.3",
              "name": "SEO fields (title, meta, slug)"
            },
            {
              "id": "47.4",
              "name": "Pricing & tax-class assignment"
            },
            {
              "id": "47.5",
              "name": "Per-warehouse opening stock input"
            }
          ],
          "connects_with": [
            "CDN",
            "SEARCH",
            "WMS",
            "TAX"
          ]
        },
        {
          "page_id": 48,
          "name": "Category & Attribute Management Page",
          "purpose": "Maintain the catalog taxonomy.",
          "features": [
            {
              "id": "48.1",
              "name": "Drag-and-drop category tree"
            },
            {
              "id": "48.2",
              "name": "Attribute & option-set builder"
            },
            {
              "id": "48.3",
              "name": "Per-category SEO metadata"
            }
          ],
          "connects_with": [
            "SEARCH"
          ]
        },
        {
          "page_id": 49,
          "name": "Bulk Import / Export Page",
          "purpose": "Mass catalog and inventory operations.",
          "features": [
            {
              "id": "49.1",
              "name": "CSV/Excel upload with template"
            },
            {
              "id": "49.2",
              "name": "Validation & error report"
            },
            {
              "id": "49.3",
              "name": "Filtered catalog export"
            }
          ],
          "connects_with": [
            "WMS"
          ]
        },
        {
          "page_id": 50,
          "name": "Inventory Management Page",
          "purpose": "Track and adjust stock levels.",
          "features": [
            {
              "id": "50.1",
              "name": "Real-time stock levels per SKU"
            },
            {
              "id": "50.2",
              "name": "Low-stock threshold alerts"
            },
            {
              "id": "50.3",
              "name": "Manual stock-adjustment log"
            },
            {
              "id": "50.4",
              "name": "Barcode/SKU lookup"
            }
          ],
          "connects_with": [
            "WMS",
            "NOTIF"
          ]
        },
        {
          "page_id": 51,
          "name": "Multi-Warehouse Management Page",
          "purpose": "Configure and monitor all fulfillment locations.",
          "features": [
            {
              "id": "51.1",
              "name": "Add/edit warehouse locations"
            },
            {
              "id": "51.2",
              "name": "Zone mapping per warehouse"
            },
            {
              "id": "51.3",
              "name": "Stock-transfer between warehouses"
            },
            {
              "id": "51.4",
              "name": "Nearest-warehouse order-routing rules"
            }
          ],
          "connects_with": [
            "WMS",
            "MAP",
            "SHIP"
          ]
        },
        {
          "page_id": 52,
          "name": "Order List Page",
          "purpose": "Central view of all incoming orders.",
          "features": [
            {
              "id": "52.1",
              "name": "Filter by status/channel/date"
            },
            {
              "id": "52.2",
              "name": "Bulk status update"
            },
            {
              "id": "52.3",
              "name": "Export orders to CSV"
            }
          ],
          "connects_with": [
            "OMS"
          ]
        },
        {
          "page_id": 53,
          "name": "Order Detail Page (Admin)",
          "purpose": "Manage a single order end-to-end.",
          "features": [
            {
              "id": "53.1",
              "name": "Full order timeline"
            },
            {
              "id": "53.2",
              "name": "Edit items/address pre-fulfillment"
            },
            {
              "id": "53.3",
              "name": "Manual refund/void"
            },
            {
              "id": "53.4",
              "name": "Assign to own driver or 3rd-party carrier"
            },
            {
              "id": "53.5",
              "name": "Print invoice & shipping label"
            }
          ],
          "connects_with": [
            "OMS",
            "PAY",
            "SHIP",
            "DISPATCH"
          ]
        },
        {
          "page_id": 54,
          "name": "Returns & Refunds (RMA) Management Page",
          "purpose": "Process customer return requests.",
          "features": [
            {
              "id": "54.1",
              "name": "Approve/reject return requests"
            },
            {
              "id": "54.2",
              "name": "Select refund method"
            },
            {
              "id": "54.3",
              "name": "Restock-on-return toggle"
            },
            {
              "id": "54.4",
              "name": "Return-reason analytics"
            }
          ],
          "connects_with": [
            "OMS",
            "PAY",
            "WMS"
          ]
        },
        {
          "page_id": 55,
          "name": "Customer List Page",
          "purpose": "Manage the customer database.",
          "features": [
            {
              "id": "55.1",
              "name": "Search/filter customers"
            },
            {
              "id": "55.2",
              "name": "Segment tagging"
            },
            {
              "id": "55.3",
              "name": "Export customer list"
            },
            {
              "id": "55.4",
              "name": "Lifetime-value column"
            }
          ],
          "connects_with": [
            "CRM"
          ]
        },
        {
          "page_id": 56,
          "name": "Customer Detail Page",
          "purpose": "360° view of one customer.",
          "features": [
            {
              "id": "56.1",
              "name": "Order history"
            },
            {
              "id": "56.2",
              "name": "Linked support tickets"
            },
            {
              "id": "56.3",
              "name": "Loyalty status"
            },
            {
              "id": "56.4",
              "name": "Manual note/flag"
            },
            {
              "id": "56.5",
              "name": "GDPR-style data export/delete action"
            }
          ],
          "connects_with": [
            "CRM",
            "LOYALTY",
            "SUPPORT"
          ]
        },
        {
          "page_id": 57,
          "name": "Delivery & Shipping Settings Page",
          "purpose": "Configure how orders get delivered.",
          "features": [
            {
              "id": "57.1",
              "name": "Define delivery zones & rates"
            },
            {
              "id": "57.2",
              "name": "Carrier account credentials (local courier + international)"
            },
            {
              "id": "57.3",
              "name": "Free-shipping thresholds"
            },
            {
              "id": "57.4",
              "name": "Delivery-time SLA configuration"
            }
          ],
          "connects_with": [
            "SHIP",
            "MAP"
          ]
        },
        {
          "page_id": 58,
          "name": "Driver Management Page",
          "purpose": "Manage the in-house delivery fleet.",
          "features": [
            {
              "id": "58.1",
              "name": "Onboard & verify drivers (ID, license, vehicle docs)"
            },
            {
              "id": "58.2",
              "name": "Assign delivery zones"
            },
            {
              "id": "58.3",
              "name": "Performance metrics (on-time %, rating)"
            },
            {
              "id": "58.4",
              "name": "Suspend/activate driver accounts"
            }
          ],
          "connects_with": [
            "DISPATCH",
            "NOTIF"
          ]
        },
        {
          "page_id": 59,
          "name": "Live Dispatch / Delivery Map Page",
          "purpose": "Real-time operational control room.",
          "features": [
            {
              "id": "59.1",
              "name": "Live map of all active drivers"
            },
            {
              "id": "59.2",
              "name": "Manual or automatic order-to-driver assignment"
            },
            {
              "id": "59.3",
              "name": "Route re-optimization"
            },
            {
              "id": "59.4",
              "name": "Exception alerts (delayed/failed delivery)"
            }
          ],
          "connects_with": [
            "MAP",
            "DISPATCH",
            "NOTIF"
          ]
        },
        {
          "page_id": 60,
          "name": "Discounts, Coupons & Promotions Page",
          "purpose": "Create and manage sales incentives.",
          "features": [
            {
              "id": "60.1",
              "name": "Percentage / fixed / BOGO rule builder"
            },
            {
              "id": "60.2",
              "name": "Usage limits & scheduling"
            },
            {
              "id": "60.3",
              "name": "Coupon-code generator"
            },
            {
              "id": "60.4",
              "name": "Promotion performance report"
            }
          ],
          "connects_with": [
            "OMS",
            "ANALYTICS"
          ]
        },
        {
          "page_id": 61,
          "name": "Reviews & Ratings Moderation Page",
          "purpose": "Curate customer-generated reviews.",
          "features": [
            {
              "id": "61.1",
              "name": "Approve/reject/reply to reviews"
            },
            {
              "id": "61.2",
              "name": "Spam/abuse flag detection"
            },
            {
              "id": "61.3",
              "name": "Rating-distribution chart"
            }
          ],
          "connects_with": [
            "REVIEWS"
          ]
        },
        {
          "page_id": 62,
          "name": "CMS – Homepage & Banner Management Page",
          "purpose": "Control storefront merchandising content.",
          "features": [
            {
              "id": "62.1",
              "name": "Drag-drop banner scheduler"
            },
            {
              "id": "62.2",
              "name": "Homepage section ordering"
            },
            {
              "id": "62.3",
              "name": "A/B banner testing"
            }
          ],
          "connects_with": [
            "CDN",
            "ANALYTICS"
          ]
        },
        {
          "page_id": 63,
          "name": "CMS – Static Pages & Blog Management Page",
          "purpose": "Manage content pages and blog posts.",
          "features": [
            {
              "id": "63.1",
              "name": "Rich-text/block content editor"
            },
            {
              "id": "63.2",
              "name": "Per-page SEO metadata"
            },
            {
              "id": "63.3",
              "name": "Publish scheduling"
            }
          ],
          "connects_with": [
            "SEARCH",
            "CDN"
          ]
        },
        {
          "page_id": 64,
          "name": "Marketing Campaign Manager Page",
          "purpose": "Build multi-channel marketing campaigns.",
          "features": [
            {
              "id": "64.1",
              "name": "Email/SMS/push campaign builder"
            },
            {
              "id": "64.2",
              "name": "Audience segmentation"
            },
            {
              "id": "64.3",
              "name": "A/B subject-line testing"
            },
            {
              "id": "64.4",
              "name": "Campaign performance dashboard"
            }
          ],
          "connects_with": [
            "CRM",
            "NOTIF",
            "ANALYTICS"
          ]
        },
        {
          "page_id": 65,
          "name": "Abandoned Cart Recovery Page",
          "purpose": "Automate recovery of incomplete checkouts.",
          "features": [
            {
              "id": "65.1",
              "name": "Configurable recovery email/SMS sequence & delay"
            },
            {
              "id": "65.2",
              "name": "Discount-incentive rules"
            },
            {
              "id": "65.3",
              "name": "Recovery-rate report"
            }
          ],
          "connects_with": [
            "CRM",
            "NOTIF",
            "ANALYTICS"
          ]
        },
        {
          "page_id": 66,
          "name": "Loyalty Program Management Page",
          "purpose": "Configure the customer rewards engine.",
          "features": [
            {
              "id": "66.1",
              "name": "Earn/burn rule configuration"
            },
            {
              "id": "66.2",
              "name": "Tier definitions"
            },
            {
              "id": "66.3",
              "name": "Manual point adjustment"
            },
            {
              "id": "66.4",
              "name": "Referral-program settings"
            }
          ],
          "connects_with": [
            "LOYALTY"
          ]
        },
        {
          "page_id": 67,
          "name": "Gift Card Management Page",
          "purpose": "Administer digital gift cards.",
          "features": [
            {
              "id": "67.1",
              "name": "Issue/void gift cards"
            },
            {
              "id": "67.2",
              "name": "Balance ledger"
            },
            {
              "id": "67.3",
              "name": "Bulk-generate codes for campaigns"
            }
          ],
          "connects_with": [
            "PAY"
          ]
        },
        {
          "page_id": 68,
          "name": "Reports & Analytics Page",
          "purpose": "Deep business intelligence reporting.",
          "features": [
            {
              "id": "68.1",
              "name": "Sales/revenue reports"
            },
            {
              "id": "68.2",
              "name": "Conversion-funnel analysis"
            },
            {
              "id": "68.3",
              "name": "Cohort/retention analysis"
            },
            {
              "id": "68.4",
              "name": "Exportable CSV/PDF reports"
            },
            {
              "id": "68.5",
              "name": "Custom date-range comparison"
            }
          ],
          "connects_with": [
            "ANALYTICS",
            "OMS"
          ]
        },
        {
          "page_id": 69,
          "name": "Tax Configuration Page",
          "purpose": "Set up tax rules by product and region.",
          "features": [
            {
              "id": "69.1",
              "name": "Tax classes per region/product"
            },
            {
              "id": "69.2",
              "name": "VAT/e-invoice settings for local regulations"
            },
            {
              "id": "69.3",
              "name": "Tax-exempt customer flag"
            }
          ],
          "connects_with": [
            "TAX"
          ]
        },
        {
          "page_id": 70,
          "name": "Payments & Transactions Page",
          "purpose": "Financial reconciliation for all payments.",
          "features": [
            {
              "id": "70.1",
              "name": "Transaction log"
            },
            {
              "id": "70.2",
              "name": "Settlement/payout tracking"
            },
            {
              "id": "70.3",
              "name": "Manual capture/void/refund"
            },
            {
              "id": "70.4",
              "name": "Gateway-fee reconciliation"
            }
          ],
          "connects_with": [
            "PAY",
            "FRAUD",
            "ERP"
          ]
        },
        {
          "page_id": 71,
          "name": "Staff, Roles & Permissions Page",
          "purpose": "Manage internal team access.",
          "features": [
            {
              "id": "71.1",
              "name": "Create staff accounts"
            },
            {
              "id": "71.2",
              "name": "Role-based access control (RBAC) matrix"
            },
            {
              "id": "71.3",
              "name": "Per-module access restriction"
            }
          ],
          "connects_with": [
            "AUTH"
          ]
        },
        {
          "page_id": 72,
          "name": "Support Ticketing / Helpdesk Page",
          "purpose": "Handle customer service tickets.",
          "features": [
            {
              "id": "72.1",
              "name": "Ticket queue & SLA timers"
            },
            {
              "id": "72.2",
              "name": "Canned responses"
            },
            {
              "id": "72.3",
              "name": "Ticket-to-order linking"
            },
            {
              "id": "72.4",
              "name": "CSAT survey trigger"
            }
          ],
          "connects_with": [
            "SUPPORT",
            "NOTIF"
          ]
        },
        {
          "page_id": 73,
          "name": "Notifications & Alerts Settings Page",
          "purpose": "Configure operational alerting.",
          "features": [
            {
              "id": "73.1",
              "name": "Low-stock alert routing"
            },
            {
              "id": "73.2",
              "name": "Fraud-flag alert routing"
            },
            {
              "id": "73.3",
              "name": "Order-exception alert routing"
            },
            {
              "id": "73.4",
              "name": "Channel selection per alert type"
            }
          ],
          "connects_with": [
            "NOTIF"
          ]
        },
        {
          "page_id": 74,
          "name": "Fraud Monitoring Dashboard",
          "purpose": "Detect and act on risky orders.",
          "features": [
            {
              "id": "74.1",
              "name": "Risk-scored order list"
            },
            {
              "id": "74.2",
              "name": "Manual approve/block action"
            },
            {
              "id": "74.3",
              "name": "Rule configuration (velocity, AVS/CVV mismatch)"
            }
          ],
          "connects_with": [
            "FRAUD",
            "PAY"
          ]
        },
        {
          "page_id": 75,
          "name": "Audit Log / Activity Log Page",
          "purpose": "Compliance-grade record of admin actions.",
          "features": [
            {
              "id": "75.1",
              "name": "Searchable action log"
            },
            {
              "id": "75.2",
              "name": "Filter by user/module/date"
            },
            {
              "id": "75.3",
              "name": "Export for compliance audits"
            }
          ],
          "connects_with": []
        },
        {
          "page_id": 76,
          "name": "Integrations & API Key Management Page",
          "purpose": "Central control of all third-party connections.",
          "features": [
            {
              "id": "76.1",
              "name": "Connect/disconnect third-party services"
            },
            {
              "id": "76.2",
              "name": "Webhook configuration"
            },
            {
              "id": "76.3",
              "name": "API-key rotation"
            },
            {
              "id": "76.4",
              "name": "Connection health status"
            }
          ],
          "connects_with": [
            "PAY",
            "SHIP",
            "MAP",
            "SEARCH",
            "NOTIF",
            "CRM",
            "ERP",
            "TAX",
            "FRAUD"
          ]
        },
        {
          "page_id": 77,
          "name": "General Store Settings Page",
          "purpose": "Global storefront configuration.",
          "features": [
            {
              "id": "77.1",
              "name": "Branding (logo, theme colors)"
            },
            {
              "id": "77.2",
              "name": "Supported languages & currencies"
            },
            {
              "id": "77.3",
              "name": "SEO defaults"
            },
            {
              "id": "77.4",
              "name": "Cookie-consent configuration"
            }
          ],
          "connects_with": [
            "CDN"
          ]
        },
        {
          "page_id": 78,
          "name": "Invoicing & Billing Management Page",
          "purpose": "Manage financial documents.",
          "features": [
            {
              "id": "78.1",
              "name": "Auto-generate customer invoices"
            },
            {
              "id": "78.2",
              "name": "Compliant e-invoice numbering"
            },
            {
              "id": "78.3",
              "name": "Bulk invoice export"
            },
            {
              "id": "78.4",
              "name": "Sync to accounting/ERP system"
            }
          ],
          "connects_with": [
            "TAX",
            "ERP"
          ]
        }
      ]
    },
    {
      "app_id": 3,
      "name": "Delivery Driver Mobile App",
      "platforms": [
        "iOS",
        "Android"
      ],
      "description": "App for the company's own delivery fleet to receive, navigate and complete local deliveries.",
      "page_count": 11,
      "pages": [
        {
          "page_id": 79,
          "name": "Driver Onboarding / Registration",
          "purpose": "Sign-up and verification flow for new drivers.",
          "features": [
            {
              "id": "79.1",
              "name": "ID/driving-license upload"
            },
            {
              "id": "79.2",
              "name": "Vehicle information form"
            },
            {
              "id": "79.3",
              "name": "Background-check status tracker"
            },
            {
              "id": "79.4",
              "name": "Bank account setup for payouts"
            }
          ],
          "connects_with": [
            "NOTIF",
            "PAY"
          ]
        },
        {
          "page_id": 80,
          "name": "Driver Login",
          "purpose": "Authentication for the driver app.",
          "features": [
            {
              "id": "80.1",
              "name": "Phone number + OTP login"
            },
            {
              "id": "80.2",
              "name": "Biometric unlock"
            }
          ],
          "connects_with": [
            "AUTH",
            "NOTIF"
          ]
        },
        {
          "page_id": 81,
          "name": "Driver Home / Available Deliveries",
          "purpose": "Main screen showing work opportunities.",
          "features": [
            {
              "id": "81.1",
              "name": "List/map of nearby available orders"
            },
            {
              "id": "81.2",
              "name": "Accept/reject with countdown timer"
            },
            {
              "id": "81.3",
              "name": "Online/offline availability toggle"
            }
          ],
          "connects_with": [
            "DISPATCH",
            "MAP"
          ]
        },
        {
          "page_id": 82,
          "name": "Active Delivery Navigation Page",
          "purpose": "In-progress delivery execution screen.",
          "features": [
            {
              "id": "82.1",
              "name": "Turn-by-turn navigation"
            },
            {
              "id": "82.2",
              "name": "Optimized multi-stop route order"
            },
            {
              "id": "82.3",
              "name": "In-app masked calling to customer"
            },
            {
              "id": "82.4",
              "name": "Offline-mode caching for low connectivity"
            }
          ],
          "connects_with": [
            "MAP",
            "DISPATCH"
          ]
        },
        {
          "page_id": 83,
          "name": "Order / Task Detail Page",
          "purpose": "Details of the delivery currently assigned.",
          "features": [
            {
              "id": "83.1",
              "name": "Customer info & delivery instructions"
            },
            {
              "id": "83.2",
              "name": "Cash-on-delivery amount due"
            },
            {
              "id": "83.3",
              "name": "Package contents/size"
            },
            {
              "id": "83.4",
              "name": "Order-item checklist"
            }
          ],
          "connects_with": [
            "OMS",
            "PAY"
          ]
        },
        {
          "page_id": 84,
          "name": "Proof of Delivery Page",
          "purpose": "Confirm successful (or failed) delivery.",
          "features": [
            {
              "id": "84.1",
              "name": "Photo capture"
            },
            {
              "id": "84.2",
              "name": "E-signature capture"
            },
            {
              "id": "84.3",
              "name": "Customer OTP confirmation"
            },
            {
              "id": "84.4",
              "name": "Failed-delivery reason selector"
            }
          ],
          "connects_with": [
            "OMS",
            "NOTIF"
          ]
        },
        {
          "page_id": 85,
          "name": "Earnings & Payout History Page",
          "purpose": "Financial summary for the driver.",
          "features": [
            {
              "id": "85.1",
              "name": "Per-delivery earnings breakdown"
            },
            {
              "id": "85.2",
              "name": "Daily/weekly summary"
            },
            {
              "id": "85.3",
              "name": "Payout schedule & method"
            },
            {
              "id": "85.4",
              "name": "Tips display"
            }
          ],
          "connects_with": [
            "PAY"
          ]
        },
        {
          "page_id": 86,
          "name": "Delivery History Page",
          "purpose": "Record of completed work.",
          "features": [
            {
              "id": "86.1",
              "name": "Completed/cancelled delivery list"
            },
            {
              "id": "86.2",
              "name": "Customer rating received"
            },
            {
              "id": "86.3",
              "name": "Filter by date range"
            }
          ],
          "connects_with": [
            "OMS"
          ]
        },
        {
          "page_id": 87,
          "name": "Driver Profile & Vehicle Settings Page",
          "purpose": "Manage personal and vehicle information.",
          "features": [
            {
              "id": "87.1",
              "name": "Edit personal/vehicle info"
            },
            {
              "id": "87.2",
              "name": "Document renewal upload"
            },
            {
              "id": "87.3",
              "name": "Availability schedule"
            }
          ],
          "connects_with": [
            "NOTIF"
          ]
        },
        {
          "page_id": 88,
          "name": "In-App Chat / Support Page",
          "purpose": "Communication channel for drivers.",
          "features": [
            {
              "id": "88.1",
              "name": "Chat with dispatcher/support"
            },
            {
              "id": "88.2",
              "name": "Driver FAQ"
            },
            {
              "id": "88.3",
              "name": "Emergency/SOS button"
            }
          ],
          "connects_with": [
            "SUPPORT",
            "NOTIF"
          ]
        },
        {
          "page_id": 89,
          "name": "Driver Notifications Page",
          "purpose": "Inbox for driver-relevant alerts.",
          "features": [
            {
              "id": "89.1",
              "name": "New-assignment alerts"
            },
            {
              "id": "89.2",
              "name": "Payout alerts"
            },
            {
              "id": "89.3",
              "name": "Policy/update announcements"
            }
          ],
          "connects_with": [
            "NOTIF"
          ]
        }
      ]
    }
  ],
  "integrations_catalog": [
    {
      "key": "PAY",
      "category": "Payment Gateways",
      "recommended_providers": [
        "Stripe (global cards/wallets)",
        "PayPal (global express checkout)",
        "Paymob (Egypt/MENA: cards, mobile wallets, BNPL, QR)",
        "Apple Pay / Google Pay",
        "Cash on Delivery (COD) handled via OMS + driver app"
      ],
      "purpose": "Process all customer payments, refunds and payouts; must support both card-based and cash-on-delivery flows for the Egyptian/MENA market."
    },
    {
      "key": "SHIP",
      "category": "Shipping Carrier Integration",
      "recommended_providers": [
        "EasyPost or Shippo (multi-carrier aggregator: rates, labels, tracking)",
        "Bosta (Egypt local courier, COD collection)",
        "Aramex (MENA/global)",
        "Mylerz, Turbo, J&T Express, Egypt Post (regional options)",
        "DHL / FedEx / UPS (international shipments)"
      ],
      "purpose": "Generate shipping rates/labels and sync tracking for orders fulfilled by third-party carriers."
    },
    {
      "key": "DISPATCH",
      "category": "Local Delivery Dispatch & Routing Engine",
      "recommended_providers": [
        "Custom microservice (order-to-driver assignment, route optimization)",
        "Reference patterns from Onfleet / Track-POD / TrackoMile-style platforms"
      ],
      "purpose": "Assign orders to in-house drivers, optimize multi-stop routes, and track delivery progress in real time."
    },
    {
      "key": "MAP",
      "category": "Maps & Geolocation",
      "recommended_providers": [
        "Google Maps Platform",
        "Mapbox"
      ],
      "purpose": "Address autocomplete/validation, geocoding, turn-by-turn navigation and live location tracking."
    },
    {
      "key": "SEARCH",
      "category": "Search & Recommendation Engine",
      "recommended_providers": [
        "Algolia",
        "Elasticsearch/OpenSearch (self-hosted alternative)"
      ],
      "purpose": "Instant, typo-tolerant product search, facets, and AI-driven personalized/related-product recommendations."
    },
    {
      "key": "NOTIF",
      "category": "Notifications (SMS / Email / Push / WhatsApp)",
      "recommended_providers": [
        "Twilio (SMS & OTP)",
        "SendGrid or Amazon SES (email)",
        "Firebase Cloud Messaging or OneSignal (push)",
        "WhatsApp Business API (order updates)"
      ],
      "purpose": "Deliver transactional and marketing messages across every channel customers, staff and drivers use."
    },
    {
      "key": "AUTH",
      "category": "Authentication & Identity",
      "recommended_providers": [
        "OAuth: Google, Apple, Facebook sign-in",
        "Internal JWT-based Auth microservice",
        "Optional managed service: Auth0 or Clerk"
      ],
      "purpose": "Secure login/session management for customers, admin staff and drivers, including 2FA for admin."
    },
    {
      "key": "CDN",
      "category": "CDN & Media Storage",
      "recommended_providers": [
        "AWS S3 or Cloudflare R2 (object storage)",
        "Cloudflare or AWS CloudFront (CDN)"
      ],
      "purpose": "Store and fast-deliver product images, banners and static assets globally."
    },
    {
      "key": "ANALYTICS",
      "category": "Analytics & Tracking",
      "recommended_providers": [
        "Google Analytics 4",
        "Mixpanel or Amplitude",
        "Meta Pixel",
        "Hotjar"
      ],
      "purpose": "Track traffic, funnels, product performance and marketing attribution."
    },
    {
      "key": "CRM",
      "category": "Marketing Automation / CRM",
      "recommended_providers": [
        "Klaviyo or Omnisend (email/SMS flows)",
        "HubSpot or Salesforce (enterprise CRM)"
      ],
      "purpose": "Automate lifecycle marketing (welcome, abandoned cart, win-back) and manage customer relationships."
    },
    {
      "key": "REVIEWS",
      "category": "Reviews & Ratings",
      "recommended_providers": [
        "Yotpo or Trustpilot",
        "In-house review microservice"
      ],
      "purpose": "Collect, moderate and display verified product reviews."
    },
    {
      "key": "LOYALTY",
      "category": "Loyalty & Rewards",
      "recommended_providers": [
        "Smile.io",
        "Custom points/tier microservice"
      ],
      "purpose": "Run points, tiers and referral programs to increase repeat purchase rate."
    },
    {
      "key": "SUPPORT",
      "category": "Customer Support / Helpdesk",
      "recommended_providers": [
        "Zendesk or Intercom",
        "In-house ticketing module"
      ],
      "purpose": "Manage support tickets and live chat for customers and drivers."
    },
    {
      "key": "TAX",
      "category": "Tax Calculation",
      "recommended_providers": [
        "Avalara or TaxJar",
        "Custom VAT/e-invoice engine for local regulations"
      ],
      "purpose": "Calculate correct tax per region/product and produce compliant invoices."
    },
    {
      "key": "FRAUD",
      "category": "Fraud Detection",
      "recommended_providers": [
        "Stripe Radar",
        "Signifyd",
        "Custom rules engine (velocity, AVS/CVV, device fingerprint)"
      ],
      "purpose": "Flag and block high-risk orders before fulfillment."
    },
    {
      "key": "ERP",
      "category": "ERP / Accounting Sync",
      "recommended_providers": [
        "Odoo",
        "QuickBooks",
        "SAP (large enterprise)"
      ],
      "purpose": "Keep finance, inventory valuation and accounting records synchronized with store activity."
    },
    {
      "key": "WMS",
      "category": "Warehouse & Inventory Management (internal microservice)",
      "recommended_providers": [
        "Internal service; optionally reference Zoho Inventory / Unicommerce patterns"
      ],
      "purpose": "Track stock per SKU per warehouse, low-stock alerts, and order-to-warehouse routing."
    },
    {
      "key": "OMS",
      "category": "Order Management Service (internal microservice)",
      "recommended_providers": [
        "Internal service handling order lifecycle, RMA, invoicing"
      ],
      "purpose": "Single source of truth for order status from placement through delivery and returns."
    }
  ],
  "database_core_entities": [
    "User",
    "Customer",
    "Address",
    "Product",
    "ProductVariant",
    "Category",
    "Attribute",
    "Inventory",
    "Warehouse",
    "Order",
    "OrderItem",
    "Payment",
    "Transaction",
    "Cart",
    "CartItem",
    "Coupon/Promotion",
    "Review",
    "Wishlist",
    "ShippingMethod",
    "Shipment",
    "Driver",
    "DeliveryTask",
    "Return/RMA",
    "LoyaltyAccount",
    "LoyaltyTransaction",
    "SupportTicket",
    "NotificationLog",
    "AuditLog",
    "Role",
    "Permission",
    "GiftCard",
    "Brand",
    "SEOMetadata"
  ],
  "non_functional_requirements": {
    "performance_scalability": "Independently auto-scale each microservice; cache hot catalog/search data; must survive flash-sale/Black-Friday-level traffic spikes without full-system slowdown.",
    "availability": "Target 99.9%+ uptime with multi-AZ deployment and automated failover.",
    "security": "PCI DSS-aligned payment handling, TLS 1.2+ everywhere, encryption at rest, RBAC for all admin actions, rate limiting and a WAF in front of public endpoints.",
    "compliance": "GDPR/CCPA-style data export & deletion rights, cookie consent management, and local e-invoicing/VAT rules for the operating region.",
    "localization": "Multi-language (Arabic RTL + English at minimum) and multi-currency (EGP + others) support throughout customer and admin UIs.",
    "accessibility": "WCAG 2.1 AA target for the customer-facing storefront.",
    "offline_resilience": "Driver app must remain functional (queue actions, cache maps/routes) during intermittent connectivity, syncing once back online.",
    "auditability": "Every admin and driver action affecting money, stock or orders must be recorded in the Audit Log."
  },
  "development_roadmap": [
    {
      "phase": 1,
      "name": "MVP Core Commerce",
      "scope": "Auth, catalog, cart, checkout, payment (Stripe + Paymob + COD), basic admin (products/orders/customers), order confirmation & basic tracking."
    },
    {
      "phase": 2,
      "name": "Fulfillment & Delivery",
      "scope": "Warehouse/inventory service, multi-warehouse routing, shipping-carrier integration (Bosta/Aramex/EasyPost), driver app, live dispatch map, real-time tracking, proof of delivery."
    },
    {
      "phase": 3,
      "name": "Growth & Marketing",
      "scope": "Search/personalization (Algolia), marketing automation & abandoned-cart recovery, loyalty program, reviews, CMS/blog, gift cards."
    },
    {
      "phase": 4,
      "name": "Enterprise Hardening",
      "scope": "Fraud detection, advanced analytics/reporting, staff RBAC, ERP/accounting sync, tax/e-invoice compliance, load & security testing, PCI DSS audit."
    }
  ],
  "regional_notes_egypt_mena": {
    "market_context": "User is located in Egypt; the spec favors regionally-proven providers alongside global defaults.",
    "payments": "Paymob is the strongest single integration for Egyptian/MENA cards, wallets and BNPL; Cash on Delivery (COD) should be a first-class payment method given regional demand.",
    "delivery": "Bosta is a mature Egypt-specific courier API (pricing, delivery creation, tracking, COD collection); Aramex covers broader MENA/international lanes. Both can sit behind the same Shipping Carrier Integration abstraction alongside the own-driver Dispatch engine.",
    "localization": "Arabic RTL layout and EGP currency should be first-class, not an afterthought, across every customer-facing page."
  }
}
make it in full next.js and mysql port :3306 password:1234 