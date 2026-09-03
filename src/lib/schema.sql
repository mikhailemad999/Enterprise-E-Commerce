-- Lumio Enterprise Commerce Database Schema
-- Target: MySQL 8.0+

CREATE DATABASE IF NOT EXISTS `lumio_commerce` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `lumio_commerce`;

-- Users & Authentication
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('super_admin', 'catalog_manager', 'order_manager', 'dispatcher', 'warehouse_staff', 'driver', 'customer') NOT NULL DEFAULT 'customer',
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(50),
  `avatar_url` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Customers (Extension of Users for commerce data)
CREATE TABLE IF NOT EXISTS `customers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NULL,
  `loyalty_points` INT DEFAULT 0,
  `tier` ENUM('Bronze', 'Silver', 'Gold', 'Private Client') DEFAULT 'Bronze',
  `referral_code` VARCHAR(50) UNIQUE,
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_cust_user` (`user_id`)
) ENGINE=InnoDB;

-- Customer Saved Addresses
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NULL,
  `type` ENUM('shipping', 'billing') DEFAULT 'shipping',
  `full_name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `street` VARCHAR(255) NOT NULL,
  `apartment` VARCHAR(100),
  `city` VARCHAR(100) NOT NULL,
  `governorate` VARCHAR(100) NOT NULL DEFAULT 'Cairo',
  `postal_code` VARCHAR(20),
  `country` VARCHAR(50) DEFAULT 'Egypt',
  `latitude` DECIMAL(10, 8),
  `longitude` DECIMAL(11, 8),
  `is_default` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_addr_user` (`user_id`)
) ENGINE=InnoDB;

-- Categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `description` TEXT,
  `image_url` TEXT,
  `parent_id` INT NULL,
  `sort_order` INT DEFAULT 0,
  INDEX `idx_cat_slug` (`slug`)
) ENGINE=InnoDB;

-- Products
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `sku` VARCHAR(100) NOT NULL UNIQUE,
  `short_description` VARCHAR(500),
  `description` TEXT,
  `price` DECIMAL(12, 2) NOT NULL,
  `compare_at_price` DECIMAL(12, 2) NULL,
  `cost_price` DECIMAL(12, 2) NULL,
  `category_id` INT NOT NULL,
  `brand` VARCHAR(100) DEFAULT 'Lumio Ateliers',
  `material` VARCHAR(150),
  `dimensions` VARCHAR(150),
  `weight_kg` DECIMAL(8, 2) DEFAULT 0.00,
  `is_active` BOOLEAN DEFAULT TRUE,
  `is_featured` BOOLEAN DEFAULT FALSE,
  `images_json` JSON,
  `attributes_json` JSON,
  `rating` DECIMAL(3, 2) DEFAULT 5.00,
  `review_count` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_prod_cat` (`category_id`),
  INDEX `idx_prod_slug` (`slug`),
  INDEX `idx_prod_featured` (`is_featured`)
) ENGINE=InnoDB;

-- Product Variants
CREATE TABLE IF NOT EXISTS `product_variants` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL,
  `sku` VARCHAR(100) NOT NULL UNIQUE,
  `title` VARCHAR(150) NOT NULL,
  `price` DECIMAL(12, 2) NOT NULL,
  `attributes_json` JSON,
  `stock_quantity` INT DEFAULT 0,
  INDEX `idx_var_prod` (`product_id`)
) ENGINE=InnoDB;

-- Warehouses
CREATE TABLE IF NOT EXISTS `warehouses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `address` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `governorate` VARCHAR(100) NOT NULL,
  `latitude` DECIMAL(10, 8),
  `longitude` DECIMAL(11, 8),
  `capacity_sqm` INT DEFAULT 5000,
  `is_active` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB;

-- Multi-Warehouse Inventory Stocks
CREATE TABLE IF NOT EXISTS `inventory_stocks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL,
  `warehouse_id` INT NOT NULL,
  `quantity_on_hand` INT DEFAULT 0,
  `quantity_reserved` INT DEFAULT 0,
  `quantity_available` INT GENERATED ALWAYS AS (quantity_on_hand - quantity_reserved) STORED,
  `safety_stock` INT DEFAULT 5,
  `reorder_point` INT DEFAULT 10,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_prod_wh` (`product_id`, `warehouse_id`),
  INDEX `idx_inv_prod` (`product_id`),
  INDEX `idx_inv_wh` (`warehouse_id`)
) ENGINE=InnoDB;

