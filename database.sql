CREATE DATABASE IF NOT EXISTS event_booking;
USE event_booking;

CREATE TABLE IF NOT EXISTS colleges (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time VARCHAR(50) NOT NULL,
    venue VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    college_id INT,
    speakers TEXT,
    coordinators TEXT,
    FOREIGN KEY (college_id) REFERENCES colleges(id)
);

CREATE TABLE IF NOT EXISTS registrations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    regno VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    college VARCHAR(255) NOT NULL,
    event_id INT,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id)
);

-- Insert sample college data
INSERT INTO colleges (name) VALUES 
('NGP College'),
('PSG College'),
('Kumaraguru College');

-- Insert sample event data
INSERT INTO events (name, description, date, time, venue, price, college_id, speakers, coordinators) VALUES 
('Cognito Clash', 'A technical symposium that challenges your mind', '2024-11-11', '7:00 - 17:00', 'NGP College', 10.00, 1, 'Alan Joshua, Krishna Sriram', 'Alan Joshua, Krishna Sriram'),
('Tech Summit', 'Explore the latest in technology', '2024-11-12', '9:00 - 18:00', 'NGP College', 15.00, 1, 'John Doe, Jane Smith', 'Alex Kumar, Priya Raj');

-- Add these fields to the existing events table
ALTER TABLE events 
ADD description_long TEXT AFTER description,
ADD hosted_by VARCHAR(255) AFTER venue,
ADD coordinators_details TEXT AFTER coordinators;

-- Update the Tech Summit event with detailed information
UPDATE events 
SET description_long = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    hosted_by = 'John Doe',
    coordinators_details = 'Alex Kumar, Priya Raj'
WHERE id = 2;


-- Update the events table structure
ALTER TABLE events 
ADD short_description VARCHAR(255) AFTER name;

-- Update the Tech Summit event data
UPDATE events 
SET short_description = 'Explore the latest in technology with hands-on workshops, expert talks, and networking opportunities. Join us for a day of innovation and learning.',
    description_long = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    coordinators = 'Alex Kumar, Priya Raj'
WHERE id = 2;


-- Modify the events table
ALTER TABLE events 
DROP COLUMN description_long,
DROP COLUMN short_description,
MODIFY description TEXT,
MODIFY coordinators VARCHAR(255);

-- Update sample data for Tech Summit
UPDATE events 
SET name = 'Tech Summit',
    description = 'Join us for an exciting tech summit featuring cutting-edge technologies, expert speakers, and hands-on workshops. Explore the future of technology and network with industry professionals in this day-long immersive experience.',
    date = '2024-11-12',
    time = '9:00 - 18:00',
    venue = 'NGP College',
    price = 15.00,
    coordinators = 'Alex Kumar, Priya Raj'
WHERE id = 2;