document.addEventListener('DOMContentLoaded', function() {
    loadColleges();
    loadEvents();

    // Close popup when clicking X
    document.querySelector('.close-popup').addEventListener('click', function() {
        closePopup();
    });

    // Close popup when clicking outside
    window.addEventListener('click', function(event) {
        const popup = document.getElementById('eventPopup');
        if (event.target === popup) {
            closePopup();
        }
    });
});

// Keep all your existing functions
function loadColleges() {
    // ... existing loadColleges code ...
}

function loadEvents(collegeId = '') {
    // ... existing loadEvents code ...
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    // Truncate description to 2 lines (approximately 100 characters)
    const truncatedDesc = event.short_description.length > 100 ? 
        event.short_description.substring(0, 100) + '...' : 
        event.short_description;

    card.innerHTML = `
        <img src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=500" alt="${event.name}">
        <div class="event-details">
            <h3>${event.name}</h3>
            <p>${truncatedDesc}</p>
            <div class="event-info">
                <div class="info-group">
                    <span>Time:</span>
                    <span>${event.time}</span>
                </div>
                <div class="info-group">
                    <span>Place:</span>
                    <span>${event.venue}</span>
                </div>
                <div class="info-group">
                    <span>Date:</span>
                    <span>${event.date}</span>
                </div>
                <div class="info-group">
                    <span>Price:</span>
                    <span>${event.price}₹/-</span>
                </div>
            </div>
            <div class="button-group">
                <button class="btn-view" onclick="showEventDetails(${event.id})">View Details</button>
                <button class="btn-register" onclick="window.location.href='register.html?event=${event.id}'">Register</button>
            </div>
        </div>
    `;
    return card;
}

function showEventDetails(eventId) {
    // Try to fetch from server first
    fetch(`php/get_event_details.php?id=${eventId}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Server returned valid data
                displayEventPopup(data.data);
            } else {
                // Fall back to hardcoded data
                useHardcodedEventData(eventId);
            }
        })
        .catch(error => {
            console.error('Error fetching event details:', error);
            // Fall back to hardcoded data on error
            useHardcodedEventData(eventId);
        });
}

function useHardcodedEventData(eventId) {
    // Hardcoded event data as fallback
    const events = [
        {}, // Empty object for index 0 (we start from 1)
        {
            name: "Tech Summit",
            description: "Join us for a day of cutting-edge technology discussions, networking, and hands-on workshops with industry experts. Learn about the latest trends in AI, blockchain, cloud computing, and more. Connect with tech leaders and innovators from around the country.",
            date: "15 Aug 2023",
            venue: "Main Auditorium",
            price: "500",
            coordinators: ["Rahul Sharma", "Priya Patel", "Amit Kumar"]
        },
        {
            name: "Hackathon 2023",
            description: "A 48-hour coding competition where teams build innovative solutions to real-world problems. Great prizes to be won! Bring your laptops, your creativity, and your problem-solving skills for this intense but rewarding experience.",
            date: "20 Sep 2023",
            venue: "CS Building",
            price: "300",
            coordinators: ["Vikram Singh", "Neha Gupta", "Sanjay Verma"]
        },
        {
            name: "AI Workshop",
            description: "Learn about artificial intelligence fundamentals, machine learning algorithms, and practical applications in this hands-on workshop. Perfect for beginners and intermediate learners interested in the field of AI and its growing impact on various industries.",
            date: "5 Oct 2023",
            venue: "Lab 101",
            price: "250",
            coordinators: ["Dr. Ananya Mishra", "Rajesh Khanna", "Deepika Shah"]
        },
        {
            name: "Design Thinking",
            description: "A creative workshop focused on user-centered design approaches to solve complex problems and create innovative solutions. Learn the five stages of design thinking and apply them to real-world challenges in this interactive session.",
            date: "12 Oct 2023",
            venue: "Design Studio",
            price: "400",
            coordinators: ["Arjun Mehta", "Sneha Reddy", "Karan Malhotra"]
        },
        {
            name: "Robotics Competition",
            description: "Showcase your robotics skills in this exciting competition featuring autonomous robots, remote-controlled challenges, and more. Teams will compete in various categories including obstacle courses, robot battles, and precision tasks.",
            date: "25 Oct 2023",
            venue: "Engineering Block",
            price: "350",
            coordinators: ["Prof. Ravi Shankar", "Meera Joshi", "Aditya Kapoor"]
        },
        {
            name: "Cyber Security Seminar",
            description: "Learn about the latest threats, defense strategies, and best practices in cyber security from industry professionals. Topics include ethical hacking, network security, cryptography, and protecting personal data in the digital age.",
            date: "2 Nov 2023",
            venue: "Seminar Hall",
            price: "200",
            coordinators: ["Suresh Menon", "Kavita Sharma", "Nikhil Rao"]
        },
        {
            name: "Data Science Bootcamp",
            description: "An intensive bootcamp covering data analysis, visualization, machine learning, and practical applications of data science. Participants will work with real datasets and learn to extract meaningful insights using popular tools and frameworks.",
            date: "10 Nov 2023",
            venue: "Computer Center",
            price: "450",
            coordinators: ["Dr. Vivek Jain", "Pooja Agarwal", "Sameer Desai"]
        },
        {
            name: "Gaming Tournament",
            description: "Compete in popular esports titles and show off your gaming skills in this exciting tournament with prizes for top performers. Games include CS:GO, Valorant, PUBG, and more. Both individual and team competitions available.",
            date: "18 Nov 2023",
            venue: "Recreation Center",
            price: "150",
            coordinators: ["Rohan Kapoor", "Tanvi Malhotra", "Varun Choudhary"]
        }
    ];
    
    if (eventId >= 1 && eventId <= 8) {
        displayEventPopup(events[eventId]);
    } else {
        console.error('Error: Invalid event ID');
    }
    return false; // Prevent default behavior if used in onclick
}

function displayEventPopup(event) {
    // Update popup content with event details
    document.querySelector('.popup-title').textContent = event.name;
    document.querySelector('.popup-description p').textContent = event.description;
    document.getElementById('popupDate').textContent = event.date;
    document.getElementById('popupVenue').textContent = event.venue;
    document.getElementById('popupPrice').textContent = event.price + '₹/-';

    // Update coordinators list
    const coordinatorsList = document.getElementById('coordinatorsList');
    coordinatorsList.innerHTML = '';
    
    // Handle different formats of coordinators (array or string)
    let coordinatorsArray = event.coordinators;
    if (typeof coordinatorsArray === 'string') {
        coordinatorsArray = coordinatorsArray.split(',');
    }
    
    coordinatorsArray.forEach(coordinator => {
        const li = document.createElement('li');
        li.textContent = coordinator.trim();
        coordinatorsList.appendChild(li);
    });

    // Show popup
    document.getElementById('eventPopup').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closePopup() {
    document.getElementById('eventPopup').style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
}