-- Stock Transfers
CREATE TABLE IF NOT EXISTS `stock_transfers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `transfer_number` VARCHAR(50) NOT NULL UNIQUE,
  `source_warehouse_id` INT NOT NULL,
  `target_warehouse_id` INT NOT NULL,
  `status` ENUM('draft', 'in_transit', 'completed', 'cancelled') DEFAULT 'in_transit',
  `items_json` JSON NOT NULL,
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Delivery Drivers
CREATE TABLE IF NOT EXISTS `drivers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NULL,
  `name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `vehicle_type` ENUM('Van (Van Mercedes Sprinter)', 'Sedan VIP', 'Motorcycle Priority', 'Truck 3.5T') DEFAULT 'Van (Van Mercedes Sprinter)',
  `vehicle_plate` VARCHAR(50) NOT NULL,
  `license_number` VARCHAR(50),
  `status` ENUM('offline', 'available', 'busy', 'on_delivery') DEFAULT 'available',
  `current_lat` DECIMAL(10, 8) DEFAULT 30.0444,
  `current_lng` DECIMAL(11, 8) DEFAULT 31.2357,
  `battery_percent` INT DEFAULT 92,
  `speed_kmh` INT DEFAULT 34,
  `rating` DECIMAL(3, 2) DEFAULT 4.95,
  `completed_deliveries` INT DEFAULT 0,
  `active_order_id` INT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(50) NOT NULL UNIQUE,
  `customer_id` INT NULL,
  `guest_email` VARCHAR(191),
  `guest_name` VARCHAR(150),
  `guest_phone` VARCHAR(50),
  `status` ENUM('pending', 'confirmed', 'processing', 'ready_for_dispatch', 'out_for_delivery', 'delivered', 'cancelled', 'returned') DEFAULT 'confirmed',
  `payment_status` ENUM('pending', 'paid', 'cod_pending', 'failed', 'refunded') DEFAULT 'paid',
  `payment_method` ENUM('card_stripe', 'paymob_wallet', 'card_paymob', 'cash_on_delivery') DEFAULT 'cash_on_delivery',
  `subtotal` DECIMAL(12, 2) NOT NULL,
  `discount` DECIMAL(12, 2) DEFAULT 0.00,
  `tax` DECIMAL(12, 2) DEFAULT 0.00,
  `shipping_fee` DECIMAL(12, 2) DEFAULT 0.00,
  `total_amount` DECIMAL(12, 2) NOT NULL,
  `currency` VARCHAR(10) DEFAULT 'EGP',
  `shipping_address_json` JSON NOT NULL,
  `billing_address_json` JSON,
  `warehouse_id` INT DEFAULT 1,
  `assigned_driver_id` INT NULL,
  `carrier_name` VARCHAR(100) DEFAULT 'Lumio Private Fleet',
  `carrier_tracking_number` VARCHAR(100),
  `delivery_type` ENUM('own_fleet', 'carrier_bosta', 'carrier_aramex') DEFAULT 'own_fleet',
  `otp_code` VARCHAR(10) DEFAULT '8492',
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_order_num` (`order_number`),
  INDEX `idx_order_status` (`status`),
  INDEX `idx_order_cust` (`customer_id`),
  INDEX `idx_order_driver` (`assigned_driver_id`)
) ENGINE=InnoDB;

-- Order Items
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `sku` VARCHAR(100) NOT NULL,
  `unit_price` DECIMAL(12, 2) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `total_price` DECIMAL(12, 2) NOT NULL,
  `image_url` TEXT,
  INDEX `idx_item_order` (`order_id`)
) ENGINE=InnoDB;

