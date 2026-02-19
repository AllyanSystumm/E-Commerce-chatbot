-- Sample Data for AION E-commerce
INSERT INTO users (email, hashed_password, full_name, address, phone) VALUES
('john.doe@example.com', 'hashed_pass_1', 'John Doe', '123 Main St, New York, NY', '555-0199'),
('jane.smith@example.com', 'hashed_pass_2', 'Jane Smith', '456 Oak Ave, Los Angeles, CA', '555-0200'),
('alice.johnson@example.com', 'hashed_pass_3', 'Alice Johnson', '789 Pine Rd, Chicago, IL', '555-0201');

INSERT INTO products (name, description, price, stock_quantity, category) VALUES
('Quantum Laptop X1', 'High-performance laptop with AI integration.', 1299.99, 50, 'Electronics'),
('Neo Smartphone Z', 'Sleek smartphone with advanced camera system.', 899.50, 100, 'Electronics'),
('Ergo Desk Chair', 'Ergonomic chair for long work hours.', 249.00, 30, 'Furniture'),
('Wireless Noise-Canceling Headphones', 'Premium sound quality with active noise cancellation.', 199.00, 75, 'Accessories'),
('Smart Watch Series 5', 'Track your health and stay connected.', 349.00, 120, 'Wearables');

INSERT INTO orders (user_id, status, total_amount) VALUES
(1, 'delivered', 1498.99),
(2, 'shipped', 899.50),
(3, 'pending', 249.00);

INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
(1, 1, 1, 1299.99),
(1, 4, 1, 199.00),
(2, 2, 1, 899.50),
(3, 3, 1, 249.00);

INSERT INTO payments (order_id, amount, payment_method, status, transaction_id) VALUES
(1, 1498.99, 'credit_card', 'completed', 'TXN123456'),
(2, 899.50, 'paypal', 'completed', 'TXN789012');
