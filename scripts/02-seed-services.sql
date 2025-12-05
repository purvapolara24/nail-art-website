-- Seed sample services
INSERT INTO services (name, description, category, price, duration, image_url) VALUES
('Gel Manicure', 'Premium gel manicure with long-lasting shine', 'Gel Nails', 45.00, 60, '/placeholder.svg?height=300&width=300'),
('French Polish', 'Classic French nail polish with elegant finish', 'French Polish', 35.00, 45, '/placeholder.svg?height=300&width=300'),
('Bridal Nails', 'Luxurious bridal nail design for special occasions', 'Bridal', 65.00, 90, '/placeholder.svg?height=300&width=300'),
('Chrome Nails', 'Trendy chrome nail art with metallic finish', 'Chrome', 50.00, 60, '/placeholder.svg?height=300&width=300'),
('Acrylic Design', 'Custom acrylic nail art design', 'Acrylic', 55.00, 75, '/placeholder.svg?height=300&width=300'),
('Nail Art', 'Creative hand-painted nail art', 'Art', 40.00, 60, '/placeholder.svg?height=300&width=300')
ON CONFLICT (name) DO NOTHING;
