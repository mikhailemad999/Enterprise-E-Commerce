USE `lumio_commerce`;

-- Seed Users
INSERT INTO `users` (`id`, `email`, `password_hash`, `role`, `first_name`, `last_name`, `phone`, `avatar_url`) VALUES
(1, 'admin@lumio.com', '$2b$10$abcdef1234567890', 'super_admin', 'Layla', 'Nour', '+20 100 000 0001', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'),
(2, 'dispatcher@lumio.com', '$2b$10$abcdef1234567890', 'dispatcher', 'Ahmed', 'Zaki', '+20 100 000 0002', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
(3, 'driver1@lumio.com', '$2b$10$abcdef1234567890', 'driver', 'Karim', 'Mostafa', '+20 100 458 9201', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'),
(4, 'driver2@lumio.com', '$2b$10$abcdef1234567890', 'driver', 'Tarek', 'El-Sayed', '+20 112 879 3341', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80'),
(5, 'client@lumio.com', '$2b$10$abcdef1234567890', 'customer', 'Farida', 'Mansour', '+20 102 334 8812', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80')
ON DUPLICATE KEY UPDATE `email` = VALUES(`email`);

-- Seed Customers
INSERT INTO `customers` (`id`, `user_id`, `loyalty_points`, `tier`, `referral_code`, `notes`) VALUES
(1, 5, 4850, 'Private Client', 'LUMIO-FARIDA-88', 'Architectural firm principal, prefers morning white-glove deliveries in Zamalek.')
ON DUPLICATE KEY UPDATE `loyalty_points` = VALUES(`loyalty_points`);

-- Seed Addresses
INSERT INTO `addresses` (`id`, `user_id`, `type`, `full_name`, `phone`, `street`, `apartment`, `city`, `governorate`, `postal_code`, `country`, `latitude`, `longitude`, `is_default`) VALUES
(1, 5, 'shipping', 'Farida Mansour', '+20 102 334 8812', '14 Hassan Sabry Street', 'Floor 6, Penthouse B', 'Zamalek', 'Cairo', '11211', 'Egypt', 30.0614, 31.2185, TRUE),
(2, 5, 'shipping', 'Farida Mansour (Studio)', '+20 102 334 8812', 'Plot 44, North Choueifat', 'Villa 8', 'New Cairo', 'Cairo', '11835', 'Egypt', 30.0125, 31.4320, FALSE)
ON DUPLICATE KEY UPDATE `full_name` = VALUES(`full_name`);

-- Seed Categories
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `sort_order`) VALUES
(1, 'Lighting & Luminaires', 'lighting', 'Architectural lighting, sculptural lamps, and hand-carved alabaster pendants.', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80', 1),
(2, 'Sculptural Furniture', 'furniture', 'Monolithic stone plinths, low fluted tables, and organic smoked oak seating.', 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80', 2),
(3, 'Raw Ceramic Objects', 'ceramics', 'Hand-thrown terracotta and basalt vessels from Fayoum ateliers.', 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80', 3),
(4, 'Architectural Surfaces', 'surfaces', 'Solid travertine plinths, honed marble monoliths, and volcanic stone accents.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', 4),
(5, 'Flax Linens & Textiles', 'textiles', 'Organic unbleached Egyptian flax linens and textural woven throws.', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80', 5)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Seed Products
INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `short_description`, `description`, `price`, `compare_at_price`, `cost_price`, `category_id`, `brand`, `material`, `dimensions`, `weight_kg`, `is_active`, `is_featured`, `images_json`, `attributes_json`, `rating`, `review_count`) VALUES
(1, 'Torso Ceramic Luminaire', 'torso-ceramic-luminaire', 'LUM-LGT-001', 'Hand-thrown in Fayoum with acoustically calibrated shade and unlacquered bronze base.', 'The Torso Luminaire embodies architectural quiet luxury. Individually shaped by master potters in the Fayoum oasis, its textured terracotta form provides grounded weight, crowned by a natural flax acoustic shade that casts a diffuse, warm ambient glow (2700K).', 18500.00, 21000.00, 7200.00, 1, 'Lumio Ateliers', 'Fayoum Terracotta & Bronze', 'H: 58cm x W: 34cm x D: 34cm', 6.80, TRUE, TRUE, 
'["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=85"]',
'{"origin": "Fayoum, Egypt", "finish": "Raw Matte Terracotta", "bulb_type": "E27 Warm LED 2700K", "cord": "2.5m Braided Flax"}', 4.95, 28),

(2, 'Monolithic Travertine Plinth', 'monolithic-travertine-plinth', 'LUM-FUR-002', 'Carved from single block Roman travertine with hand-honed chamfered edges.', 'A sculptural monolith designed to anchor living volumes. Each plinth exhibits natural cellular pitting and subtle sedimentary stratification, sealed with an invisible breathable matte hydro-repellent.', 32000.00, 36000.00, 14000.00, 2, 'Lumio Ateliers', 'Italian Roman Travertine', 'H: 45cm x W: 40cm x D: 40cm', 48.00, TRUE, TRUE,
'["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85"]',
'{"origin": "Tivoli Quarry", "finish": "Honed Matte Sealed", "weight_bearing": "Up to 180kg"}', 5.00, 14),

(3, 'Brutalist Bronze Sconce', 'brutalist-bronze-sconce', 'LUM-LGT-003', 'Solid sand-cast unlacquered bronze with dual architectural light apertures.', 'Heavyweight cast bronze wall luminaire engineered for both residential entryways and gallery corridors. The unlacquered surface develops an exquisite natural living patina over decades of exposure.', 14200.00, 16500.00, 5800.00, 1, 'Lumio Ateliers', 'Cast Bronze & Frosted Glass', 'H: 38cm x W: 14cm x D: 11cm', 5.20, TRUE, TRUE,
'["https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85"]',
'{"origin": "Cairo Foundry", "voltage": "220-240V", "ip_rating": "IP44 (Suitable for bathrooms)"}', 4.88, 19),

(4, 'Fayoum Basalt Vessel No. 09', 'fayoum-basalt-vessel-09', 'LUM-CER-004', 'Organic textured vessel with mineral basalt wash and unglazed volcanic rim.', 'Sculpted by hand without a wheel, Vessel No. 09 celebrates asymmetrical balance and tactile geology. Watertight interior allows for delicate dry botanicals or sculptural single-stem ikebana.', 9800.00, 11500.00, 3400.00, 3, 'Lumio Ateliers', 'Basalt-infused Clay', 'H: 42cm x W: 28cm x D: 26cm', 4.30, TRUE, FALSE,
'["https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85"]',
'{"origin": "Fayoum Ateliers", "capacity": "3.2L", "care": "Wipe with damp cloth"}', 4.90, 11),

(5, 'Egyptian Flax Lounge Chair', 'egyptian-flax-lounge-chair', 'LUM-FUR-005', 'Low-profile solid smoked oak frame upholstered in heavy 650gsm Nubian flax linen.', 'Designed for contemplative seating. Deep 72cm seat depth with feather-wrapped high-resilience natural latex cushions, wrapped in heritage woven Egyptian flax grown in the Nile Delta.', 42500.00, 48000.00, 19500.00, 2, 'Lumio Ateliers', 'Smoked Oak & 100% Egyptian Flax', 'H: 68cm x W: 86cm x D: 84cm', 28.50, TRUE, TRUE,
'["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85"]',
'{"origin": "Damietta Master Woodworkers", "fabric_weight": "650 g/m²", "martindale": "45,000 rubs"}', 5.00, 22),

(6, 'Alabaster Disc Pendant', 'alabaster-disc-pendant', 'LUM-LGT-006', 'Hand-lathed Upper Egypt translucent alabaster disc with spun aged brass hardware.', 'A suspended astronomical moon. Natural vein variations in genuine Egyptian alabaster make every disc a one-of-a-kind luminous sculpture, providing 360-degree soft celestial illumination.', 16900.00, 19000.00, 6800.00, 1, 'Lumio Ateliers', 'Upper Egypt Alabaster & Brass', 'Diameter: 45cm x D: 8cm', 7.40, TRUE, TRUE,
'["https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=85"]',
'{"origin": "Asyut Quarries", "drop_length": "Adjustable up to 200cm", "cri": "97+"}', 4.92, 17),

(7, 'Calacatta Viola Low Coffee Table', 'calacatta-viola-low-coffee-table', 'LUM-FUR-007', 'Dramatic cabernet veining on creamy marble monolith with floating recessed base.', 'An architectural centerpiece with hand-polished satin honed finish. Chamfered top edge creates subtle play with natural shadows and room ambiance.', 58000.00, 65000.00, 27000.00, 2, 'Lumio Ateliers', 'Calacatta Viola Marble', 'H: 32cm x W: 120cm x D: 70cm', 95.00, TRUE, FALSE,
'["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"]',
'{"origin": "Carrara / Cairo Workshop", "finish": "Satin Honed", "sealing": "Food-grade Oleophobic"}', 5.00, 8),

(8, 'Nubian Heavy Flax Throw', 'nubian-heavy-flax-throw', 'LUM-TEX-008', 'Loomed by hand on traditional shuttle looms in Akhmim with raw fringed selvedge.', 'Pre-washed with desert pumice stones for immediate relaxed drape and ultra-soft tactile hand. Versatile over low sofas or layered on minimalist king beds.', 6400.00, 7500.00, 2100.00, 5, 'Lumio Ateliers', '100% Long-staple Egyptian Flax', 'L: 220cm x W: 160cm', 1.90, TRUE, FALSE,
'["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=85"]',
'{"origin": "Akhmim, Upper Egypt", "weight": "420 g/m²", "wash": "Stone-washed non-toxic"}', 4.85, 34)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Seed Warehouses
INSERT INTO `warehouses` (`id`, `name`, `code`, `address`, `city`, `governorate`, `latitude`, `longitude`, `capacity_sqm`, `is_active`) VALUES
(1, 'Cairo West Fulfillment Hub', 'WH-CAI-WEST', 'Km 28 Cairo-Alexandria Desert Road, Smart Village Zone', 'Sheikh Zayed', 'Giza', 30.0712, 30.9845, 8500, TRUE),
(2, 'Cairo East Central Depot', 'WH-CAI-EAST', 'Plot 12 Industrial Zone, 5th Settlement', 'New Cairo', 'Cairo', 30.0245, 31.4891, 12000, TRUE),
(3, 'Alexandria Maritime Terminal', 'WH-ALX-PORT', 'Dekheila Free Zone Logistics Corridor', 'Alexandria', 'Alexandria', 31.1420, 29.8140, 6000, TRUE)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Seed Inventory Stocks (Multi-Warehouse Allocation)
INSERT INTO `inventory_stocks` (`product_id`, `warehouse_id`, `quantity_on_hand`, `quantity_reserved`, `safety_stock`, `reorder_point`) VALUES
(1, 1, 14, 2, 4, 8),
(1, 2, 22, 3, 5, 10),
(1, 3, 8, 0, 3, 5),
(2, 1, 6, 1, 2, 4),
(2, 2, 9, 2, 3, 6),
(2, 3, 4, 0, 2, 3),
(3, 1, 18, 2, 4, 8),
(3, 2, 25, 4, 6, 12),
(3, 3, 10, 1, 3, 5),
(4, 1, 12, 1, 3, 6),
(4, 2, 15, 0, 4, 8),
(4, 3, 6, 0, 2, 4),
(5, 1, 5, 1, 2, 4),
(5, 2, 8, 2, 3, 5),
(5, 3, 3, 0, 2, 3),
(6, 1, 11, 2, 3, 6),
(6, 2, 16, 1, 4, 8),
(6, 3, 7, 0, 2, 4),
(7, 1, 3, 1, 1, 2),
(7, 2, 4, 0, 1, 3),
(7, 3, 2, 0, 1, 2),
(8, 1, 35, 4, 8, 15),
(8, 2, 42, 5, 10, 20),
(8, 3, 18, 0, 5, 10)
ON DUPLICATE KEY UPDATE `quantity_on_hand` = VALUES(`quantity_on_hand`);

-- Seed Drivers (Private Fleet with Live Telemetry)
INSERT INTO `drivers` (`id`, `user_id`, `name`, `phone`, `vehicle_type`, `vehicle_plate`, `license_number`, `status`, `current_lat`, `current_lng`, `battery_percent`, `speed_kmh`, `rating`, `completed_deliveries`, `active_order_id`) VALUES
(1, 3, 'Karim Mostafa', '+20 100 458 9201', 'Van (Van Mercedes Sprinter)', 'ق م ر 8421', 'DL-CAI-9921', 'on_delivery', 30.0560, 31.2290, 94, 38, 4.98, 342, 1),
(2, 4, 'Tarek El-Sayed', '+20 112 879 3341', 'Sedan VIP', 'س ف ن 1932', 'DL-GIZ-4402', 'available', 30.0150, 31.2820, 88, 42, 4.95, 289, NULL),
(3, NULL, 'Omar Hassan', '+20 120 741 8596', 'Van (Van Mercedes Sprinter)', 'ج هـ ط 6649', 'DL-CAI-1108', 'available', 30.0820, 31.3210, 76, 29, 4.92, 198, NULL)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Seed Orders
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `guest_email`, `guest_name`, `guest_phone`, `status`, `payment_status`, `payment_method`, `subtotal`, `discount`, `tax`, `shipping_fee`, `total_amount`, `currency`, `shipping_address_json`, `warehouse_id`, `assigned_driver_id`, `carrier_name`, `delivery_type`, `otp_code`, `notes`) VALUES
(1, 'LUM-2026-8891', 1, 'farida.mansour@atelier.com', 'Farida Mansour', '+20 102 334 8812', 'out_for_delivery', 'paid', 'card_stripe', 50500.00, 0.00, 0.00, 0.00, 50500.00, 'EGP',
'{"full_name": "Farida Mansour", "phone": "+20 102 334 8812", "street": "14 Hassan Sabry Street", "apartment": "Penthouse B", "city": "Zamalek", "governorate": "Cairo", "country": "Egypt"}',
1, 1, 'Lumio Private Courier Fleet', 'own_fleet', '8492', 'White-glove placement in master lounge. Call 10 mins prior to arrival.'),

(2, 'LUM-2026-8892', NULL, 'sherif.aly@equity.eg', 'Sherif Aly', '+20 111 892 0019', 'ready_for_dispatch', 'cod_pending', 'cash_on_delivery', 18500.00, 0.00, 0.00, 0.00, 18500.00, 'EGP',
'{"full_name": "Sherif Aly", "phone": "+20 111 892 0019", "street": "Palm Hills Golf Views, Villa 124", "apartment": "", "city": "6th of October", "governorate": "Giza", "country": "Egypt"}',
1, NULL, 'Lumio Private Courier Fleet', 'own_fleet', '3318', 'COD Payment due upon delivery. Exact cash prepared.'),

(3, 'LUM-2026-8893', NULL, 'nadia.fahmy@design.com', 'Nadia Fahmy', '+20 100 554 1120', 'delivered', 'paid', 'card_paymob', 42500.00, 2000.00, 0.00, 0.00, 40500.00, 'EGP',
'{"full_name": "Nadia Fahmy", "phone": "+20 100 554 1120", "street": "South Academy Area, Villa 19", "apartment": "", "city": "New Cairo", "governorate": "Cairo", "country": "Egypt"}',
2, 1, 'Lumio Private Courier Fleet', 'own_fleet', '6290', 'Delivered successfully and signed by client.')
ON DUPLICATE KEY UPDATE `order_number` = VALUES(`order_number`);

-- Seed Order Items
INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `sku`, `unit_price`, `quantity`, `total_price`, `image_url`) VALUES
(1, 1, 'Torso Ceramic Luminaire', 'LUM-LGT-001', 18500.00, 1, 18500.00, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'),
(1, 2, 'Monolithic Travertine Plinth', 'LUM-FUR-002', 32000.00, 1, 32000.00, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'),
(2, 1, 'Torso Ceramic Luminaire', 'LUM-LGT-001', 18500.00, 1, 18500.00, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'),
(3, 5, 'Egyptian Flax Lounge Chair', 'LUM-FUR-005', 42500.00, 1, 42500.00, 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80');

-- Seed Order Timeline
INSERT INTO `order_timeline` (`order_id`, `status`, `title`, `description`, `created_by`) VALUES
(1, 'confirmed', 'Order Authenticated', 'Payment verified via Stripe 3D Secure (50,500.00 EGP).', 'OMS Payment Gateway'),
(1, 'processing', 'White-Glove Inspection & Crated', 'Torso Luminaire and Travertine Plinth inspected at Cairo West Hub.', 'Cairo West WMS'),
(1, 'out_for_delivery', 'Dispatched with Karim Mostafa', 'Courier en route in Mercedes Sprinter (Plate ق م ر 8421). ETA ~20 mins.', 'Fleet Dispatcher'),
(3, 'delivered', 'Proof of Delivery Completed', 'Handover completed with OTP verification and e-signature by client.', 'Karim Mostafa (Driver)');

-- Seed Delivery Tasks
INSERT INTO `delivery_tasks` (`id`, `order_id`, `driver_id`, `status`, `route_order`, `customer_name`, `customer_phone`, `delivery_address`, `latitude`, `longitude`, `cod_amount`, `eta_minutes`, `distance_km`, `otp_code`) VALUES
(1, 1, 1, 'in_transit', 1, 'Farida Mansour', '+20 102 334 8812', '14 Hassan Sabry Street, Penthouse B, Zamalek, Cairo', 30.0614, 31.2185, 0.00, 18, 4.2, '8492')
ON DUPLICATE KEY UPDATE `customer_name` = VALUES(`customer_name`);

-- Seed RMA / Returns
INSERT INTO `returns_rma` (`id`, `rma_number`, `order_id`, `customer_name`, `customer_email`, `status`, `reason`, `items_json`, `refund_amount`, `refund_method`, `restock_confirmed`, `notes`) VALUES
(1, 'RMA-2026-0041', 3, 'Nadia Fahmy', 'nadia.fahmy@design.com', 'inspected', 'Color tone mismatch with natural light in dining gallery.', 
'[{"product_id": 5, "name": "Egyptian Flax Lounge Chair", "sku": "LUM-FUR-005", "price": 40500.00, "qty": 1}]', 40500.00, 'store_credit', TRUE, 'Inspected at East Depot. Pristine condition, repackaged for gallery catalog.')
ON DUPLICATE KEY UPDATE `rma_number` = VALUES(`rma_number`);

-- Seed Concierge Consultations
INSERT INTO `concierge_consultations` (`id`, `client_name`, `email`, `phone`, `project_type`, `budget_range`, `architectural_style`, `rooms_json`, `preferred_date`, `notes`, `status`) VALUES
(1, 'Youssef El-Gammal', 'youssef@gammal-arch.com', '+20 100 882 1990', 'Penthouse', '500,000 - 1,200,000 EGP', 'Brutalist Minimalist', 
'["Formal Reception", "Master Suite", "Terrace Plinth Court"]', '2026-09-12', 'Seeking bespoke monolithic travertine plinths and custom bronze sconces for a 650m2 penthouse overlooking the Nile.', 'proposal_presented')
ON DUPLICATE KEY UPDATE `client_name` = VALUES(`client_name`);

-- Seed Coupons
INSERT INTO `coupons` (`code`, `discount_type`, `discount_value`, `min_order_amount`, `is_active`) VALUES
('LUMIOVIP', 'percentage', 10.00, 20000.00, TRUE),
('WELCOME1000', 'fixed', 1000.00, 10000.00, TRUE)
ON DUPLICATE KEY UPDATE `discount_value` = VALUES(`discount_value`);