-- Order Timeline (Audit trail)
CREATE TABLE IF NOT EXISTS `order_timeline` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `description` TEXT,
  `created_by` VARCHAR(100) DEFAULT 'System',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_tl_order` (`order_id`)
) ENGINE=InnoDB;

-- Delivery Tasks & Proof of Delivery (POD)
CREATE TABLE IF NOT EXISTS `delivery_tasks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `driver_id` INT NOT NULL,
  `status` ENUM('pending', 'accepted', 'in_transit', 'arrived', 'completed', 'failed') DEFAULT 'pending',
  `route_order` INT DEFAULT 1,
  `customer_name` VARCHAR(150) NOT NULL,
  `customer_phone` VARCHAR(50) NOT NULL,
  `delivery_address` TEXT NOT NULL,
  `latitude` DECIMAL(10, 8),
  `longitude` DECIMAL(11, 8),
  `cod_amount` DECIMAL(12, 2) DEFAULT 0.00,
  `eta_minutes` INT DEFAULT 25,
  `distance_km` DECIMAL(5, 2) DEFAULT 7.4,
  `otp_code` VARCHAR(10) DEFAULT '8492',
  `proof_photo_url` LONGTEXT,
  `signature_data` LONGTEXT,
  `cod_collected` BOOLEAN DEFAULT FALSE,
  `failure_reason` VARCHAR(255),
  `completed_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_task_order` (`order_id`),
  INDEX `idx_task_driver` (`driver_id`),
  INDEX `idx_task_status` (`status`)
) ENGINE=InnoDB;

-- RMA / Returns Management
CREATE TABLE IF NOT EXISTS `returns_rma` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `rma_number` VARCHAR(50) NOT NULL UNIQUE,
  `order_id` INT NOT NULL,
  `customer_name` VARCHAR(150) NOT NULL,
  `customer_email` VARCHAR(191) NOT NULL,
  `status` ENUM('requested', 'approved', 'item_received', 'inspected', 'refunded', 'rejected') DEFAULT 'requested',
  `reason` VARCHAR(255) NOT NULL,
  `items_json` JSON NOT NULL,
  `refund_amount` DECIMAL(12, 2) NOT NULL,
  `refund_method` ENUM('original_payment', 'store_credit', 'exchange') DEFAULT 'original_payment',
  `restock_confirmed` BOOLEAN DEFAULT FALSE,
  `warehouse_destination_id` INT DEFAULT 1,
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_rma_num` (`rma_number`),
  INDEX `idx_rma_order` (`order_id`)
) ENGINE=InnoDB;

-- Bespoke Concierge & Architectural Consultations
CREATE TABLE IF NOT EXISTS `concierge_consultations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `client_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `project_type` ENUM('Private Residence', 'Penthouse', 'Boutique Hotel', 'Corporate Headquarters', 'Diplomatic Estate') DEFAULT 'Private Residence',
  `budget_range` VARCHAR(100) DEFAULT '150,000 - 500,000 EGP',
  `architectural_style` VARCHAR(100) DEFAULT 'Modern Minimalist',
  `rooms_json` JSON,
  `preferred_date` DATE,
  `notes` TEXT,
  `status` ENUM('inquiry_received', 'consultant_assigned', 'scheduled', 'proposal_presented', 'contract_closed') DEFAULT 'inquiry_received',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Coupons & Promotions
CREATE TABLE IF NOT EXISTS `coupons` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `discount_type` ENUM('percentage', 'fixed') DEFAULT 'percentage',
  `discount_value` DECIMAL(10, 2) NOT NULL,
  `min_order_amount` DECIMAL(12, 2) DEFAULT 0.00,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Product Reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL,
  `customer_name` VARCHAR(150) NOT NULL,
  `rating` INT NOT NULL DEFAULT 5,
  `title` VARCHAR(255) NOT NULL,
  `comment` TEXT NOT NULL,
  `is_verified` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_rev_prod` (`product_id`)
) ENGINE=InnoDB;

-- Audit Logs
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NULL,
  `action` VARCHAR(100) NOT NULL,
  `entity_type` VARCHAR(100) NOT NULL,
  `entity_id` VARCHAR(100),
  `details_json` JSON,
  `ip_address` VARCHAR(50),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
