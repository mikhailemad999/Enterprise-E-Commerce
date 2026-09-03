{
  "project_type": "Enterprise E-Commerce / SaaS Platform",
  "architecture_rule": "STRICT_DEPARTMENT_ISOLATION",

  "authentication": {
    "login_method": {
      "username": true,
      "six_digit_numeric_password": true,
      "password_length": 6,
      "numeric_only": true,
      "show_password": false,
      "remember_device": false,
      "session_timeout": true,
      "failed_login_limit": true,
      "account_lockout": true
    },

    "login_structure": {
      "each_department_has_separate_login": true,
      "shared_login": false,
      "cross_department_login": false,
      "department_detected_from_account": true,
      "redirect_to_department_dashboard": true
    }
  },

  "security_rules": {
    "default_access": "DENY",
    "role_based_access_control": true,
    "page_based_permissions": true,
    "action_based_permissions": true,
    "department_isolation": true,
    "tenant_isolation": true,
    "user_can_only_access_assigned_department": true,
    "user_cannot_change_department": true,
    "user_cannot_access_other_department_routes": true,
    "user_cannot_access_other_department_apis": true,
    "user_cannot_access_other_department_settings": true,
    "audit_every_sensitive_action": true
  },

  "departments": [

    {
      "department_id": "D001",
      "department_name": "SUPER_ADMIN",
      "login_page": {
        "page_number": "001",
        "route": "/super-admin/login",
        "username": true,
        "six_digit_pin": true
      },

      "dashboard": {
        "page_number": "002",
        "route": "/super-admin/dashboard",
        "operations": [
          "platform_overview",
          "all_tenants",
          "system_health",
          "global_users",
          "global_roles",
          "global_permissions",
          "platform_billing",
          "system_logs",
          "audit_logs",
          "global_settings"
        ]
      },

      "pages": [
        {
          "page_number": "003",
          "name": "Tenant Management",
          "route": "/super-admin/tenants",
          "operations": [
            "create_tenant",
            "view_tenants",
            "edit_tenant",
            "suspend_tenant",
            "activate_tenant",
            "delete_tenant",
            "view_subscription",
            "change_plan"
          ]
        },
        {
          "page_number": "004",
          "name": "Global Users",
          "route": "/super-admin/users",
          "operations": [
            "create_user",
            "edit_user",
            "disable_user",
            "reset_access",
            "view_login_history"
          ]
        },
        {
          "page_number": "005",
          "name": "Global Audit Logs",
          "route": "/super-admin/audit-logs",
          "operations": [
            "view_logs",
            "filter_logs",
            "search_logs",
            "export_logs"
          ]
        }
      ]
    },

    {
      "department_id": "D002",
      "department_name": "STORE_ADMIN",

      "login_page": {
        "page_number": "010",
        "route": "/store-admin/login",
        "username": true,
        "six_digit_pin": true
      },

      "dashboard": {
        "page_number": "011",
        "route": "/store-admin/dashboard",
        "operations": [
          "store_overview",
          "sales_overview",
          "orders_overview",
          "inventory_overview",
          "customer_overview",
          "store_notifications"
        ]
      },

      "pages": [
        {
          "page_number": "012",
          "name": "Store Settings",
          "route": "/store-admin/settings",
          "operations": [
            "edit_store_profile",
            "edit_business_information",
            "edit_store_logo",
            "edit_store_theme",
            "edit_store_hours",
            "configure_currency",
            "configure_languages"
          ]
        },
        {
          "page_number": "013",
          "name": "Staff Management",
          "route": "/store-admin/staff",
          "operations": [
            "create_staff",
            "edit_staff",
            "disable_staff",
            "assign_department",
            "assign_permissions"
          ]
        }
      ]
    },

    {
      "department_id": "D003",
      "department_name": "PRODUCT_MANAGER",

      "login_page": {
        "page_number": "020",
        "route": "/product/login",
        "username": true,
        "six_digit_pin": true
      },

      "dashboard": {
        "page_number": "021",
        "route": "/product/dashboard",
        "operations": [
          "product_summary",
          "low_stock_products",
          "draft_products",
          "out_of_stock_products"
        ]
      },

      "pages": [
        {
          "page_number": "022",
          "name": "Products",
          "route": "/product/products",
          "operations": [
            "create_product",
            "edit_product",
            "duplicate_product",
            "archive_product",
            "publish_product",
            "unpublish_product",
            "manage_sku",
            "manage_barcode",
            "manage_images",
            "manage_variants",
            "manage_attributes"
          ]
        },
        {
          "page_number": "023",
          "name": "Categories",
          "route": "/product/categories",
          "operations": [
            "create_category",
            "edit_category",
            "delete_category",
            "reorder_categories"
          ]
        },
        {
          "page_number": "024",
          "name": "Brands",
          "route": "/product/brands",
          "operations": [
            "create_brand",
            "edit_brand",
            "delete_brand"
          ]
        }
      ]
    },

    {
      "department_id": "D004",
      "department_name": "INVENTORY_MANAGER",

      "login_page": {
        "page_number": "030",
        "route": "/inventory/login",
        "username": true,
        "six_digit_pin": true
      },

      "dashboard": {
        "page_number": "031",
        "route": "/inventory/dashboard",
        "operations": [
          "stock_overview",
          "low_stock_alerts",
          "inventory_movements",
          "warehouse_status"
        ]
      },

      "pages": [
        {
          "page_number": "032",
          "name": "Inventory",
          "route": "/inventory/products",
          "operations": [
            "view_stock",
            "adjust_stock",
            "reserve_stock",
            "release_stock",
            "stock_count"
          ]
        },
        {
          "page_number": "033",
          "name": "Stock Transfers",
          "route": "/inventory/transfers",
          "operations": [
            "create_transfer",
            "approve_transfer",
            "reject_transfer",
            "receive_transfer"
          ]
        }
      ]
    },

    {
      "department_id": "D005",
      "department_name": "WAREHOUSE",

      "login_page": {
        "page_number": "040",
        "route": "/warehouse/login",
        "username": true,
        "six_digit_pin": true
      },

      "dashboard": {
        "page_number": "041",
        "route": "/warehouse/dashboard",
        "operations": [
          "orders_to_pick",
          "orders_to_pack",
          "incoming_stock",
          "warehouse_alerts"
        ]
      },

      "pages": [
        {
          "page_number": "042",
          "name": "Picking",
          "route": "/warehouse/picking",
          "operations": [
            "view_pick_queue",
            "open_pick_order",
            "scan_barcode",
            "confirm_item",
            "confirm_quantity",
            "report_missing_item",
            "complete_picking"
          ]
        },
        {
          "page_number": "043",
          "name": "Packing",
          "route": "/warehouse/packing",
          "operations": [
            "scan_order",
            "verify_items",
            "create_package",
            "enter_weight",
            "print_shipping_label",
            "print_packing_slip",
            "complete_packing"
          ]
        }
      ]
    },

    {
      "department_id": "D006",
      "department_name": "SALES",

      "login_page": {
        "page_number": "050",
        "route": "/sales/login",
        "username": true,
        "six_digit_pin": true
      },

      "dashboard": {
        "page_number": "051",
        "route": "/sales/dashboard",
        "operations": [
          "sales_today",
          "orders_today",
          "pending_orders",
          "sales_targets"
        ]
      },

      "pages": [
        {
          "page_number": "052",
          "name": "Orders",
          "route": "/sales/orders",
          "operations": [
            "create_order",
            "view_order",
            "edit_order_before_fulfillment",
            "cancel_order",
            "apply_discount",
            "print_invoice"
          ]
        }
      ]
    },

    {
      "department_id": "D007",
      "department_name": "CUSTOMER_SUPPORT",

      "login_page": {
        "page_number": "060",
        "route": "/support/login",
        "username": true,
        "six_digit_pin": true
      },

      "dashboard": {
        "page_number": "061",
        "route": "/support/dashboard",
        "operations": [
          "open_tickets",
          "pending_tickets",
          "customer_requests",
          "unresolved_cases"
        ]
      },

      "pages": [
        {
          "page_number": "062",
          "name": "Support Tickets",
          "route": "/support/tickets",
          "operations": [
            "create_ticket",
            "view_ticket",
            "reply_ticket",
            "assign_ticket",
            "change_priority",
            "close_ticket",
            "reopen_ticket"
          ]
        }
      ]
    },

    {
      "department_id": "D008",
      "department_name": "DELIVERY_MANAGER",

      "login_page": {
        "page_number": "070",
        "route": "/delivery-manager/login",
        "username": true,
        "six_digit_pin": true
      },

      "dashboard": {
        "page_number": "071",
        "route": "/delivery-manager/dashboard",
        "operations": [
          "delivery_overview",
          "pending_deliveries",
          "active_drivers",
          "failed_deliveries",
          "cash_collection"
        ]
      },

      "pages": [
        {
          "page_number": "072",
          "name": "Delivery Orders",
          "route": "/delivery-manager/orders",
          "operations": [
            "view_ready_orders",
            "assign_driver",
            "reassign_driver",
            "change_delivery_priority",
            "track_delivery"
          ]
        },
        {
          "page_number": "073",
          "name": "Drivers",
          "route": "/delivery-manager/drivers",
          "operations": [
            "create_driver",
            "edit_driver",
            "activate_driver",
            "disable_driver",
            "assign_zone"
          ]
        }
      ]
    },

    {
      "department_id": "D009",
      "department_name": "DRIVER",

      "login_page": {
        "page_number": "080",
        "route": "/driver/login",
        "username": true,
        "six_digit_pin": true
      },

      "dashboard": {
        "page_number": "081",
        "route": "/driver/dashboard",
        "operations": [
          "today_deliveries",
          "assigned_orders",
          "completed_deliveries",
          "cash_collected"
        ]
      },

      "pages": [
        {
          "page_number": "082",
          "name": "My Deliveries",
          "route": "/driver/deliveries",
          "operations": [
            "view_assigned_delivery",
            "start_delivery",
            "open_navigation",
            "call_customer",
            "mark_arrived",
            "verify_delivery_otp",
            "collect_cash",
            "capture_signature",
            "capture_photo",
            "mark_delivered",
            "report_failed_delivery"
          ]
        }
      ]
    },

    {
      "department_id": "D010",
      "department_name": "ACCOUNTING",

      "login_page": {
        "page_number": "090",
        "route": "/accounting/login",
        "username": true,
        "six_digit_pin": true
      },

      "dashboard": {
        "page_number": "091",
        "route": "/accounting/dashboard",
        "operations": [
          "revenue",
          "expenses",
          "payments",
          "refunds",
          "tax_summary",
          "financial_reports"
        ]
      },

      "pages": [
        {
          "page_number": "092",
          "name": "Payments",
          "route": "/accounting/payments",
          "operations": [
            "view_payment",
            "verify_payment",
            "refund_payment",
            "export_payment_records"
          ]
        },
        {
          "page_number": "093",
          "name": "Financial Reports",
          "route": "/accounting/reports",
          "operations": [
            "sales_report",
            "profit_report",
            "tax_report",
            "payment_report",
            "export_report"
          ]
        }
      ]
    },

    {
      "department_id": "D011",
      "department_name": "MARKETING",

      "login_page": {
        "page_number": "100",
        "route": "/marketing/login",
        "username": true,
        "six_digit_pin": true
      },

      "dashboard": {
        "page_number": "101",
        "route": "/marketing/dashboard",
        "operations": [
          "campaign_overview",
          "active_promotions",
          "coupon_usage",
          "customer_segments"
        ]
      },

      "pages": [
        {
          "page_number": "102",
          "name": "Campaigns",
          "route": "/marketing/campaigns",
          "operations": [
            "create_campaign",
            "edit_campaign",
            "schedule_campaign",
            "pause_campaign",
            "cancel_campaign",
            "view_campaign_results"
          ]
        },
        {
          "page_number": "103",
          "name": "Coupons",
          "route": "/marketing/coupons",
          "operations": [
            "create_coupon",
            "edit_coupon",
            "disable_coupon",
            "view_usage"
          ]
        }
      ]
    },

    {
      "department_id": "D012",
      "department_name": "CUSTOMER",

      "login_page": {
        "page_number": "110",
        "route": "/customer/login",
        "username": true,
        "six_digit_pin": true
      },

      "dashboard": {
        "page_number": "111",
        "route": "/customer/dashboard",
        "operations": [
          "view_orders",
          "view_wishlist",
          "manage_addresses",
          "view_wallet",
          "view_rewards",
          "manage_profile"
        ]
      },

      "pages": [
        {
          "page_number": "112",
          "name": "My Orders",
          "route": "/customer/orders",
          "operations": [
            "view_orders",
            "view_order_details",
            "track_order",
            "cancel_order_when_allowed",
            "request_return",
            "request_refund",
            "download_invoice"
          ]
        },
        {
          "page_number": "113",
          "name": "My Profile",
          "route": "/customer/profile",
          "operations": [
            "edit_profile",
            "change_pin",
            "manage_addresses",
            "manage_notifications"
          ]
        }
      ]
    }
  ],

  "page_isolation": {
    "frontend": {
      "hide_unauthorized_routes": true,
      "hide_unauthorized_navigation": true,
      "hide_unauthorized_buttons": true,
      "hide_unauthorized_actions": true
    },

    "backend": {
      "validate_role_on_every_request": true,
      "validate_department_on_every_request": true,
      "validate_tenant_on_every_request": true,
      "reject_unauthorized_api_requests": true,
      "http_status_for_unauthorized": 403
    },

    "database": {
      "department_scoped_data": true,
      "tenant_scoped_data": true,
      "row_level_access_control": true
    }
  },

  "communication_between_departments": {
    "direct_page_access": false,
    "direct_dashboard_access": false,
    "shared_api_access": false,

    "allowed_method": "CONTROLLED_API_AND_EVENT_BUS",

    "examples": [
      {
        "event": "ORDER_PLACED",
        "producer": "SALES",
        "consumers": [
          "WAREHOUSE",
          "INVENTORY",
          "ACCOUNTING",
          "CUSTOMER"
        ]
      },
      {
        "event": "ORDER_PACKED",
        "producer": "WAREHOUSE",
        "consumers": [
          "DELIVERY_MANAGER",
          "CUSTOMER"
        ]
      },
      {
        "event": "DRIVER_ASSIGNED",
        "producer": "DELIVERY_MANAGER",
        "consumers": [
          "DRIVER",
          "CUSTOMER"
        ]
      },
      {
        "event": "ORDER_DELIVERED",
        "producer": "DRIVER",
        "consumers": [
          "SALES",
          "ACCOUNTING",
          "CUSTOMER"
        ]
      }
    ]
  },

  "user_management": {
    "each_user_has": [
      "unique_user_id",
      "username",
      "six_digit_pin",
      "department_id",
      "role_id",
      "tenant_id",
      "status",
      "permissions",
      "created_at",
      "last_login",
      "login_attempts"
    ],

    "rules": [
      "one_account_can_have_multiple_permissions",
      "department_must_be_explicitly_assigned",
      "no_default_admin_access",
      "disabled_users_cannot_login",
      "locked_users_cannot_login",
      "every_login_is_logged",
      "every_sensitive_action_is_audited"
    ]
  },

  "master_rule": {
    "instruction": "BUILD EACH DEPARTMENT AS A SEPARATE OPERATIONAL APPLICATION AREA WITH ITS OWN LOGIN, DASHBOARD, ROUTES, PAGES, PERMISSIONS AND DATA ACCESS. USERS MUST NEVER SEE OR ACCESS FUNCTIONS THAT DO NOT BELONG TO THEIR ASSIGNED ROLE.",
    "do_not_create": [
      "one_dashboard_for_everyone",
      "shared_department_navigation",
      "shared_department_permissions",
      "frontend_only_security",
      "unrestricted_api_access",
      "cross_department_settings_access"
    ]
  }
}