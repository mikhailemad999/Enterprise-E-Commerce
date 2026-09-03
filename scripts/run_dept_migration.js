const mysql = require('mysql2/promise');

async function run() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'lumio_commerce',
  });

  console.log('Connected to MySQL');

  // Check columns in users table
  const [columns] = await connection.query('DESCRIBE users');
  const colNames = columns.map(c => c.Field);

  const addCol = async (name, def) => {
    if (!colNames.includes(name)) {
      console.log(`Adding column ${name}...`);
      await connection.query(`ALTER TABLE users ADD COLUMN ${def}`);
    } else {
      console.log(`Column ${name} already exists.`);
    }
  };

  await addCol('username', '`username` VARCHAR(100) UNIQUE AFTER `email`');
  await addCol('six_digit_pin', '`six_digit_pin` CHAR(6) NOT NULL DEFAULT "123456" AFTER `password_hash`');
  await addCol('department_id', '`department_id` VARCHAR(10) NOT NULL DEFAULT "D012" AFTER `role`');
  await addCol('status', '`status` ENUM("active", "disabled", "locked") NOT NULL DEFAULT "active" AFTER `department_id`');
  await addCol('permissions_json', '`permissions_json` JSON NULL AFTER `status`');
  await addCol('login_attempts', '`login_attempts` INT NOT NULL DEFAULT 0 AFTER `permissions_json`');
  await addCol('last_login', '`last_login` TIMESTAMP NULL AFTER `login_attempts`');

  // Create audit_logs
  await connection.query(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NULL,
      username VARCHAR(100) NOT NULL,
      department_id VARCHAR(10) NOT NULL,
      action VARCHAR(100) NOT NULL,
      resource VARCHAR(100) NOT NULL,
      details_json JSON NULL,
      ip_address VARCHAR(50) DEFAULT '127.0.0.1',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_audit_dept (department_id),
      INDEX idx_audit_user (user_id)
    ) ENGINE=InnoDB;
  `);

  // Create support_tickets
  await connection.query(`
    CREATE TABLE IF NOT EXISTS support_tickets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ticket_number VARCHAR(50) NOT NULL UNIQUE,
      customer_name VARCHAR(150) NOT NULL,
      customer_email VARCHAR(191) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
      status ENUM('open', 'pending', 'resolved', 'closed') DEFAULT 'open',
      assigned_to VARCHAR(100) DEFAULT 'Support Team',
      messages_json JSON NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  // Create campaigns
  await connection.query(`
    CREATE TABLE IF NOT EXISTS campaigns (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      slug VARCHAR(150) NOT NULL UNIQUE,
      channel ENUM('email', 'sms', 'social', 'curated_catalog') DEFAULT 'email',
      status ENUM('draft', 'scheduled', 'active', 'paused', 'completed') DEFAULT 'active',
      reach_count INT DEFAULT 0,
      conversions INT DEFAULT 0,
      revenue_generated DECIMAL(12,2) DEFAULT 0.00,
      start_date DATE,
      end_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  // Create coupons
  await connection.query(`
    CREATE TABLE IF NOT EXISTS coupons (
      id INT AUTO_INCREMENT PRIMARY KEY,
      code VARCHAR(50) NOT NULL UNIQUE,
      discount_type ENUM('percentage', 'fixed') DEFAULT 'percentage',
      discount_value DECIMAL(10,2) NOT NULL,
      min_order_amount DECIMAL(10,2) DEFAULT 0.00,
      usage_limit INT DEFAULT 100,
      times_used INT DEFAULT 0,
      is_active TINYINT(1) DEFAULT 1,
      expires_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  // Seed 12 Department Accounts
  const users = [
    [101, 'super.admin@lumio.design', 'superadmin', 'PIN_AUTH', '123456', 'super_admin', 'D001', 'active', 'Hisham', 'Talaat', '+20 100 000 0001', JSON.stringify(["all", "manage_tenants", "manage_users", "view_audit_logs"])],
    [102, 'store.admin@lumio.design', 'storeadmin', 'PIN_AUTH', '234567', 'super_admin', 'D002', 'active', 'Laila', 'Kamel', '+20 100 000 0002', JSON.stringify(["store_settings", "staff_management", "store_overview"])],
    [103, 'product.mgr@lumio.design', 'productmgr', 'PIN_AUTH', '345678', 'catalog_manager', 'D003', 'active', 'Ziad', 'El-Gammal', '+20 100 000 0003', JSON.stringify(["manage_products", "manage_categories", "manage_brands"])],
    [104, 'inventory.mgr@lumio.design', 'inventorymgr', 'PIN_AUTH', '456789', 'warehouse_staff', 'D004', 'active', 'Sameh', 'Farouk', '+20 100 000 0004', JSON.stringify(["adjust_stock", "manage_transfers", "stock_overview"])],
    [105, 'warehouse.ops@lumio.design', 'warehouse1', 'PIN_AUTH', '567890', 'warehouse_staff', 'D005', 'active', 'Mahmoud', 'Reda', '+20 100 000 0005', JSON.stringify(["picking", "packing", "receive_stock"])],
    [106, 'sales.director@lumio.design', 'salesrep', 'PIN_AUTH', '678901', 'order_manager', 'D006', 'active', 'Nour', 'Ezzat', '+20 100 000 0006', JSON.stringify(["create_orders", "view_orders", "apply_discount"])],
    [107, 'support.lead@lumio.design', 'supportrep', 'PIN_AUTH', '789012', 'customer', 'D007', 'active', 'Yasmine', 'Sabry', '+20 100 000 0007', JSON.stringify(["manage_tickets", "reply_tickets", "close_tickets"])],
    [108, 'dispatch.chief@lumio.design', 'deliverymgr', 'PIN_AUTH', '890123', 'dispatcher', 'D008', 'active', 'Ibrahim', 'Ghanem', '+20 100 000 0008', JSON.stringify(["dispatch_orders", "manage_drivers", "view_fleet"])],
    [109, 'courier.karim@lumio.design', 'driver1', 'PIN_AUTH', '901234', 'driver', 'D009', 'active', 'Karim', 'Mostafa', '+20 100 458 9201', JSON.stringify(["view_manifest", "navigate", "submit_pod"])],
    [110, 'cfo.accounting@lumio.design', 'accountant', 'PIN_AUTH', '112233', 'super_admin', 'D010', 'active', 'Tamer', 'Hegazy', '+20 100 000 0010', JSON.stringify(["view_financials", "manage_payments", "tax_reports"])],
    [111, 'marketing.lead@lumio.design', 'marketmgr', 'PIN_AUTH', '223344', 'catalog_manager', 'D011', 'active', 'Salma', 'Soliman', '+20 100 000 0011', JSON.stringify(["manage_campaigns", "manage_coupons", "view_analytics"])],
    [112, 'farida.mansour@vip.eg', 'client1', 'PIN_AUTH', '334455', 'customer', 'D012', 'active', 'Farida', 'Mansour', '+20 102 334 8812', JSON.stringify(["view_orders", "track_orders", "manage_profile"])],
  ];

  for (const u of users) {
    await connection.query(`
      INSERT INTO users (id, email, username, password_hash, six_digit_pin, role, department_id, status, first_name, last_name, phone, permissions_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        username = VALUES(username),
        six_digit_pin = VALUES(six_digit_pin),
        department_id = VALUES(department_id),
        status = 'active',
        permissions_json = VALUES(permissions_json)
    `, u);
  }
  console.log('Seeded 12 department accounts successfully!');

  // Seed sample tickets
  await connection.query(`
    INSERT INTO support_tickets (ticket_number, customer_name, customer_email, subject, priority, status, assigned_to, messages_json)
    VALUES
    ('TCK-2026-001', 'Farida Mansour', 'farida.mansour@vip.eg', 'Inquiry regarding Torso Luminaire Fayoum flax shade patina', 'medium', 'open', 'Yasmine Sabry', '[{"sender": "client", "text": "Good day, what is the best non-abrasive method to clean dust from the unlacquered bronze base?", "time": "2026-09-03 14:20"}]'),
    ('TCK-2026-002', 'Sherif Aly', 'sherif.aly@equity.eg', 'White-glove delivery scheduling request for Palm Hills residence', 'high', 'pending', 'Yasmine Sabry', '[{"sender": "client", "text": "Can we coordinate delivery specifically between 10am and 1pm this Saturday?", "time": "2026-09-03 16:45"}]')
    ON DUPLICATE KEY UPDATE ticket_number = VALUES(ticket_number);
  `);

  // Seed sample campaigns
  await connection.query(`
    INSERT INTO campaigns (title, slug, channel, status, reach_count, conversions, revenue_generated, start_date, end_date)
    VALUES
    ('Autumn Solstice Architectural Monoliths', 'autumn-solstice-2026', 'email', 'active', 4850, 142, 420000.00, '2026-09-01', '2026-09-30'),
    ('Private Client Atelier Preview', 'vip-private-preview', 'curated_catalog', 'active', 1200, 78, 580000.00, '2026-09-05', '2026-10-15')
    ON DUPLICATE KEY UPDATE slug = VALUES(slug);
  `);

  // Seed sample coupons
  await connection.query(`
    INSERT INTO coupons (code, discount_type, discount_value, min_order_amount, is_active)
    VALUES
    ('LUMIO10', 'percentage', 10.00, 10000.00, 1),
    ('ATELIERVIP', 'fixed', 5000.00, 35000.00, 1)
    ON DUPLICATE KEY UPDATE discount_value = VALUES(discount_value);
  `);

  // Ensure audit_logs has username and department_id
  const [auditCols] = await connection.query('DESCRIBE audit_logs');
  const auditColNames = auditCols.map(c => c.Field);
  if (!auditColNames.includes('username')) {
    await connection.query('ALTER TABLE audit_logs ADD COLUMN username VARCHAR(100) NULL AFTER user_id');
  }
  if (!auditColNames.includes('department_id')) {
    await connection.query('ALTER TABLE audit_logs ADD COLUMN department_id VARCHAR(10) NULL AFTER username');
  }

  // Seed sample audit logs
  await connection.query(`
    INSERT INTO audit_logs (user_id, username, department_id, action, entity_type, entity_id, details_json)
    VALUES
    (101, 'superadmin', 'D001', 'SYSTEM_AUDIT', 'Platform Settings', 'GLOBAL', '{"event": "Security policy verified. Strict department isolation active."}'),
    (104, 'inventorymgr', 'D004', 'STOCK_TRANSFER', 'Warehouse', '1', '{"from_warehouse": 1, "to_warehouse": 2, "quantity": 4, "sku": "LUM-LGT-001"}'),
    (106, 'salesrep', 'D006', 'ORDER_CONFIRMED', 'Order', '1', '{"amount": 50500, "client": "Farida Mansour"}');
  `);

  console.log('All migrations and seeds finished successfully!');
  await connection.end();
}

run().catch(console.error);
