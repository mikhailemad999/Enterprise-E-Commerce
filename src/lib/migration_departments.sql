-- Migration: Add Department Isolation and 6-Digit PIN Fields to Users & Add Department Specific Tables
USE `lumio_commerce`;

-- Alter users table safely if columns do not exist
ALTER TABLE `users` 
  ADD COLUMN IF NOT EXISTS `username` VARCHAR(100) UNIQUE AFTER `email`,
  ADD COLUMN IF NOT EXISTS `six_digit_pin` CHAR(6) NOT NULL DEFAULT '123456' AFTER `password_hash`,
  ADD COLUMN IF NOT EXISTS `department_id` VARCHAR(10) NOT NULL DEFAULT 'D012' AFTER `role`,
  ADD COLUMN IF NOT EXISTS `status` ENUM('active', 'disabled', 'locked') NOT NULL DEFAULT 'active' AFTER `department_id`,
  ADD COLUMN IF NOT EXISTS `permissions_json` JSON NULL AFTER `status`,
  ADD COLUMN IF NOT EXISTS `login_attempts` INT NOT NULL DEFAULT 0 AFTER `permissions_json`,
  ADD COLUMN IF NOT EXISTS `last_login` TIMESTAMP NULL AFTER `login_attempts`;

-- Audit Logs Table for tracking every sensitive action across departments
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NULL,
  `username` VARCHAR(100) NOT NULL,
  `department_id` VARCHAR(10) NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `resource` VARCHAR(100) NOT NULL,
  `details_json` JSON NULL,
  `ip_address` VARCHAR(50) DEFAULT '127.0.0.1',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_audit_dept` (`department_id`),
  INDEX `idx_audit_user` (`user_id`)
) ENGINE=InnoDB;

-- Support Tickets for D007 (CUSTOMER_SUPPORT)
CREATE TABLE IF NOT EXISTS `support_tickets` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ticket_number` VARCHAR(50) NOT NULL UNIQUE,
  `customer_name` VARCHAR(150) NOT NULL,
  `customer_email` VARCHAR(191) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `priority` ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
  `status` ENUM('open', 'pending', 'resolved', 'closed') DEFAULT 'open',
  `assigned_to` VARCHAR(100) DEFAULT 'Support Team',
  `messages_json` JSON NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Campaigns for D011 (MARKETING)
CREATE TABLE IF NOT EXISTS `campaigns` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `channel` ENUM('email', 'sms', 'social', 'curated_catalog') DEFAULT 'email',
  `status` ENUM('draft', 'scheduled', 'active', 'paused', 'completed') DEFAULT 'active',
  `reach_count` INT DEFAULT 0,
  `conversions` INT DEFAULT 0,
  `revenue_generated` DECIMAL(12,2) DEFAULT 0.00,
  `start_date` DATE,
  `end_date` DATE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Coupons for D011 (MARKETING)
