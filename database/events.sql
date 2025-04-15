-- Create events table if not exists
CREATE TABLE IF NOT EXISTS `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` varchar(50) NOT NULL,
  `time` varchar(50) NOT NULL,
  `venue` varchar(255) NOT NULL,
  `price` varchar(50) NOT NULL,
  `coordinators` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample event data
INSERT INTO `events` (`name`, `description`, `date`, `time`, `venue`, `price`, `coordinators`) VALUES
('Cognito Clash', 'A thrilling coding competition that challenges participants to solve complex problems and develop innovative solutions. Test your programming skills against the best minds in the college.', '2023-11-15', '10:00 AM', 'Computer Lab A', '200', 'Rahul Kumar, Priya Singh'),
('TechFest 2023', 'Annual technology festival featuring workshops, competitions, and exhibitions. Explore the latest trends in technology and showcase your technical prowess.', '2023-11-20', '09:00 AM', 'Main Auditorium', '150', 'Amit Patel, Sneha Gupta, Raj Sharma'),
('Design Dazzle', 'A creative design competition for aspiring designers. Showcase your artistic talents and innovative design concepts in various categories.', '2023-11-25', '11:00 AM', 'Design Studio', '100', 'Neha Verma, Karan Malhotra'),
('Robotics Workshop', 'Hands-on workshop on building and programming robots. Learn about sensors, actuators, and control systems from industry experts.', '2023-12-01', '02:00 PM', 'Robotics Lab', '300', 'Dr. Suresh Iyer, Ananya Desai'),
('Hackathon 2023', 'A 24-hour coding marathon where teams collaborate to build innovative software solutions to real-world problems. Great prizes for winners!', '2023-12-05', '08:00 AM', 'Innovation Hub', '250', 'Vikram Joshi, Meera Kapoor, Arjun Reddy'),
('AI Workshop', 'Learn about artificial intelligence, machine learning, and deep learning techniques. Practical sessions on implementing AI algorithms.', '2023-12-10', '10:30 AM', 'Seminar Hall B', '350', 'Prof. Rajesh Kumar, Divya Sharma'),
('Web Development Bootcamp', 'Intensive training on modern web development technologies including HTML5, CSS3, JavaScript, and popular frameworks.', '2023-12-15', '09:30 AM', 'Computer Lab B', '400', 'Sanjay Mehta, Pooja Patel'),
('Cyber Security Symposium', 'Discussions and demonstrations on latest cyber threats and security measures. Learn ethical hacking and network security techniques.', '2023-12-20', '01:00 PM', 'Conference Hall', '300', 'Arun Mishra, Nisha Singh, Deepak Verma');