CREATE TABLE IF NOT EXISTS `coupons` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `discount_type` ENUM('percentage', 'fixed') DEFAULT 'percentage',
  `discount_value` DECIMAL(10,2) NOT NULL,
  `min_order_amount` DECIMAL(10,2) DEFAULT 0.00,
  `usage_limit` INT DEFAULT 100,
  `times_used` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `expires_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Seed Accounts for all 12 Departments with exact 6-Digit Numeric PINs
INSERT INTO `users` (`id`, `email`, `username`, `password_hash`, `six_digit_pin`, `role`, `department_id`, `status`, `first_name`, `last_name`, `phone`, `permissions_json`)
VALUES
(101, 'super.admin@lumio.design', 'superadmin', 'PIN_AUTH', '123456', 'super_admin', 'D001', 'active', 'Hisham', 'Talaat', '+20 100 000 0001', '["all", "manage_tenants", "manage_users", "view_audit_logs"]'),
(102, 'store.admin@lumio.design', 'storeadmin', 'PIN_AUTH', '234567', 'super_admin', 'D002', 'active', 'Laila', 'Kamel', '+20 100 000 0002', '["store_settings", "staff_management", "store_overview"]'),
(103, 'product.mgr@lumio.design', 'productmgr', 'PIN_AUTH', '345678', 'catalog_manager', 'D003', 'active', 'Ziad', 'El-Gammal', '+20 100 000 0003', '["manage_products", "manage_categories", "manage_brands"]'),
(104, 'inventory.mgr@lumio.design', 'inventorymgr', 'PIN_AUTH', '456789', 'warehouse_staff', 'D004', 'active', 'Sameh', 'Farouk', '+20 100 000 0004', '["adjust_stock", "manage_transfers", "stock_overview"]'),
(105, 'warehouse.ops@lumio.design', 'warehouse1', 'PIN_AUTH', '567890', 'warehouse_staff', 'D005', 'active', 'Mahmoud', 'Reda', '+20 100 000 0005', '["picking", "packing", "receive_stock"]'),
(106, 'sales.director@lumio.design', 'salesrep', 'PIN_AUTH', '678901', 'order_manager', 'D006', 'active', 'Nour', 'Ezzat', '+20 100 000 0006', '["create_orders", "view_orders", "apply_discount"]'),
(107, 'support.lead@lumio.design', 'supportrep', 'PIN_AUTH', '789012', 'customer', 'D007', 'active', 'Yasmine', 'Sabry', '+20 100 000 0007', '["manage_tickets", "reply_tickets", "close_tickets"]'),
(108, 'dispatch.chief@lumio.design', 'deliverymgr', 'PIN_AUTH', '890123', 'dispatcher', 'D008', 'active', 'Ibrahim', 'Ghanem', '+20 100 000 0008', '["dispatch_orders", "manage_drivers", "view_fleet"]'),
(109, 'courier.karim@lumio.design', 'driver1', 'PIN_AUTH', '901234', 'driver', 'D009', 'active', 'Karim', 'Mostafa', '+20 100 458 9201', '["view_manifest", "navigate", "submit_pod"]'),
(110, 'cfo.accounting@lumio.design', 'accountant', 'PIN_AUTH', '112233', 'super_admin', 'D010', 'active', 'Tamer', 'Hegazy', '+20 100 000 0010', '["view_financials", "manage_payments", "tax_reports"]'),
(111, 'marketing.lead@lumio.design', 'marketmgr', 'PIN_AUTH', '223344', 'catalog_manager', 'D011', 'active', 'Salma', 'Soliman', '+20 100 000 0011', '["manage_campaigns", "manage_coupons", "view_analytics"]'),
(112, 'farida.mansour@vip.eg', 'client1', 'PIN_AUTH', '334455', 'customer', 'D012', 'active', 'Farida', 'Mansour', '+20 102 334 8812', '["view_orders", "track_orders", "manage_profile"]')
ON DUPLICATE KEY UPDATE 
  `username` = VALUES(`username`),
  `six_digit_pin` = VALUES(`six_digit_pin`),
  `department_id` = VALUES(`department_id`),
  `status` = 'active',
  `permissions_json` = VALUES(`permissions_json`);

-- Seed sample Support Tickets
INSERT INTO `support_tickets` (`ticket_number`, `customer_name`, `customer_email`, `subject`, `priority`, `status`, `assigned_to`, `messages_json`)
VALUES
('TCK-2026-001', 'Farida Mansour', 'farida.mansour@vip.eg', 'Inquiry regarding Torso Luminaire Fayoum flax shade patina', 'medium', 'open', 'Yasmine Sabry', '[{"sender": "client", "text": "Good day, what is the best non-abrasive method to clean dust from the unlacquered bronze base?", "time": "2026-09-03 14:20"}]'),
('TCK-2026-002', 'Sherif Aly', 'sherif.aly@equity.eg', 'White-glove delivery scheduling request for Palm Hills residence', 'high', 'pending', 'Yasmine Sabry', '[{"sender": "client", "text": "Can we coordinate delivery specifically between 10am and 1pm this Saturday?", "time": "2026-09-03 16:45"}]')
ON DUPLICATE KEY UPDATE `ticket_number` = VALUES(`ticket_number`);

-- Seed sample Marketing Campaigns & Coupons
INSERT INTO `campaigns` (`title`, `slug`, `channel`, `status`, `reach_count`, `conversions`, `revenue_generated`, `start_date`, `end_date`)
VALUES
('Autumn Solstice Architectural Monoliths', 'autumn-solstice-2026', 'email', 'active', 4850, 142, 420000.00, '2026-09-01', '2026-09-30'),
('Private Client Private Atelier Preview', 'vip-private-preview', 'curated_catalog', 'active', 1200, 78, 580000.00, '2026-09-05', '2026-10-15')
ON DUPLICATE KEY UPDATE `slug` = VALUES(`slug`);

INSERT INTO `coupons` (`code`, `discount_type`, `discount_value`, `min_order_amount`, `usage_limit`, `times_used`, `is_active`)
VALUES
('LUMIO10', 'percentage', 10.00, 10000.00, 500, 38, 1),
('ATELIERVIP', 'fixed', 5000.00, 35000.00, 100, 14, 1)
ON DUPLICATE KEY UPDATE `code` = VALUES(`code`);

-- Seed sample Audit Logs
INSERT INTO `audit_logs` (`user_id`, `username`, `department_id`, `action`, `resource`, `details_json`)
VALUES
(101, 'superadmin', 'D001', 'SYSTEM_AUDIT', 'Platform Settings', '{"event": "Security policy verified. Strict department isolation active."}'),
(104, 'inventorymgr', 'D004', 'STOCK_TRANSFER', 'Cairo West Hub', '{"from_warehouse": 1, "to_warehouse": 2, "quantity": 4, "sku": "LUM-LGT-001"}'),
(106, 'salesrep', 'D006', 'ORDER_CONFIRMED', 'Order #LUM-2026-8891', '{"amount": 50500, "client": "Farida Mansour"}');
